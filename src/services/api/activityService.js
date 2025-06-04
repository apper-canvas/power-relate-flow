import activitiesData from '../mockData/activities.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let activities = [...activitiesData]

const activityService = {
  async getAll() {
    await delay(300)
    return [...activities].sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate))
  },

  async getById(id) {
    await delay(200)
    const activity = activities.find(a => a.id === id)
    return activity ? {...activity} : null
  },

  async create(activityData) {
    await delay(400)
    const newActivity = {
      ...activityData,
      id: Date.now(),
      duration: parseInt(activityData.duration) || 30,
      activityDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
    activities.push(newActivity)
    return {...newActivity}
  },

  async update(id, activityData) {
    await delay(350)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    activities[index] = {
      ...activities[index],
      ...activityData,
      duration: parseInt(activityData.duration) || activities[index].duration
    }
    return {...activities[index]}
  },

  async delete(id) {
    await delay(250)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    const deletedActivity = activities.splice(index, 1)[0]
    return {...deletedActivity}
  }
}

export default activityService