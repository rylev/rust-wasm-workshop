# Putting It All Together

While so far we've been focusing on Rust's interactions with JavaScript, you don't have to write very much JavaScript if you don't want to. You can instead call JavaScript and DOM apis from within Rust using the [js-sys](https://crates.io/crates/js-sys) and [web-sys](https://crates.io/crates/web-sys) crates.

## The Challenge

In this challenge, you'll be taking an existing Rust library and expanding it to be used from JavaScript just like before. However, this time the Rust code will be doing the heavy lifting of manipulating the DOM.


