export default class Spell {
  constructor(data) {
    this.name = data.name
    this.description = data.desc
    this.range = data.range
    this.duration = data.duration
    this.level = data.level
    this._id = data._id
    this.index = data.index
    this.url = data.url
  }
  getTemplate(button) {
    let validater = button ? true : false
    return `
    <li><span onclick="app.controllers.spellController.setActive('${this.url}')">${this.name}</span>  <span ${validater ? '' : 'hidden'}>${button}</span>
    </li>
    `
  }

  getDetails() {
    return `
    <div id="${this._id}" class="card text-dark d-flex flex-column align-items-center pos-stk py-3">
    <div class="card-title text-center">
    <h3>${this.name}</h3>
  </div>
  <div class="card-body">
    <p class="overflow">${this.description}</p>
  </div>
  <div class="d-flex justify-content-around w-100">
  <button class="btn-width btn btn-dark text-light" onclick="app.controllers.spellController.learnSpell()">Learn</button>
  <button class="btn btn-dark text-light" onclick="app.controllers.spellController.dismiss('${this._id}')">&times;</button>
  </div>
</div>`

  }
}