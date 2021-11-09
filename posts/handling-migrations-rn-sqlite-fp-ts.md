---
title: Handling migrations in React Native with SQLite and fp-ts
description: Recently, in one of my side projects, I had to use expo-sqlite to manage a small client-side database in a React Native app, while using the awesome fp-ts. I don't know if I will ever be able to ship that app, but at least I'm gonna use the experience I earned in (I hope) a good way 🙂.
date: '2020-09-15T10:17:58+02:00'
tags: functional, reactnative, expo, typescript
published: true
canonical_url: https://www.dgopsq.space/blog/handling-migrations-rn-sqlite-fp-ts
---

Recently, in one of my side projects, I had to use [expo-sqlite](https://docs.expo.io/versions/latest/sdk/sqlite/) to manage a small client-side database in a **React Native** app, while using the awesome [fp-ts](https://github.com/gcanti/fp-ts). I don't know if I will ever be able to ship that app, but at least I'm gonna use the experience I earned in (I hope) a good way 🙂.

## React Native and Expo

[React Native](https://reactnative.dev/) is a framework for mobile applications that uses [React](https://reactjs.org/) as its engine, compiling it into native (yeah, _native_) views. This means that you can write native mobile applications using JavaScript (🤢) and React (❤️). This is already awesome, but [Expo](https://expo.io/) will bring all of this to another level. Expo is a set of tools written upon React Native that simplifies the development of cross-platform mobile applications providing features like: universal APIs for native elements (push notifications, camera, accelerometer, ...), over-the-air updates, an in-cloud build infrastructure, and much more!

## The awesome fp-ts

This last year in my day job I had to use Scala in a purely functional way, and because of that I finally started to look at TypeScript with a bit of disdain and contempt. I tried a lot of different stuff (such as Reason, ScalaJS and PureScript) but I always found something I didn't like in each of them (although PureScript is still in my "evaluation list", since I'm not yet finished with it). The real game changer though was **fp-ts**, which allowed me to use TypeScript in a _functional_ and _strongly-typed_ way, and since it's just Typescript I can use all the JavaScript APIs without bindings (and that's really great!). Sadly there are downsides too, TypeScript is not really FP-oriented, and a lot of features are a bit hack-y or just weird (like the [ADTs](https://dev.to/gcanti/functional-design-algebraic-data-types-36kf)), but I have to say that giving it a bit of time it's still very enjoyable!

## Why migrations

My app is 100% client side, and has a relatively small database (around 4 tables with 2 relations) that needs to be managed in run time. Why so? Because since it's completely client-side, whenever we have to add a feature that needs a database modification, we have to execute a SQL query directly on the app itself.

The _right thing to do™_ is to have migrations, and there are different libraries that will help with them even on React Native (take a look at [TypeORM](https://typeorm.io/)). A migration is a _tracked_ SQL query that will execute just one time on the target database. It's tracked because we have to know if the query has already been executed or not, and to do so we need a place to store the _current version_ of the database (or the already executed migrations).
Let us begin with a small example to understand migrations: imagine to have an empty relational database, a little robot named Gigi with the job of _handling migrations_ and a list of SQL queries such as:

- `V1__create_users_table.sql`
- `V2__create_posts_table.sql`
- `V3__create_comments_table.sql`

When we call Gigi, he'll start handling these migrations by checking his notebook for the last migration he executed on the database. In this first case he will notice that his notebook is empty, thus he will start executing all the migrations one-by-one, and at the end he's going to write that the last executed migration is `V3__create_comments_table.sql`.
The next day we add a `V4__delete_comments_table.sql` query into the list, we call Gigi and he'll start the usual procedure, but this time he knows that he does't have to execute all the migrations again, but just the ones after `V3__create_comments_table.sql`, so he starts executing the remaining SQL queries, and at the end he will replace the latest query in his notebook.

This simple procedure allow us to have a **versioned database** really easy to update and manage even when we don't really have a direct access (and this is our case!). What we are going to do here is _implement this feature from scratch using fp-ts_ with the advantage of an FP implementation and a light codebase (libraries like TypeORM are quite big sometimes 😕).

## Expo SQLite and the Storage algebra

Before writing the implementation of our migrations we need a bit of background! One of the many modules that Expo makes available to us is [expo-sqlite](https://docs.expo.io/versions/latest/sdk/sqlite/), which is a mobile implementation of an SQLite database. The usage is quite simple (although I struggled a bit to understand where actually was the database file created inside the simulator 😾) but I didn't like so much the APIs. For this reason I wrote a simple [_Algebra_](https://typelevel.org/blog/2019/02/06/algebraic-api-design.html) (which is an abstract collection of functions and values, if you are coming from the _Object Oriented Programming_ you can think of it as an _Interface_) to "wrap" them:

```typescript
interface IStorageAlgebra {
  /**
   * Execute a query to retrieve some value from
   * the db
   */
  retrieveQuery: <T>(
    decoder: Decoder<T>,
  ) => (
    query: string,
    args: Array<QueryArgument>,
  ) => TaskEither<DatabaseError, Array<T>>

  /**
   * Execute a query which does not obtain values
   */
  executeQuery: (
    query: string,
    args: Array<QueryArgument>,
  ) => TaskEither<DatabaseError, number>

  /**
   * Execute multiple queries in a single transaction
   */
  executeQueriesInTransaction: (
    queries: Array<string>,
    argsList: Array<Array<QueryArgument>>,
  ) => TaskEither<DatabaseError, void>

  /**
   * Setup the database
   */
  setup: () => TaskEither<DatabaseError, void>
}
```

Here we need to explain something! The first thing you can notice is that every function returns a [TaskEither](https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html). In fp-ts a `TaskEither<E, A>` is a _Monad_ for handling asynchronous computations, it is the representation of a _Promise_ yielding `A` as the successful result, and `E` as the error. The second thing is the [Decoder](https://github.com/gcanti/io-ts/blob/master/Decoder.md) which is not inside fp-ts but in another library called [io-ts](https://gcanti.github.io/io-ts/), this is just a module that allows us to type-check and "decode" a normal (and unknown) JavaScript object into something we actually know (If we have a `const myDecoder = Decoder<IMyObject>`, we can do a `myDecoder.decode(unknownObj)` to obtain a valid `IMyObject` or an error otherwise).

What we are going to do now is implement the `setup` function, which will be executed at every startup of the application and has the task of bootstrapping the database and/or apply eventual updates (migrations!).

## The migrations manager

The `setup` function is what we precedently called "Migration manager". This function is divided into three main parts: **Bootstrap**, **Check**, and **Execution**. Before delving deeper we should point out how the list of migrations is implemented inside this project:

```typescript
const sqliteMigrations: ISQLiteMigrations = {
  0: `CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL
      );`,
}
```

Quite simple, isn't it? It's just a JavaScript object with the version number as the key, and the query to execute as the value.

Now that we know how the migrations are structured, let's analyse the `setup` function!

### Bootstrap

In the _Bootstrap_ we are merely creating the `__migration` table (the place in which we are going to store the executed migrations) if it's not already present, and we are retrieving the last executed migration. The code for this part is quite simple:

```typescript
this.executeQuery(`
  CREATE TABLE IF NOT EXISTS __migrations (
    id INTEGER PRIMARY KEY NOT NULL,
    version INTEGER NOT NULL,
    executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`),
```

This is going to create a `__migrations` table with an `id` column, a `version` (just a number to identify the migration) and the `executed_at` which is the migration's execution timestamp. Now that we are sure a table exists, we need to retrieve the last migration executed:

```typescript
// Decoder that represents a single migration
migrationsDecoder = Decoder.type({
  id: Decoder.number,
  version: Decoder.number,
  executed_at: Decoder.string,
})

// ...

this.retrieveQuery(this.migrationsDecoder)(`
  SELECT * FROM __migrations ORDER BY id DESC LIMIT 1;
`),
```

### Check

At this point we need to _Check_ the migrations to execute (if any) using the last migration retrieved. For this task we are going to create a specific helper function named `getUnexecutedMigrations` that takes all the migrations plus an optional last migration, and returns a list of unexecuted migrations:

```typescript
private getUnexecutedMigrations = (migrations: ISQLiteMigrations) => (
  maybeLastMigration: Option.Option<number>,
): Array<number> =>
  pipe(
    Array.map(Number)(Object.keys(migrations)),
    Array.sort(ordNumber),
    (migrationsVersions) =>
      pipe(
        maybeLastMigration,
        Option.fold(
          () => migrationsVersions,
          (lastMigration) =>
            Array.dropLeft(migrationsVersions.indexOf(lastMigration) + 1)(
              migrationsVersions,
            ),
        ),
      ),
  )
```

It's worth noting that `Array`, `Option` and `pipe` are all modules / functions contained into fp-ts. `Array` is just a convenient FP way to handle native JavaScript arrays, `Option` is the monad that handle the effect of optionality (the `Maybe` in [Haskell](https://wiki.haskell.org/Maybe)) and `pipe` is just an helper to chain functions from left to right.

### Execution

The last section to analyse is the _Execution_. Here, as the name probably suggests, we are going to execute all the remaining migrations. For each migration executed we need to add a line into the `__migrations` table, so it's important to execute both queries in a single transaction, to assure the database consistency:

```typescript
// Here we are managing the array of non-executed
// migrations inside a `pipe`, so the fist parameter
// of this `Array.map` is an `Array<number>`
Array.map((version) =>
  this.executeQueriesInTransaction(
    [
      this.migrations[version],
      `INSERT INTO __migrations (version, executed_at) VALUES (?, CURRENT_TIMESTAMP)`,
    ],
    [[], [version]],
  ),
),
```

Taking a look at `IStorageAlgebra` we can see that `executeQueriesInTransaction` returns a `TaskEither<DatabaseError, void>`, thus here we are just mapping an `Array<number>` into an `Array<TaskEither<DatabaseError, void>>`.

### The complete function

This is the final `setup` function:

```typescript
public setup = (): TaskEither.TaskEither<IDatabaseError, number> =>
  pipe(
    this.executeQuery(`
      CREATE TABLE IF NOT EXISTS __migrations (
        id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER NOT NULL,
        executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),

    TaskEither.chain(() =>
      this.retrieveQuery(this.migrationsDecoder)(`
        SELECT * FROM ${this.migrationsTable} ORDER BY id DESC LIMIT 1;
      `),
    ),

    TaskEither.chain((executedMigrations) =>
      pipe(
        executedMigrations,
        Array.map((m) => m.version),
        Array.head,
        this.getUnexecutedMigrations(this.migrations),
        Array.map((version) =>
          this.executeQueriesInTransaction(
            [
              this.migrations[version],
              `INSERT INTO ${this.migrationsTable} (version, executed_at) VALUES (?, CURRENT_TIMESTAMP)`,
            ],
            [[], [version]],
          ),
        ),
        Array.array.sequence(TaskEither.taskEither),
        TaskEither.map(() => undefined),
      ),
    ),
  )
```

All the explained parts are joined through a `pipe` with `TaskEither.chain` as the "link". Since `TaskEither` is a monad we can compose it using its `flatmap` function (which is just renamed here into `chain`). The last two functions are a bit obscure: `Array.array.sequence(TaskEither.taskEither)` takes an `Array<TaskEither<E, A>>` and returns a `TaskEither<E, Array<A>>`. We are using it to "merge" all the successful results of the various async computations into a single `TaskEither` that we are going to `map` into an `undefined` because we don't actually need any result.

That's all! 🙋‍♂️
