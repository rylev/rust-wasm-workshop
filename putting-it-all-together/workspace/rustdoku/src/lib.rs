mod game;

use game::Game;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct GameInstance {
    board: Board,
}

#[wasm_bindgen]
impl GameInstance {
    #[wasm_bindgen(constructor)]
    pub fn new() -> GameInstance {
        let board = Board::new();
        GameInstance { board }
    }

    pub fn draw(mut self) {}
}

pub struct Board {
    game: Game,
}

impl Board {
    pub fn new() -> Board {
        let game = Game::random_new(10);
        Board { game }
    }

    pub fn draw(&mut self) {}
}
