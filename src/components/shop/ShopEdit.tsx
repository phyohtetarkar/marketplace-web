import { PhotoIcon } from "@heroicons/react/24/solid";
import { Input, Textarea } from "../forms";

function ShopEdit() {

    return(
        <div className="row g-3">
            <div className="col-md-8 col-lg-7">
            <div className="card">
              <div
                className="card-header bg-white p-md-4"
                style={{ height: 65 }}
              >
                <h5>Shop information</h5>
              </div>
              <div className="card-body">
                <div className="vstack">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <Input
                        label="Name"
                        id="shopNameInput"
                        name="name"
                        type="text"
                        placeholder="Enter shop name"
                      />
                    </div>
                    <div className="col-lg-12">
                      <Input
                        label="Headline"
                        id="headlineInput"
                        name="headline"
                        type="text"
                        placeholder="Enter shop headline"
                      />
                    </div>
                    <div className="col-lg-12">
                      <Textarea
                        label="Description"
                        id="descriptionInput"
                        name="description"
                        type="text"
                        placeholder="Enter brief about shop..."
                      />
                    </div>
                    <div className="col-lg-12">
                      <input
                        id="isRecommendedShop"
                        type="checkbox"
                        name="recommended"
                        className="form-check-input me-2"
                      ></input>
                      <label htmlFor="recommendedInput mb-0" className="form-label">
                        <div className="vstack">
                          Recommended
                          <span className="text-dark-gray small fw-light">
                            Mark as recommended shop
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="col-lg-3 col-12">
                      <label htmlFor="avatarInput" className="form-label">
                        Shop Avatar
                      </label>
                      <div
                        className="d-flex align-items-center justify-content-center border rounded position-relative" style={{height:75, width:75}}
                      >
                        <span className="position-absolute">
                          <PhotoIcon
                            className="text-muted"
                            strokeWidth={2}
                            width={25}
                          />
                        </span>
                        <input
                          className="form-control border-0 opacity-0"
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 mb-2">
                      <label htmlFor="Input" className="form-label">
                        Cover Image
                      </label>
                      <div className="card" style={{borderStyle: "dashed"}}>
                        <div className="card-body p-0 m-0">
                            <div className="d-flex justify-content-center m-5">
                             <span className="position-absolute text-decoration-none text-muted">
                             Drop file here to upload
                             </span> 
                            <input
                                className="form-control border-0 opacity-0 stretched-link"
                                type="file"/>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-5"></div>
        </div>
    );
}

export default ShopEdit;