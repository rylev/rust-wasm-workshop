
let wasm;

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
*/
export const Button = Object.freeze({ A:0,B:1,Start:2,Select:3,Up:4,Down:5,Right:6,Left:7, });
/**
*/
export class CPU {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_cpu_free(ptr);
    }
    /**
    * @param {Uint8Array} boot_rom
    * @param {Uint8Array} game_rom
    * @returns {}
    */
    constructor(boot_rom, game_rom) {
        const ptr0 = isLikeNone(boot_rom) ? [0, 0] : passArray8ToWasm(boot_rom);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm(game_rom);
        const len1 = WASM_VECTOR_LEN;
        this.ptr = wasm.cpu_new(ptr0, len0, ptr1, len1);
    }
    /**
    * @returns {number}
    */
    step() {
        return wasm.cpu_step(this.ptr);
    }
    /**
    * @param {Joypad} joypad
    * @returns {void}
    */
    setJoypad(joypad) {
        const ptr0 = joypad.ptr;
        joypad.ptr = 0;
        return wasm.cpu_setJoypad(this.ptr, ptr0);
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {void}
    */
    copyCanvasToBuffer(buffer) {
        const ptr0 = passArray8ToWasm(buffer);
        const len0 = WASM_VECTOR_LEN;
        try {
            return wasm.cpu_copyCanvasToBuffer(this.ptr, ptr0, len0);

        } finally {
            buffer.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
    /**
    * @returns {any}
    */
    toJson() {
        return takeObject(wasm.cpu_toJson(this.ptr));
    }
}
/**
*/
export class Joypad {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_joypad_free(ptr);
    }
    /**
    * @returns {}
    */
    constructor() {
        this.ptr = wasm.joypad_new();
    }
    /**
    * @param {number} button
    * @param {boolean} to
    * @returns {void}
    */
    setButton(button, to) {
        return wasm.joypad_setButton(this.ptr, button, to);
    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(JSON.parse(varg0));
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        return addHeapObject(new Error());
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).stack);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);

        varg0 = varg0.slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);

        console.error(varg0);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

