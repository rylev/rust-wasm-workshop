
let wasm;

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

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

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

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function doesNotExist() {
    throw new Error('imported function or type does not exist');
}
/**
*/
export class GameInstance {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_gameinstance_free(ptr);
    }
    /**
    * @returns {}
    */
    constructor() {
        this.ptr = wasm.gameinstance_new();
    }
    /**
    * @returns {void}
    */
    draw() {
        const ptr = this.ptr;
        this.ptr = 0;
        return wasm.gameinstance_draw(ptr);
    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        return typeof(getObject(arg0)) === 'function';
    };
    imports.wbg.__wbindgen_cb_forget = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        return getObject(arg0) instanceof Window;
    };
    imports.wbg.__widl_f_create_element_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).createElement(varg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_create_text_node_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        return addHeapObject(getObject(arg0).createTextNode(varg1));
    };
    imports.wbg.__widl_f_get_element_by_id_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);

        const val = getObject(arg0).getElementById(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_set_id_Element = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).id = varg1;
    };
    imports.wbg.__widl_f_set_class_name_Element = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).className = varg1;
    };
    imports.wbg.__widl_f_add_event_listener_with_callback_EventTarget = function(arg0, arg1, arg2, arg3) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            getObject(arg0).addEventListener(varg1, getObject(arg3));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_append_child_Node = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).appendChild(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_remove_child_Node = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).removeChild(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_first_child_Node = function(arg0) {

        const val = getObject(arg0).firstChild;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_document_Window = function(arg0) {

        const val = getObject(arg0).document;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__wbg_call_836fa928f74337e5 = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        return addHeapObject(getObject(arg0));
    };
    imports.wbg.__wbg_newnoargs_8d1797b163dbc9fb = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(new Function(varg0));
    };
    imports.wbg.__wbg_floor_c948efd0cdda83d4 = typeof Math.floor === 'undefined' ? doesNotExist : Math.floor;
    imports.wbg.__wbg_random_4eec15c1337c828c = typeof Math.random === 'undefined' ? doesNotExist : Math.random;
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };
    imports.wbg.__wbindgen_closure_wrapper43 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(9);
        const d = wasm.__wbg_function_table.get(10);
        const b = arg1;
        const cb = function() {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b);

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
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

