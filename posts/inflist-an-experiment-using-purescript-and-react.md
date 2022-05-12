---
title: Inflist, an experiment using PureScript and React
description: The architecture, technologies and all the lessons learned while making a Todo List in Purescript and React.
tags: 'purescript, functional, react, app'
published: true
canonical_url: 'https://www.dgopsq.space/blog/inflist-an-experiment-using-purescript-and-react'
---

One of the resolutions for this year was to learn a bit more seriously PureScript (or at least die trying). I started writing small stuff like exercises and little scripts, and all went quite good. I felt like I had a tighter grasp on the language, and with that I felt more confident. It was time to create something bigger that I could actually compare with the code I write daily. So I decided to create a whole (mini) web application, and since it’s a bit of a tradition, why not a Todo List 🤓?

This Todo List has three main features: it should be infinitely nestable (or it should be possible to create a todo inside another todo without limitations), each todo should be freely editable without any friction and a todo should have optional notes.

So, I had a clear idea of what to create, and more importantly a name! Time to go a bit deeper ✌️.

> You can find the GitHub repo with a decently commented code here: [https://github.com/dgopsq/purescript-inflist](https://github.com/dgopsq/purescript-inflist).

# Technologies

First of all I had to choose what to use to manage the User Interface. I narrowed down to two modules: [Halogen](https://github.com/purescript-halogen/purescript-halogen) and [react-basic-hooks](https://github.com/megamaddu/purescript-react-basic-hooks) (which is a “wrapper” of the unmaintained [react-basic](https://github.com/lumihq/purescript-react-basic)). I decided to go with **react-basic-hooks** just because I use **React** on a daily basis and I wanted to understand its interoperability with PureScript. I will 10/10 try **Halogen** too in the next future since as far as I can see is the most famous and maintained in the PureScript community.

Another technology I use on a daily basis in **Redux**. But this time I wanted to manage the global state in a simpler and clearer way just using React hooks. I decided to go with a simple `useReducer` combined with the[`useContextSelector` hook](https://github.com/dai-shi/use-context-selector) which will avoid the whole application’s re-render caused by the native `useContext` hook.

And finally, for the styles I opted for the most famous [Tailwind CSS](https://tailwindcss.com/).

# Architecture

The whole point of using PureScript is to adopt a pure FP architecture, having all the “side effect” moved at the very edge of the implementation. I really like this approach instead of a “partial” FP one given by non pure-functional languages. Using TypeScript for example you would have various functional “bubbles” here and there in the code, but multiple “entry point” for side effects. This is not wrong but it’s not really leveraging the full power of functional programming which is: **Types**! Problems like *Dependency Injection* (take a look at [the Reader monad](https://mmhaskell.com/monads/reader-writer)) or executing operations in the right order (see the [Indexed Monad](https://qiita.com/kimagure/items/a0ee7313e8c7690bf3f5) generalisation, which is the core of *react-basic-hooks*) are magically solved right inside the language.

Following this path and with the idea that Inflist is just a PoC, I decided to tackle the application’s architecture optimising the performances at the expenses of stability. A “todo” inside Inflist is just a branch in a tree with a unique id, a single parent and multiple children:

```haskell
-- | A data structure representing a Todo.
type Todo
  = { id :: TodoId
    , checked :: Boolean
    , text :: String
    , note :: String
    , children :: List TodoId
    , parent :: TodoId
    }
```

This is quite convenient for two reasons:

1. It’s easy to persist. For example using the **Local Storage** we can store each todo as a single entity with an id and the JSON serialisation of the todo itself as the value. This allows us to have decent performances even using the simplest storage system.
2. We can show every todo as a standalone entity. Since *everything* is a todo and each todo is linked with its parent, starting the application from the root todo or from a deep one is the same thing. This is really helpful for both development experience and features like the navigation (creating a permalink for a todo is basically automatically implemented).

This is obviously not perfect, there are problems which are solved using *User Interface* tricks, like the `[...]` in the breadcrumb that saves us the hassle of traversing the whole tree.

The **navigation** is handled through [purescript-routing](https://github.com/purescript-contrib/purescript-routing) which provides an interface for the [PushState API](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) and a convenient way to parse the routes starting from a simple ADT:

```haskell
data AppRoute
  = RootTodos
  | ChildrenTodos TodoId
```

The most “unstable” part is probably the logic dealing with the **storage**. There is a persistence layer inside Inflist passed around as a dependency, and its only implementation is using the **Local Storage** as anticipated. This layer is executed directly through the React components using native hooks like [useAff](https://github.com/megamaddu/purescript-react-basic-hooks/blob/57ecbe7478a0975783bdc0f0639a851329970947/src/React/Basic/Hooks/Aff.purs#L26-L63), and thus managed by the React lifecycle events. This can definitely be improved using a more solid approach from libraries like [Redux-Saga](https://redux-saga.js.org/).

# What I learned

As I said, this (really small) project was just an experiment to better understand PureScript and its advantages and disadvantages. These are the lessons I learned:

1. A pure-FP language, and more in specific PureScript, **is a viable alternative for the most dangerous parts of an application**. When a specific component or micro frontend needs to be particularly “stable”, using PureScript would definitely save time dealing with common bugs or errors.
2. **The learning curve for PureScript is *really step.*** Without the understanding of common FP concepts it can be really difficult to create even simple things. I’m *sure* there are errors in Inflist, specifically in the typization of foreign JavaScript code.
3. **The developer experience is good but it's bad.** In a functional codebase everything must (should) be typed, the enormous quantity of errors catched at compile time is definitely a plus for the overall developer experience. The only downside, and this is something related directly to PureScript, it's that the IDE support is a bit weak. It's possible to get the compilation errors in real-time and there are tooltips to show description of types and functions, but for example something I missed a lot from Scala FP is the inferred types of computed values (for example, assignments inside a `do` block).
4. **The community is still quite small** compared to other languages, and there is a lack of modules and tools. On the other side PureScript's interoperability is *✨ awesome ✨* making using third-party libraries from JavaScript a breeze. I would also like to point out that, as far as I can see, **all the mainteiners of the major modules are really present and active** inside the community, even in the official [Discord server](https://purescript.org/chat)!

Well, that's all 🙏