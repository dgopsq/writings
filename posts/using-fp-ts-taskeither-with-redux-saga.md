---
title: Using the fp-ts TaskEither monad with Redux-Saga
description: How to use the fp-ts TaskEither monad with Redux-Saga without losing testability.
tags: 'functional, redux, typescript, saga'
published: true
canonical_url: 'https://www.dgopsq.space/blog/using-fp-ts-taskeither-with-redux-saga'
id: 958626
date: '2022-01-17T21:31:19Z'
---

The [fp-ts `TaskEither<L, R>` monad](https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html) is a powerful data structure representing an asynchronous computation returning a value of type `R` when successful or a value of type `L` on failure. It allows to handle errors in a more "functional" and transparent way instead of dealing with exceptions (😖).

I recently found myself using it inside [Redux-Saga](https://redux-saga.js.org/), executing functions returning a `TaskEither` using the `call` effect. Now, it's actually quite easy to do so since `TaskEither` is just a function returning a `Promise`. At first glance we can just do something like:

```typescript
// The service returning a `TaskEither`.
export function service(param: string): TE.TaskEither<Error, string> {
  return TE.right(`Hello World, ${param}`)
}

// The saga executing the service.
export function* saga() {
  // Either<Error, string>
  const result = yield* call(service('param')) 
}
```


> The `yield*` operator here is used for [typed-redux-saga](https://github.com/agiledigital/typed-redux-saga), to obtain a better typing inside a _Saga_.

In this way, `result` would actually be of type `Either<Error, string>`, but we are using `call` wrongly by calling the function directly instead of passing its arguments like `call(service, 'param')`. This will cause problems when writing unit tests for the _Saga_. So, what if we pass the service in the correct way? Then we would have to write:

```typescript
// TaskEither<Error, string>
const unexecutedResult = yield* call(service, 'param')

// Either<Error, string>
const result = yield* call(unexecutedResult)
```

In this case, `unexecutedResult` is of type `TaskEither<Error, string>`, and we would still need to actually execute it to obtain the concrete result. This works, but we would have to test two `call` effects for a single "operation". Don't really like it 😾. With a bit of TypeScript magic though, we can improve it by writing a utility function that creates and executes the `TaskEither` in a single call:

```typescript
/**
 * Utility to evaluate a function returning a `TaskEither`.
 */
function* callTaskEither<
  L,
  R,
  Fn extends (...genericArgs: Array<any>) => TE.TaskEither<L, R>,
>(fn: Fn, ...args: Parameters<Fn>): SagaGenerator<E.Either<L, R>> {
  const task: TE.TaskEither<L, R> = yield* call(fn, ...args)
  return yield* call(task)
}

/**
 * Evaluate a one-argument function returning a TaskEither.
 */
export function callTaskEither1<L, R, P1>(
  fn: (p1: P1) => TE.TaskEither<L, R>,
  p1: P1,
): SagaGenerator<E.Either<L, R>> {
  return callTaskEither(fn, p1)
}

/**
 * Helper type for `callTaskEither1`.
 */
export type TCallTaskEither1<L, R, P1> = (
  fn: (p1: P1) => TE.TaskEither<L, R>,
  p1: P1,
) => SagaGenerator<E.Either<L, R>>
```

The function `callTaskEither` is just a generator that does the two `call` we described before. Since TypeScript would be in trouble inferring the function's parameters with the spread operator, we need to create helper functions and types manually for each number of parameters we need. It's not the best but it's a one-time only job! This hard work will allow us to have a working type-check using a single `call` effect, like this:

```typescript
// Either<Error, string>
const result = yield* call<TCallTaskEither1<Error, string, string>>(
  callTaskEither1,
  service,
  'param',
)
```

Still a little verbose, but I actually prefer it to using two `call` effects everywhere!

See ya 🤠
