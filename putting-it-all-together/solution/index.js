import init, { GameInstance } from './pkg/rustdoku.js';

async function main() {
  await init('./pkg/rustdoku_bg.wasm');
  const element = document.getElementById("container");
  let instance = new GameInstance();
  instance.draw(element);
}

main();