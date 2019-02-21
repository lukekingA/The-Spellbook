import SpellService from "./spellService.js";

//private

let _ss = new SpellService()



//public
export default class SpellController {
  constructor() {
    _ss.addSubscriber('apiSpells', drawList)
    _ss.getApiSpells()
  }
}