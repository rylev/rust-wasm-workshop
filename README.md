# Rust WebAssembly Workshop

This is a workshop for learning about the usage and inner workings of Rust WebAssembly with a focus on the wasm-bindgen based toolchain.

## Suggested Prerequisites

This workshop assumes that you are familiar with Rust to an advanced beginner or intermediate level. If you are not, I suggest first taking a look at the [Rust Programming Language Book](https://doc.rust-lang.org/book/).

You should also have a passing familiarity with JavaScript.

## Getting Started

Make sure that you have the lastest version of [Rust installed](https://rustup.rs/) as well as [`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/).

Once you have this, navigate to the [`getting-started`](./getting-started) folder.

## Contents

The workshop is composed of three parts:

* [Getting Start](./getting-started): This covers the very basics of Rust and WebAssembly using wasm-bindgen and wasm-pack. Start here if you know nothing about Rust and WebAssembly tooling or need a quick refresher.
* [Going Further](./going-further): This section takes your learning even further by having you take an existing Rust library and using it from JavaScript.
* [Putting It All Together](./putting-it-all-together): This section has you expand a Rust library to create the user interface in the browser through Rust and then start it all up by calling it from JavaScript.
