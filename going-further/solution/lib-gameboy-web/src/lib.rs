use serde::Serialize;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Serialize)]
pub struct CPU(lib_gameboy::CPU);

#[wasm_bindgen]
impl CPU {
    #[wasm_bindgen(constructor)]
    pub fn new(boot_rom: Option<Vec<u8>>, game_rom: Vec<u8>) -> CPU {
        console_error_panic_hook::set_once();
        let cpu = lib_gameboy::CPU::new(boot_rom, game_rom);
        CPU(cpu)
    }

    pub fn step(&mut self) -> u8 {
        self.0.step()
    }

    #[wasm_bindgen(js_name = "setJoypad")]
    pub fn set_joypad(&mut self, joypad: Joypad) {
        self.0.bus.joypad = joypad.0;
    }

    #[wasm_bindgen(js_name = "copyCanvasToBuffer")]
    pub fn copy_canvas_to_buffer(&self, buffer: &mut [u8]) {
        buffer.copy_from_slice(&self.0.bus.gpu.canvas_buffer);
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }
}

#[wasm_bindgen]
pub enum Button {
    A,
    B,
    Start,
    Select,
    Up,
    Down,
    Right,
    Left,
}

#[wasm_bindgen]
#[derive(Serialize)]
pub struct Joypad(lib_gameboy::Joypad);

#[wasm_bindgen]
impl Joypad {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Joypad {
        Joypad(lib_gameboy::Joypad::new())
    }

    #[wasm_bindgen(js_name = "setButton")]
    pub fn set_button(&mut self, button: Button, to: bool) {
        match button {
            Button::A => self.0.a = to,
            Button::B => self.0.b = to,
            Button::Start => self.0.start = to,
            Button::Select => self.0.select = to,
            Button::Up => self.0.up = to,
            Button::Down => self.0.down = to,
            Button::Right => self.0.right = to,
            Button::Left => self.0.left = to,
        }
    }
}
