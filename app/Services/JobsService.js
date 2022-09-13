import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { Pop } from "../Utils/Pop.js"
import { SandboxServer } from "./AxiosService.js"



class JobsService {
  async deleteJob(id) {
    const yes = Pop.confirm('Delete this job?')
    if (!yes) { return }
    await SandboxServer.delete(`/api/jobs/${id}`)
    appState.jobs.filter(j => j.id !== id)
    appState.emit('jobs')
  }
  async addJob(formData) {
    const res = await SandboxServer.post('/api/jobs', formData)
    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]
  }
  async editJob(formData) {
    const job = appState.activeJob
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData)
    let index = appState.jobs.findIndex(j => j.id == job.id)
    let updatedJob = new Job(res.data)
    appState.jobs.splice(index, 1, updatedJob)
    appState.emit('jobs')
  }
  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(job => new Job(job))
  }
  setActiveJob(id) {
    let job = appState.jobs.find(j => j.id == id)
    if (!job) {
      throw new Error('Bad job ID')
    }
    appState.activeJob = job
  }
}

export const jobsService = new JobsService()