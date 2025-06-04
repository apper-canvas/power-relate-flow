import dealsData from '../mockData/deals.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let deals = [...dealsData]

const dealService = {
  async getAll() {
    await delay(300)
    return [...deals]
  },

  async getById(id) {
    await delay(200)
    const deal = deals.find(d => d.id === id)
    return deal ? {...deal} : null
  },

  async create(dealData) {
    await delay(400)
    const newDeal = {
      ...dealData,
      id: Date.now(),
      value: parseFloat(dealData.value) || 0,
      probability: parseInt(dealData.probability) || 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    deals.push(newDeal)
    return {...newDeal}
  },

  async update(id, dealData) {
    await delay(350)
    const index = deals.findIndex(d => d.id === id)
    if (index === -1) throw new Error('Deal not found')
    
    deals[index] = {
      ...deals[index],
      ...dealData,
      value: parseFloat(dealData.value) || deals[index].value,
      probability: parseInt(dealData.probability) || deals[index].probability,
      updatedAt: new Date().toISOString()
    }
    return {...deals[index]}
  },

  async delete(id) {
    await delay(250)
    const index = deals.findIndex(d => d.id === id)
    if (index === -1) throw new Error('Deal not found')
    
    const deletedDeal = deals.splice(index, 1)[0]
    return {...deletedDeal}
  }
}

export default dealService