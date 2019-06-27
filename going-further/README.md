# Going Further

We've now seen the basics of how we can use wasm-bingen and wasm-pack to interact between Rust (compiled to WebAssembly) and JavaScript. We'll now take this a step further.

## The Challenge

Inside of the [workspace](./workspace) directory, you'll find three files for a small application that allows you to play GameBoy games. This application is built using vue.js although we won't be touching the JavaScript part of this app much so this isn't really important.

The [JavaScript file](./workspace/index.js) imports a generated JavaScript file that has yet to be created. This generated JS file contains functions for creating and running a Gameboy CPU. The logic for all of this is implemented in a Rust crate called "lib-gameboy" you can find in the [common](./common) folder.

Pretend you do not have access to lib-gameboy and create another crate that wraps lib-gameboy and exposes it's functionality in the exact way it's being consumed inside of index.js. You should not need to modify "lib-gameboy" or any of the other existing files to get his to work.

## Some Resources

* The [wasm-bindgen documentation]() has great documentation on how to expose Rust structs, enums and modules to JavaScript in a way that looks idiomatic to the JavaScript.
