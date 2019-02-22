import Spell from "../models/spell.js";

//private

function formatUrl(url) {
  return '//bcw-getter.herokuapp.com/?url=' + encodeURIComponent(url)
}
//http: //www.dnd5eapi.co/api/spells/
// @ts-ignore
let _spellApi = axios.create({
  baseURL: ''
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Lukea/spells/'
})

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
    let compare = _state.mySpells.filter(s => s.index == _state.activeSpell.index)
    if (!compare.length) {
      _sandbox.post('', _state.activeSpell).then(res => {
        this.getMyApiSpells()
      })
    }

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
    return _state.mySpells.map(s => new Spell(s))
  }

  getApiSpells() {
    _spellApi.get(formatUrl('http://www.dnd5eapi.co/api/spells'))
      .then(res => {
        let data = res.data.results.map(s => new Spell(s))
        setState('apiSpells', data)
      })
      .catch(err => console.error(err))
  }

  getMyApiSpells() {
    _sandbox.get().then(res => {
      let data = res.data.data
      setState('mySpells', data)
    }).catch(err => console.log(err))
  }

  delMySpell(id) {
    _sandbox.delete(id).then(res => {
      this.getMyApiSpells()
    })
  }

}
//
//