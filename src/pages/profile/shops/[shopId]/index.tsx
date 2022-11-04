import { Button } from "bootstrap";
import Link from "next/link";
import { ProductGridItem } from "../../../../components/product";

function ShopDetail() {
  return (
    <div className="vstack">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                <h3 className="text-light text-lg-start">Shop Overview</h3>
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
                    <li className="breadcrumb-item active" aria-current="page">
                      Shoes World
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="card-group mt-2">
          <div className="card bg-white">
            <div className="p-3">
              <h4 className="title">138</h4>
              <span>Total Products</span>
            </div>
          </div>
          <div className="card bg-white">
            <div className="p-3">
              <h4 className="title">30</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className="card bg-white">
            <div className="p-3">
              <h4 className="title">12</h4>
              <span>Awaiting delivery</span>
            </div>
          </div>
          <div className="card bg-white">
            <div className="p-3">
              <h4 className="title">50</h4>
              <span>Delivered items</span>
            </div>
          </div>
        </div>
        <div className="card mt-3 mb-3">
          <div className="card-header bg-white fs-4 fw-semibold p-3">
            <div className="hstack">
              Products
              <div className="ms-auto">
                <Link href="/profile/shops/1/create-product">
                  <a className="btn btn-accent">Create Product</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-3">
                <ProductGridItem />
              </div>
              <div className="col-lg-3">
                <ProductGridItem />
              </div>
              <div className="col-lg-3">
                <ProductGridItem />
              </div>
              <div className="col-lg-3">
                <ProductGridItem />
              </div>
              <div className="col-lg-3">
                <ProductGridItem />
              </div>
              <div className="col-lg-3">
                <ProductGridItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetail;
