import Head from "next/head";
import { Input, Select } from "../../components/forms";
import Pagination from "../../components/Pagination";
import ShopGridItem from "../../components/shop/ShopGridItem";

function Shops() {
  const list = [1, 2, 3, 4, 5];

  return (
    <div className="mb-5">
      <Head>
        <title>All Proudcts</title>
      </Head>
      <div className="header-bar">
        <div className="container py-4">
          <h1 className="text-center text-lg-start fw-bold">Shops</h1>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3 justify-content-end mb-3">
          <div className="col-auto">
            <Input
              id="searchinput"
              name="search"
              type="text"
              placeholder="Search your shops"
            />
          </div>
          <div className="col-auto">
            <Select>
              <option value="">All Status</option>
              <option value="">Pending</option>
              <option value="">Suspended</option>
              <option value="">Deleted</option>
            </Select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {list.map((i) => (
                <div className="col" key={i}>
                  <ShopGridItem />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end pt-3 px-3">
              <Pagination hasPrev={true} hasNext={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shops;
