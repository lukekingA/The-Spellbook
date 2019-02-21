//private

function formatUrl(url) {
  return '//bcw-getter.herokuapp.com/?url=' + encodeURIComponent(url)
}

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
