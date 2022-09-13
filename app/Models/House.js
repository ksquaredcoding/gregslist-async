export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
  }

  get HouseCardTemplate() {
    return /*html*/`
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card">
        <img src="${this.imgUrl}" alt="" class="img-fluid">
        <div class="card-body">
          <h5 class="text-uppercase">
            ${this.bedrooms} Bed | ${this.bathrooms} Bath
            ${this.levels} Levels
          </h5>
          <p>Year Built: ${this.year}</p>
          <p>
            <strong>$${this.price}</strong>
          </p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.housesController.deleteHouse('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.housesController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `
  }

  static getHouseForm(editable) {
    editable = editable || new House({ bedrooms: 0, bathrooms: 0, levels: 0, year: 1900, price: 0, imgUrl: '', description: '' })

    return /*html*/`
      <form onsubmit="app.housesController.handleSubmit()">

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="bedrooms" value="${editable.bedrooms}">
              <label for="bedrooms">Number of Bedrooms</label>
            </div>

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="bathrooms" value="${editable.bathrooms}">
              <label for="bathrooms">Number of Bathrooms</label>
            </div>

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="levels" value="${editable.levels}">
              <label for="levels">Number of Levels</label>
            </div>

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="year" max="9999" value="${editable.year}">
              <label for="year">Year</label>
            </div>

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="price" required min="0" value="${editable.price}">
              <label for="price">Price</label>
            </div>

            <div class="form-floating mb-3">
              <input type="url" class="form-control" name="imgUrl" required value="${editable.imgUrl}">
              <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
            </div>

            <div class="form-floating">
              <textarea class="form-control" placeholder="Describe your Listing" name="description"></textarea>
              <label for="description">Description</label>
            </div>

            <div class="d-flex my-4 gap-5 align-items-center">
              <button class="btn text-uppercase" type="reset" data-bs-dismiss="offcanvas">Cancel</button>
              <button class="btn btn-primary text-uppercase" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
            </div>
          </form>
    `
  }
}