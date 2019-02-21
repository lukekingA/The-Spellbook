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

function drawActive() {
  let spell = _ss.ActiveSpell
  let template = spell.getDetails()
  document.getElementById('active-spell').innerHTML = template
}

function drawMySpells() {
  let mySpells = _ss.MySpells
  let template = ''
  mySpells.forEach(s => {
    template += s.getTemplate()
  })
  document.getElementById('my-spells').innerHTML = template
}

//public
export default class SpellController {
  constructor() {
    _ss.addSubscriber('apiSpells', drawList)
    _ss.addSubscriber('activeSpell', drawActive)
    _ss.addSubscriber('mySpells', drawMySpells)
    _ss.getApiSpells()
  }
  setActive(url) {
    _ss.setActive(url)
  }

  learnSpell() {
    _ss.learnSpell()
  }
}