import { Input } from "../forms";
import Pagination from "../Pagination";
import { ProductGridItem } from "../product";

function ShopProductListing() {
  const list = [1, 2, 3, 4, 5];

  return (
    <div className="p-0">
      <div className="row">
        <div className="col-auto ms-auto">
          <Input
            id="searchInput"
            name="search"
            type="text"
            placeholder="Search your products"
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-3">
        {list.map((i) => {
          return (
            <div className="col" key={i}>
              <ProductGridItem />
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

export default ShopProductListing;
