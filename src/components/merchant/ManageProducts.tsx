import Link from "next/link";
import { Input } from "../forms";
import Pagination from "../Pagination";
import ProductManageGridItem from "../product/ProductManageGridItem";

function ManageProducts() {
  const list = [1, 2, 3, 4, 5];

  return (
    <div className="p-0">
      <div className="row">
        <div className="col-auto me-auto">
          <Input
            id="searchInput"
            name="search"
            type="text"
            placeholder="Search your products"
          />
        </div>

        <div className="col-auto">
          <Link href="/profile/shops/id/create-product">
            <a className="btn btn-primary h-100 hstack">Create new</a>
          </Link>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-3">
        {list.map((i) => {
          return (
            <div className="col" key={i}>
              <ProductManageGridItem />
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-end pt-3">
        <Pagination />
      </div>
    </div>
  );
}

export default ManageProducts;
