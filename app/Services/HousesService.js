import { House } from "../Models/House.js"
import { Pop } from "../Utils/Pop.js"
import { SandboxServer } from "./AxiosService.js"
import { appState } from "../AppState.js"

class HousesService {
  setActiveHouse(id) {
    let house = appState.houses.find(h => h.id == id)
    if (!house) {
      throw new Error('Bad House ID')
    }
    appState.activeHouse = house
  }
  async deleteHouse(id) {
    const yes = await Pop.confirm('Delete this house?')
    if (!yes) { return }
    await SandboxServer.delete(`/api/houses/${id}`)
    appState.houses = appState.houses.filter(h => h.id !== id)
  }
  async addHouse(formData) {
    const res = await SandboxServer.post('/api/houses', formData)
    let house = new House(res.data)
    appState.houses = [...appState.houses, house]
  }
  async editHouse(formData) {
    const house = appState.activeHouse
    const res = await SandboxServer.put(`/api/houses/${house.id}`)
    let index = appState.houses.findIndex(h => h.id == house.id)
    let updatedHouse = new House(formData)
    appState.houses.splice(index, 1, updatedHouse)
    appState.emit('houses')
  }
  async getHouses() {
    const res = await SandboxServer.get('/api/houses')
    appState.houses = res.data.map(house => new House(house))
  }

}

export const housesService = new HousesService()