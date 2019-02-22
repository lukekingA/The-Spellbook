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

function activDel() {

}

function drawMySpells() {
  let mySpells = _ss.MySpells
  let template = ''
  mySpells.forEach(s => {
    let button = `<i onclick="app.controllers.spellController.delMySpell('${s._id}')" class="fas fa-trash-alt"></i>`
    template += s.getTemplate(button)
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
    _ss.getMyApiSpells()
  }
  setActive(url) {
    _ss.setActive(url)
  }

  learnSpell() {
    _ss.learnSpell()
  }

  delMySpell(id) {
    _ss.delMySpell(id)
  }

  dismiss(id) {
    let card = document.getElementById(id)
    card.parentElement.removeChild(card)
  }
}