import Link from "next/link";
import { Input, Select } from "../forms";

function ProductEditItem({ create = {} }) {
  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                {create ? (
                  <h3 className="text-light text-lg-start">Create Product</h3>
                ) : (
                  <h3 className="text-light text-lg-start">Edit Product</h3>
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
                    <li className="breadcrumb-item">
                      <Link href="/profile/shops/1">
                        <a href="#" className="text-light">
                          Shoes World
                        </a>
                      </Link>
                    </li>
                    {create ? (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Create Product
                      </li>
                    ) : (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Edit Product
                      </li>
                    )}
                  </ol>
                </nav>
              </div>
            </div>
            <div className="ms-auto">
              {create ? (
                <button className="btn btn-accent py-2 px-3 ms-2">Save</button>
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
          <div className="col-lg-8 order-2 order-lg-1 d-flex">
            <div className="vstack gap-2">
              <div className="card h-100">
                <div className="card-header bg-white py-3 px-md-4">
                  <h5 className="mb-0">Product description</h5>
                </div>
                <div className="card-body py-3 px-md-4">Type here...</div>
              </div>
              <div className="card h-100">
                <div className="card-header bg-white py-3 px-md-4">
                  <h5 className="mb-0">Product specification</h5>
                </div>
                <div className="card-body py-3 px-md-4">Type here...</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 order-1 order-lg-2">
            <div className="card ">
              <div className="card-header bg-white py-3 px-md-4">
                <h5 className="mb-0">Product Info</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-12">
                    <Input
                      label="Name *"
                      id="nameInput"
                      name="name"
                      type="text"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Input
                      label="Code *"
                      id="codeInput"
                      name="code"
                      type="text"
                      placeholder="Enter product code"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Input
                      label="Slug *"
                      id="slugInput"
                      name="slug"
                      type="text"
                      placeholder="https://shopping/create/slug"
                    />
                    <span className="form-text">
                      Field must contain an unique value.
                    </span>
                  </div>
                  <div className="col-lg-12">
                    <Input
                      label="Price *"
                      id="priceInput"
                      name="price"
                      type="number"
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Select label="Brand *">
                      <option>Adidas</option>
                      <option>Samsung</option>
                    </Select>
                  </div>
                  <div>
                    <div className="row gy-2">
                      <div className="col-lg-12">
                        <Select label="Category *">
                          <option>1</option>
                          <option>2</option>
                        </Select>
                      </div>
                      <div className="col-lg-12">
                        <Select>
                          <option>1</option>
                          <option>2</option>
                        </Select>
                      </div>
                      <div className="col-lg-12">
                        <Select>
                          <option>1</option>
                          <option>2</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label">Product Images *</label>
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
                  <div>
                    <div className="row gy-2">
                      <div className="col-lg-6">
                        <Input
                          label="Discount"
                          id="discountInput"
                          name="discount"
                          type="number"
                          placeholder="Enter discount"
                        />
                      </div>
                      <div className="col-lg-6">
                        <Select label="Type">
                          <option value="fixed">.00</option>
                          <option value="percent">%</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row gy-2">
                      <div className="col-4 col-md-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                          ></input>
                          <label className="form-check-label">
                            New arrival
                          </label>
                        </div>
                      </div>
                      <div className="col-4 col-md-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                          ></input>
                          <label className="form-check-label">Available</label>
                        </div>
                      </div>
                      <div className="col-4 col-md-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                          ></input>
                          <label className="form-check-label">Suspended</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEditItem;
