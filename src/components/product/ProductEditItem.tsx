import Link from "next/link";
import { Input } from "../forms";

function ProductEditItem() {
  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container" style={{ height: 120 }}>
          <div className="d-flex align-items-center flex-wrap h-100">
            <h1 className="text-light">Create Product</h1>
            <div className="hstack ms-auto">
              <Link href="#">
                <a className="btn btn-light px-3 py-2">Back to shops</a>
              </Link>
              <button className="btn btn-accent py-2 px-3 ms-2">Save</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3 h-100">
          <div className="col-lg-8 order-2 order-lg-1">
            <div className="vstack gap-2 h-100">
              <div className="card h-50">
                <div className="card-header hstack bg-white py-3 px-md-4">
                  <h5 className="mb-0">Product Description</h5>
                </div>
                <div className="card-body"></div>
              </div>
              <div className="card h-50">
                <div className="card-header hstack bg-white py-3 px-md-4">
                  <h5 className="mb-0">Product Specification</h5>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 order-1 order-lg-2">
            <div className="card ">
              <div className="card-header hstack bg-white py-3 px-md-4">
                <h5 className="mb-0">Product info</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-12">
                    <Input
                      label="Name *"
                      id="nameInput"
                      name="name"
                      type="text"
                      placeholder="Enter Product Name"
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
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label">Cover photo</label>
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
