import Link from "next/link";
import { PageData, Product } from "../../common/models";
import { Input } from "../forms";
import Pagination from "../Pagination";
import useSWR from "swr";
import ProductManageGridItem from "../product/ProductManageGridItem";
import { findAllProducts } from "../../services/ProductService";

function ManageProducts({ shopId }: { shopId: number }) {
  const { data, error, isLoading } = useSWR<PageData<Product>, Error>(
    ["/products", shopId],
    ([url, id]) => findAllProducts(id),
    {
      revalidateOnFocus: false
    }
  );

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
        {data?.contents &&
          data?.contents.map((p, i) => {
            return (
              <div className="col" key={i}>
                <ProductManageGridItem value={p} />
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
