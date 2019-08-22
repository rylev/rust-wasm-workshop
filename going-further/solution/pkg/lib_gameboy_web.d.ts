/* tslint:disable */
export enum Button {
  A,
  B,
  Start,
  Select,
  Up,
  Down,
  Right,
  Left,
}
/**
*/
/**
*/
export class CPU {
  free(): void;
/**
* @param {Uint8Array} boot_rom 
* @param {Uint8Array} game_rom 
* @returns {} 
*/
  constructor(boot_rom: Uint8Array, game_rom: Uint8Array);
/**
* @returns {number} 
*/
  step(): number;
/**
* @param {Joypad} joypad 
* @returns {void} 
*/
  setJoypad(joypad: Joypad): void;
/**
* @param {Uint8Array} buffer 
* @returns {void} 
*/
  copyCanvasToBuffer(buffer: Uint8Array): void;
/**
* @returns {any} 
*/
  toJson(): any;
}
/**
*/
export class Joypad {
  free(): void;
/**
* @returns {} 
*/
  constructor();
/**
* @param {number} button 
* @param {boolean} to 
* @returns {void} 
*/
  setButton(button: number, to: boolean): void;
}

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path?: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        