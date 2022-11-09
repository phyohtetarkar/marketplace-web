import { PhotoIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Input, Textarea } from "../forms";

function ShopEdit({ create = {} }) {
  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                {create ? (
                  <h3 className="text-light text-lg-start">Create Shop</h3>
                ) : (
                  <h3 className="text-light text-lg-start">Edit Shop</h3>
                )}
              </div>
              <div className="row px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link href="/profile/shops">
                        <a href="#" className="text-light">
                          Shops
                        </a>
                      </Link>
                    </li>
                    {create ? (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Create Shop
                      </li>
                    ) : (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Edit Shop
                      </li>
                    )}
                  </ol>
                </nav>
              </div>
            </div>
            <div className="ms-auto">
              {create ? (
                <button className="btn btn-accent py-2 px-3 ms-2">
                  Create
                </button>
              ) : (
                <button className="btn btn-accent py-2 px-3 ms-2">
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3">
          <div className="col-md-8 col-lg-7">
            <div className="card">
              <div className="card-header bg-white py-3 px-md-4">
                <h5 className="mb-0">Shop information</h5>
              </div>
              <div className="card-body">
                <div className="vstack">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <Input
                        label="Name *"
                        id="shopNameInput"
                        name="name"
                        type="text"
                        placeholder="Enter shop name"
                      />
                    </div>
                    <div className="col-lg-12">
                      <Input
                        label="Slug *"
                        id="slugInput"
                        name="slug"
                        type="text"
                        placeholder="https://shoppingcenter.com/page/slug"
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
                    <div className="col-lg-6">
                      <Input
                        label="Latitude"
                        id="latitudeInput"
                        name="latitude"
                        type="text"
                        placeholder="Enter location latitude"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        label="Longitude"
                        id="longitudeInput"
                        name="longitude"
                        type="text"
                        placeholder="Enter location longitude"
                      />
                    </div>
                    <div className="col-lg-12">
                      <Textarea
                        label="About us"
                        id="descriptionInput"
                        name="description"
                        type="text"
                        placeholder="Enter brief about shop..."
                      />
                    </div>
                    <div className="col-lg-3 col-12">
                      <label htmlFor="avatarInput" className="form-label">
                        Shop Logo
                      </label>
                      <div
                        className="d-flex align-items-center justify-content-center border rounded position-relative"
                        style={{ height: 75, width: 75 }}
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
                      <div className="card" style={{ borderStyle: "dashed" }}>
                        <div className="card-body p-0 m-0">
                          <div className="d-flex justify-content-center m-5">
                            <span className="position-absolute text-decoration-none text-muted">
                              Drop file here to upload
                            </span>
                            <input
                              className="form-control border-0 opacity-0 stretched-link"
                              type="file"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-5">
            <div className="card mb-4">
              <div className="card-header bg-white py-3 px-md-4">
                <h5 className="mb-0">Social</h5>
              </div>
              <div className="card-body">
                <div className="vstack">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <Input
                        label="Facebook"
                        id="facebookInput"
                        name="facebook"
                        type="text"
                        placeholder="Enter facebook link"
                      />
                    </div>
                    <div className="col-lg-12">
                      <Input
                        label="Twitter"
                        id="twitterInput"
                        name="twitter"
                        type="text"
                        placeholder="Enter twitter link"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header bg-white py-3 px-md-4">
              <div className="hstack">
                  <h5 className="mb-0">Shop branches</h5>
                  <div className="ms-auto">
                    <Link href="/profile/shops/create">
                      <a className="btn btn-primary">Add</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="vstack">
                  <div>Type here...</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header bg-white py-3 px-md-4">
                <div className="hstack">
                  <h5 className="mb-0">Members</h5>
                  <div className="ms-auto">
                    <Link href="/profile/shops/create">
                      <a className="btn btn-primary">Add</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="vstack">
                  <div>Type here...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopEdit;
