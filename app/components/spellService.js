import Spell from "../models/spell.js";

//private
function formatUrl(url) {
  return '//bcw-getter.herokuapp.com/?url=' + encodeURIComponent(url)
}

// @ts-ignore
let _spellApi = axios.create({
  baseURL: ''
})

let _sandbox = {}

let _state = {
  apiSpells: [],
  activeSpell: {},
  mySpells: []
}

let _subscribers = {
  apiSpells: [],
  activeSpell: [],
  mySpells: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class SpellService {
  learnSpell() {
    _state.mySpells.push(_state.activeSpell)
    setState('mySpells', _state.mySpells)
  }
  setActive(url) {
    _spellApi.get(formatUrl(url))
      .then(res => {
        let data = new Spell(res.data)
        setState('activeSpell', data)
      })
  }
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get ApiSpells() {
    return _state.apiSpells.map(s => new Spell(s))
  }
  get ActiveSpell() {
    return _state.activeSpell
  }
  get MySpells() {
    return _state.mySpells
  }

  getApiSpells() {
    _spellApi.get(formatUrl('http://www.dnd5eapi.co/api/spells'))
      .then(res => {
        let data = res.data.results.map(s => new Spell(s))
        setState('apiSpells', data)
      })
      .catch(err => console.error(err))
  }


}