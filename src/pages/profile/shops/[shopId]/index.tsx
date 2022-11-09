import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatPrice, formatTimestamp } from "../../../../common/utils";
import { Input } from "../../../../components/forms";
import Pagination from "../../../../components/Pagination";

function ActionMenu() {
  return (
    <div className="hstack align-items-center gap-2">
      <Link href={`/profile/shops/id/id`}>
        <a className="btn btn-primary">
          <PencilSquareIcon width={20} />
        </a>
      </Link>
      <button
        disabled={false}
        className="btn btn-outline-danger"
        onClick={async () => {}}
      >
        <TrashIcon width={20} />
      </button>
    </div>
  );
}

function ProductRow() {
  return (
    <tr>
      <td className="ps-3 ps-lg-4">
        <div className="vstack">
          <span className="text-muted text-truncate">
            Product Name Here Product Name Here Product Name Here Product Name
            Here
          </span>
          <span className="small text-warning">Category</span>
        </div>
      </td>
      <td>
        <span className="text-muted">{formatPrice(50000)} Ks</span>
      </td>
      <td>
        <span className="text-muted">
          {formatTimestamp(new Date().getTime())}
        </span>
      </td>
      <td>
        <ActionMenu />
      </td>
    </tr>
  );
}
function ShopDetail() {
  const list = [1, 2, 3, 4, 5];

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
        {/*  <div className="card mt-3 mb-3">
          <div className="card-header bg-white fs-4 fw-semibold p-3">
            <div className="hstack">
              Products
              <div className="ms-auto">
                <Link href="/profile/shops/1/create-product">
                  <a className="btn btn-primary">Create product</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
              <div className="col">
                <ProductManageGridItem />
              </div>
              <div className="col">
                <ProductManageGridItem />
              </div>
              <div className="col">
                <ProductManageGridItem />
              </div>
              <div className="col">
                <ProductManageGridItem />
              </div>
              <div className="col">
                <ProductManageGridItem />
              </div>
              <div className="col">
                <ProductManageGridItem />
              </div>
            </div>
          </div>
        </div> */}
        <div className="card mt-3 mb-3">
          <div className="card-header bg-white fs-4 fw-semibold p-3">
            Products
          </div>
          <div className="card-body">
            <div className="vstack gap-3">
              <div className="row">
                <div className="col">
                  <Input
                    id="filterProductsInput"
                    name="filter"
                    type="text"
                    placeholder="Search your products"
                  />
                </div>
                <div className="col-auto">
                  <Link href="/profile/shops/1/create-product">
                    <a className="btn btn-primary btn-lg">Create new</a>
                  </Link>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table bg-white align-middle">
                  <thead className="table-light text-nowrap align-middle">
                    <tr style={{ height: 50 }}>
                      <th className="ps-3 ps-lg-4 fw-medium col-lg-8">NAME</th>
                      <th className="fw-medium">PRICE</th>
                      <th className="fw-medium">CREATED AT</th>
                      <th className="fw-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {list.map((i) => (
                      <ProductRow key={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card-footer bg-white p-0">
            <div className="float-end pt-3 px-3">
              <Pagination hasPrev={true} hasNext={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetail;
