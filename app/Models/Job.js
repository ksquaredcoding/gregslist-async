


export class Job {
  constructor(data) {
    this.id = data.id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }

  get JobCardTemplate() {
    return /*html*/`
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="text-uppercase">
            Company: ${this.company}
          </h5>
          <h5 class="text-uppercase">
            Title: ${this.jobTitle}
          </h5>
          <p>
            Rate: <strong>$${this.rate}</strong>
          </p>
          <p>Hours: <strong>${this.hours}</strong></p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `
  }

  static getJobForm(editable) {
    editable = editable || new Job({ company: '', jobTitle: '', hours: 0, rate: 0, description: '' })

    return /*html*/`
          <form onsubmit="app.jobsController.handleSubmit()">

            <div class="form-floating mb-3">
              <input type="text" class="form-control" name="company" required minlength="3" maxlength="20"
              value="${editable.company}">
              <label for="company">Company</label>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" name="jobTitle" required value="${editable.jobTitle}">
              <label for="jobTitle">Job Title</label>
            </div>

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="hours" required value="${editable.hours}">
              <label for="hours">Hours Per Week</label>
            </div>

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="rate" required min="0" value="${editable.rate}">
              <label for="rate">Rate Per Hour</label>
            </div>

            <div class="form-floating">
              <textarea class="form-control" placeholder="Describe your Listing" name="description">
              ${editable.description}</textarea>
              <label for="description">Description</label>
            </div>

            <div class="d-flex my-4 gap-5 align-items-center">
              <button class="btn text-uppercase" type="reset" data-bs-dismiss="offcanvas">Cancel</button>
              <button class="btn btn-primary text-uppercase" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
            </div>
          </form>
        </div>
      </div>
    `
  }
}