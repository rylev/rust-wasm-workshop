mod game;

use game::Game;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

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

    pub fn draw(mut self) {
        self.board.draw();
        let wrapped_self = std::rc::Rc::new(std::cell::RefCell::new(self));
        let document = web_sys::window().unwrap_throw().document().unwrap_throw();
        let container = document.get_element_by_id("container").unwrap_throw();

        let controls_div = document.create_element("div").unwrap_throw();
        controls_div.set_id("controls");
        container.append_child(&controls_div).unwrap_throw();

        let new_button = document.create_element("div").unwrap_throw();
        let new_button_text = document.create_text_node("New");
        new_button.append_child(&new_button_text).unwrap_throw();
        new_button.set_class_name("button");
        let for_new = wrapped_self.clone();
        let closure = move || {
            for_new.borrow_mut().board = Board::new();
            for_new.borrow_mut().board.draw();
        };
        let closure = Closure::wrap(Box::new(closure) as Box<dyn FnMut()>);
        new_button
            .add_event_listener_with_callback("click", closure.as_ref().dyn_ref().unwrap_throw())
            .unwrap_throw();
        closure.forget();
        controls_div.append_child(&new_button).unwrap_throw();

        let solve_button = document.create_element("div").unwrap_throw();
        let solve_button_text = document.create_text_node("Solve");
        solve_button.append_child(&solve_button_text).unwrap_throw();
        solve_button.set_class_name("button");

        let closure = move || {
            wrapped_self.borrow_mut().board.game.solve();
            wrapped_self.borrow_mut().board.draw();
        };

        let closure = Closure::wrap(Box::new(closure) as Box<dyn FnMut()>);
        solve_button
            .add_event_listener_with_callback("click", closure.as_ref().dyn_ref().unwrap_throw())
            .unwrap_throw();
        closure.forget();
        controls_div.append_child(&solve_button).unwrap_throw();
    }
}

pub struct Board {
    game: Game,
}

impl Board {
    pub fn new() -> Board {
        let game = Game::random_new(10);
        Board { game }
    }

    pub fn draw(&mut self) {
        let document = web_sys::window().unwrap_throw().document().unwrap_throw();
        let board_div = match document.get_element_by_id("board") {
            Some(b) => b,
            None => {
                let board_div = document.create_element("div").unwrap_throw();
                board_div.set_id("board");
                let container = document.get_element_by_id("container").unwrap_throw();
                container.append_child(&board_div).unwrap_throw();
                board_div
            }
        };

        while let Some(child) = board_div.first_child() {
            board_div.remove_child(&child).unwrap_throw();
        }

        for (square_n, square) in self.game.squares().iter().enumerate() {
            let square_div = document.create_element("div").unwrap_throw();
            square_div.set_class_name(&format!("square square-{}", square_n));
            for cell in square.iter() {
                let cell_div = document.create_element("div").unwrap_throw();
                cell_div.set_class_name("cell");
                if let Some(cell) = cell {
                    let text_node = document.create_text_node(&format!("{}", cell));
                    cell_div.append_child(&text_node).unwrap_throw();
                }
                square_div.append_child(&cell_div).unwrap_throw();
            }
            board_div.append_child(&square_div).unwrap_throw();
        }
    }
}
