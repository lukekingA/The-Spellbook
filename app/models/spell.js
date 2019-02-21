export default class Spell {
  constructor(data) {
    this.name = data.name
    this.description = data.description
    this.range = data.range
    this.duration = data.duration
    this._id = data._id
    this.index = data.index
    this.url = data.url
  }
}