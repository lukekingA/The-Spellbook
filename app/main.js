import SpellController from "./components/spellController.js";



class App {
  constructor() {
    this.controllers = {
      spellController: new SpellController()
    }
  }
}

window.app = new App()