import { setHTML, setText } from "../Utils/Writer.js"
import { appState } from "../AppState.js"
import { Pop } from "../Utils/Pop.js"
import { getFormData } from "../Utils/FormHandler.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"

function drawHouses() {
  let template = ''
  appState.houses.forEach(house => template += house.HouseCardTemplate)
  setHTML('listings', template)
}

export class HousesController {
  constructor() {
    appState.on('houses', drawHouses)
  }

  showHouses() {
    let template = /*html*/`
    <button class="btn btn-outline-light" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.housesController.addHouse()">🏠 Add House</button>
    `
    this.getHouses()
    drawHouses()
    setHTML('button-change', template)
    setText('rightBarLabel', 'Add House')
  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error('[getHouses]', error)
      Pop.error(error)
    }
  }

  async handleSubmit() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let formData = getFormData(form)

      if (appState.activeHouse) {
        await housesService.editHouse(formData)
      } else {
        await housesService.addHouse(formData)
      }

    } catch (error) {
      console.error('Houses Handle Submit', error)
      Pop.error(error)
    }
  }

  async deleteHouse(id) {
    try {
      await housesService.deleteHouse(id)
    } catch (error) {
      console.error('[Deleting House]', error)
      Pop.error(error)
    }
  }

  addHouse() {
    appState.activeHouse = null
    const template = House.getHouseForm()
    setHTML('forms', template)
    setText('rightBarLabel', 'Add House')
  }

  beginEdit(id) {
    housesService.setActiveHouse(id)
    const editable = appState.activeHouse
    const template = House.getHouseForm(editable)
    setHTML('forms', template)
    setText('rightBarLabel', 'Edit House')
  }
}