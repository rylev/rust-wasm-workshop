# Going Further

We've now seen the basics of how we can use wasm-bingen and wasm-pack to interact between Rust (compiled to WebAssembly) and JavaScript. We'll now take this a step further.

## The Challenge

Inside of the [workspace](./workspace) directory, you'll find three files for a small application that allows you to play GameBoy games. This application is built using vue.js although we won't be touching the JavaScript part of this app much so this isn't really important.

The [JavaScript file](./workspace/index.js) imports a generated JavaScript file that has yet to be created. This generated JS file contains functions for creating and running a Gameboy CPU. The logic for all of this is implemented in a Rust crate called "lib-gameboy" you can find in the [common](./common) folder.

Pretend you do not have access to lib-gameboy and create another crate that wraps lib-gameboy and exposes it's functionality in the exact way it's being consumed inside of index.js. You should not need to modify "lib-gameboy" or any of the other existing files to get his to work.

## Some Things to Know

The `#[wasm-bindgen]` attribute can be put on more than just functions. Structs, enums, implementations, and more can also be exposed to JavaScript.

Beyond the basic `#[wasm-bindgen]` attribute, there are arguments that can be provided to the attribute that allow you define how a Rust type will be exposed to JavaScript. Some common ones to know are:

 * `#[wasm_bindgen(js_name = "someName")]` can be used to modified how a particular item will be exposed to JavaScript
 * `#[wasm_bindgen(constructor)]` can be used to create JavaScript contructors that use the `new MyObject()` syntax.

## Some Resources

* The [wasm-bindgen documentation](https://rustwasm.github.io/docs/wasm-bindgen/reference/attributes/index.html) has great documentation on how to expose Rust structs, enums and modules to JavaScript in a way that looks idiomatic to the JavaScript.
* The [Rust and WebAssembly book](https://rustwasm.github.io/docs/book/) has a lot of details on how to do this.

## Exercises

1.) Try creating custom types that can be used from JavaScript. Inspect the JavaScript generated for this and try to understand how the type gets converted to and from JavaScript.
2.) In the challenge we used a common pattern where we wrapped types from another library and exposed these wrapper types to JavaScript using wasm-bindgen. If we have access to the base library we may just want to directly expose our types to wasm-bindgen. Copy lib-gameboy and modifiy it such that it directly exposes its types to JavaScript without needing to be wrapped.
