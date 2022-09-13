import { setHTML, setText } from "../Utils/Writer.js"
import { appState } from "../AppState.js"
import { jobsService } from "../Services/JobsService.js"
import { Pop } from "../Utils/Pop.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Job } from "../Models/Job.js"

function drawJobs() {
  let template = ''
  appState.jobs.forEach(job => template += job.JobCardTemplate)
  setHTML('listings', template)
}


export class JobsController {
  constructor() {
    appState.on('jobs', drawJobs)
  }

  showJobs() {
    let template = /*html*/`
    <button class="btn btn-outline-light" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.addJob()">🏢 Add Job</button>
    `
    this.getJobs()
    drawJobs()
    setHTML('button-change', template)
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error('[getJobs]', error)
      Pop.error(error)
    }
  }

  async handleSubmit() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let formData = getFormData(form)

      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
      }

      // @ts-ignore
      form.reset()

    } catch (error) {
      console.error('[Jobs Handle Submit]', error)
      Pop.error(error)
    }
  }

  async deleteJob(id) {
    try {
      await jobsService.deleteJob(id)
    } catch (error) {
      console.error('[Deleting Job]', error)
      Pop.error(error)
    }
  }

  addJob() {
    appState.activeJob = null
    const template = Job.getJobForm()
    setHTML('forms', template)
    setText('rightBarLabel', 'Add Job')
  }

  beginEdit(id) {
    jobsService.setActiveJob(id)
    const editable = appState.activeJob
    const template = Job.getJobForm(editable)
    setHTML('forms', template)
    setText('rightBarLabel', 'Edit Job')
  }
}