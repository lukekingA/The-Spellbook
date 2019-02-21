import SpellService from "./spellService.js";

//private

let _ss = new SpellService()

function drawList() {
  let spells = _ss.ApiSpells
  let template = ''
  spells.forEach(s => {
    template += s.getTemplate()
  })
  document.getElementById('spell-list').innerHTML = template
}


//public
export default class SpellController {
  constructor() {
    _ss.addSubscriber('apiSpells', drawList)
    _ss.addSubscriber('activeSpell', drawActive)
    _ss.getApiSpells()
  }
  setActive(url) {
    _ss.setActive(url)
  }
}