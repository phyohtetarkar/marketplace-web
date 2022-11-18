import Link from "next/link";
import { Input } from "../forms";
import Pagination from "../Pagination";
import ProductManageGridItem from "../product/ProductManageGridItem";

function ProductListing() {
  const list = [1, 2, 3, 4, 5];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row p-3">
          <div className="col">
            <Input
              id="searchinput"
              name="search"
              type="text"
              placeholder="Search your products"
            />
          </div>

          <div className="col-auto">
            <Link href="/profile/shops/id/create-product">
              <a className="ms-auto btn btn-primary h-100 hstack">Create new</a>
            </Link>
          </div>
        </div>

        <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 px-3 py-2">
          {list.map((i) => {
            return (
              <div className="col" key={i}>
                <ProductManageGridItem />
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-end pt-3 px-3">
          <Pagination hasPrev={true} hasNext={true} />
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
