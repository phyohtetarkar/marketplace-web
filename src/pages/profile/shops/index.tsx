import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import AccountMenu from "../../../components/account/AccountMenu";
import { Input, Select } from "../../../components/forms";
import Pagination from "../../../components/Pagination";
import ShopManageGridItem from "../../../components/shop/ShopManageGridItem";

function MyShops() {
  const shop = {
    id: "id",
    name: "Shop Name",
    slug: "slug",
    createdAt: "7 July, 2021 1:42pm",
    cover: `https://source.unsplash.com/random/200x240?random=${Math.floor(
      Math.random() * 100
    )}`,
  };

  return (
    <div>
      <div className="bg-primary">
        <div className="container">
          <div className="py-4 py-lg-5">
            <h1 className="text-light text-center text-lg-start">My Shops</h1>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-header bg-white">
                <div className="p-3 p-lg-2">
                  <div className="row g-3">
                    <div className="col">
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
                    <div className="col-auto">
                      <Link href="/profile/shops/create">
                        <a className="ms-auto btn btn-primary h-100 hstack">
                          Create new
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div className="col">
                    <ShopManageGridItem />
                  </div>
                  <div className="col">
                    <ShopManageGridItem />
                  </div>
                  <div className="col">
                    <ShopManageGridItem />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end pt-3 px-3">
                <Pagination hasPrev={true} hasNext={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyShops;
