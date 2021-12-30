---
title: Reading from the Standard Input (stdin) using PureScript
description: How to read from the Standard Input (stdin) using PureScript.
tags: 'purescript, functional, stdin, stream'
published: true
canonical_url: 'https://www.dgopsq.space/blog/reading-from-stdin-using-purescript'
---

These last few weeks I started learning PureScript again. I _love_ this language, it’s the quintessence of functional programming, but it lacks in community and libraries compared for example to TypeScript, and this sadly makes it really difficult for me to use in my side projects.

While I was doing some challenges online, I had the need to retrieve an input string from `stdin`. I found out that this case is not really well covered anywhere, so why not writing a new blog post? 🙃

First of all, to read from the **Standard Input (stdin)** the library [purescript-node-process](https://github.com/purescript-node/purescript-node-process) is needed. This library exposes `stdin` which is a `Readable` (a simple readable stream) and it will be the key component around which we’ll create our function. Since we are dealing with a simple stream, what we want to create is a function that takes that same stream and return a new string:

```purescript
import Prelude
import Control.Monad.ST.Class (liftST)
import Control.Monad.ST.Ref as STRef
import Data.Either (Either(..))
import Effect (Effect)
import Effect.Aff (effectCanceler, launchAff_, makeAff)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Node.Encoding (Encoding(..))
import Node.Process (stdin)
import Node.Stream (Readable, destroy, onDataString, onEnd, onError)

-- Accumulate a readable stream inside a string.
streamAccumulator :: forall m r. MonadAff m => Readable r -> m String
streamAccumulator r =
  liftAff <<< makeAff
    $ \res -> do
        -- Create a mutable reference using `purescript-st`.
        inputRef <- liftST $ STRef.new ""

        -- Handle the `onDataString` event using
        -- the UTF8 encoding.
        onDataString r UTF8 \chunk ->
          void <<< liftST $ STRef.modify (_ <> chunk) inputRef

        -- Handle the `onEnd` event.
        onEnd r do
          input <- liftST $ STRef.read inputRef
          res $ Right input

        -- Handle the `onError` event.
        onError r $ Left >>> res

        -- Return a `Canceler` effect that will
        -- destroy the stream.
        pure $ effectCanceler (destroy r)

-- Execute the program.
main :: Effect Unit
main =
  launchAff_ do
    input <- streamAccumulator stdin
    liftEffect $ log input
```

This looks a bit messy but it’s actually simple. Since the process of handling a stream is “event-driven” we are going to use a safe mutable string (from [purescript-st](https://github.com/purescript/purescript-st)) to accumulate our input every time the `onDataString` event will be triggered. This whole process is asynchronous, meaning that we have to wait for the `onEnd` event (or `onError` if something bad happened) to actually return the accumulated string. The effect monad `Aff` solves this through `makeAff`. The `res` callback has to be called with an `Either` parameter, and only when this callback will be triggered the program can continue its execution.

Peace ✌️
