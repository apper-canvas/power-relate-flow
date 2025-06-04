import contactsData from '../mockData/contacts.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let contacts = [...contactsData]

const contactService = {
  async getAll() {
    await delay(300)
    return [...contacts]
  },

  async getById(id) {
    await delay(200)
    const contact = contacts.find(c => c.id === id)
    return contact ? {...contact} : null
  },

  async create(contactData) {
    await delay(400)
    const newContact = {
      ...contactData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    contacts.push(newContact)
    return {...newContact}
  },

  async update(id, contactData) {
    await delay(350)
    const index = contacts.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Contact not found')
    
    contacts[index] = {
      ...contacts[index],
      ...contactData,
      updatedAt: new Date().toISOString()
    }
    return {...contacts[index]}
  },

  async delete(id) {
    await delay(250)
    const index = contacts.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Contact not found')
    
    const deletedContact = contacts.splice(index, 1)[0]
    return {...deletedContact}
  }
}

export default contactService