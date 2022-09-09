---
title: A ripgrep-powered Search Engine on the web
description: How I ported ripgrep to WASM in order to create a Search Engine for my blog.
tags: 'search, typescript, rust, grep'
canonical_url: https://www.dgopsq.space/blog/ripgrep-powered-search-engine-on-the-web'
---

My website’s search is using [**ripgrep**](https://github.com/BurntSushi/ripgrep) under the hood. You can try it out visiting the [homepage](https://www.dgopsq.space/) and typing a [simple regex](https://docs.rs/regex/1.6.0/regex/#syntax). As a disclaimer I just want to say that this is mostly an experiment and it’s in no way a real alternative to do Full-Text Search… but IT IS cool 😎✨

> The result of this article is [_netgrep_](https://github.com/dgopsq/netgrep), a JavaScript module that provides an API to execute HTTP based search queries using most of the _ripgrep_’s features. You can take a look at the code right away since it should be decently commented 🤓

# The idea

[_ripgrep_](https://github.com/BurntSushi/ripgrep) is an interesting software that allows to do regex-based search queries to files and directories recursively. The most important part is that **it’s fast** like, really fast. So, could it be possible to make it works over HTTP instead of the filesystem? And what about using it in the browser?

Turned out that it actually IS possible to use it over HTTP since there is a [Rust create](https://github.com/BurntSushi/ripgrep/tree/master/crates/grep) with all the essential code to make _ripgrep_ works programmatically. About the “work in the browser” thing the story is a bit more complicated. Since we are talking about a Rust library, the most common way to use it is through WebAssembly (WASM). The _ripgrep_’s codebase is mostly compatible with some exception which I had to manually fix [inside a fork](https://github.com/dgopsq/ripgrep).

So, now that we have everything sorted out, let's go a bit deeper!

# The implementation

The [netgrep](https://github.com/dgopsq/netgrep) library is divided into two macro parts: a **WASM binary** that interacts with the _ripgrep_’s internals and a **TypeScript library** which manages the bindings and the exposed API. I also wanted to try [nx](https://nx.dev/) as a build system, which is quite good for a Rust + TS codebase.

## WASM binary

After dealing with the WASM compatibility issue, which was actually [quite simple to fix](https://github.com/BurntSushi/ripgrep/commit/645cb7e3baf7c2b286d652c3c960fcd45978c0fd), I had to choose the _architecture_ of the library. Analysing a bit _ripgrep_ we can summarise its work into two sections:

1. **Discovery** which is the act of navigating inside a directory and list all the files recursively;
2. **Search** or: “look for the given pattern inside that file”.

At the moment I just wanted to release _netgrep_ with only the **Search** feature, leaving to the user the job of providing a list of files to analyse. Taking this into consideration and knowing that a WASM binary can only use the native browser APIs for networking (so [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)), I decided to handle just the **searching** function inside the binary.

More specifically, the [`search_bytes`](https://github.com/dgopsq/netgrep/blob/main/packages/search/src/lib.rs#L12) function exposed from the [**search** package](https://github.com/dgopsq/netgrep/blob/main/packages/search) uses the `search_slice` method from the `grep` crate to analyse a slice of bytes, returning a boolean value representing whether the given pattern has been found or not. This allows for a great deal of flexibility, for example we’ll be able to check for a pattern _while a file is being downloaded_ and not just after, leveraging one of the most useful features of _ripgrep_ even over HTTP.

## TypeScript library

The [**netgrep** package](https://github.com/dgopsq/netgrep/tree/main/packages/netgrep) is the one responsible to expose the final API to the user, and the “core” function used to build all the other methods is [`Netgrep.search()`](https://github.com/dgopsq/netgrep/blob/main/packages/netgrep/src/lib/Netgrep.ts#L50). This just executes a `fetch` request toward an endpoint and triggers the `search_bytes` function for every batch of bytes downloaded until a match has been found. When this happens it will just resolve the returned `Promise` with a [`NetgrepResult`](https://github.com/dgopsq/netgrep/blob/main/packages/netgrep/src/lib/data/NetgrepResult.ts).

The curious part here is how to read-while-downloading using JavaScript. At first I just tried using an `XMLHttpRequest` with an `onprogress` event, but I noticed that I couldn’t actually read the _content_ being downloaded. Trying reading the response’s value was a dead end-ish too, since as stated in the official documentation:

> […] The value is null if the request is not yet complete or was unsuccessful, with the exception that when reading text data using a responseType of "text" or the empty string (""), the response can contain the response so far while the request is still in the LOADING [readyState](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState) (3).

Even though this is an interesting tradeoff, there is a better (this is _opinionated_ obviously) approach using [`fetch` + `ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream) allowing us to read a network response “chunk by chunk”. I ~~copied the example~~ implemented it inside the `search` method [here](https://github.com/dgopsq/netgrep/blob/main/packages/netgrep/src/lib/Netgrep.ts#L95-L102).

All the other methods like `searchBatch` and `searchBatchWithCallback` are utility functions built over `search` that will provide a nice (or at least I hope 🥹) dev experience using this library.

# What about performance?

Well, as I said this was just an experiment to test a bit WASM and the integration of a library that is completely outside the "web" scope. This means that even though I have written it with performance in mind, **it’s not the best way to do a [Full-Text Search](https://en.wikipedia.org/wiki/Full-text_search)**. It could be used for small files-based databases (like this blog) and possibly with a server [supporting HTTP/2 in order to leverage multiplexing](https://http2.github.io/faq/#why-is-http2-multiplexed). Anything bigger than that will probably require a more “scalable” approach like an Index-Based Search Engine.

See ya in the next article 👋
