import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2 } from "react-feather";
import AccountMenu from "../../../components/account/AccountMenu";
import { Input, Select } from "../../../components/forms";
import Pagination from "../../../components/Pagination";
import ShopManageGridItem from "../../../components/shop/ShopManageGridItem";
import { Shop } from "../../../models";

interface InputProps {
  shop?: Shop;
}

function MyShops({
  shop = {
    id: "id",
    name: "Shop Name",
    slug: "slug",
    createdAt: "7 July, 2021 1:42pm",
    cover: `https://source.unsplash.com/random/200x240?random=${Math.floor(
      Math.random() * 100
    )}`,
  },
}: InputProps) {
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
              <div className="card-body p-0">
                <div className="vstack">
                  <div className="p-3 p-lg-4">
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
                  <div className="table-responsive">
                    <table className="table bg-white align-middle">
                      <thead className="table-light text-nowrap align-middle">
                        <tr style={{ height: 50 }}>
                          <th className="ps-3 ps-lg-4 fw-medium">SHOPS</th>
                          <th className="fw-medium">CREATED AT</th>
                          <th className="fw-medium">STATUS</th>
                          <th className="pe-3 pe-lg-4 fw-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="border-top-0">
                        <tr style={{ height: 95 }}>
                          <td className="ps-3 ps-lg-4">
                            <div className="d-flex gap-3">
                              <div
                                className="ratio ratio-16x9"
                                style={{ width: 120 }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    display: "block",
                                    overflow: "hidden",
                                    width: "initial",
                                    height: "initial",
                                    background: "none",
                                    opacity: 1,
                                    border: 0,
                                    margin: 0,
                                    padding: 0,
                                    position: "absolute",
                                    inset: 0,
                                  }}
                                >
                                  {shop.cover && (
                                    <Image
                                      className="card-img-top rounded"
                                      src={shop.cover}
                                      alt="Shop image."
                                      layout="fill"
                                      objectFit="cover"
                                      priority
                                    />
                                  )}
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <Link href={`/profile/shops/1`}>
                                  <a
                                    className="text-nowrap text-dark text-decoration-none pe-3 "
                                    style={{ fontSize: 18 }}
                                  >
                                    <h6>
                                      {shop.name}
                                    </h6>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-nowrap pe-3">
                              {shop.createdAt}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex">
                              <div className="text-nowrap px-2 py-1 small rounded bg-warning text-light">
                                Pending
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                            <Link href={`/profile/shops/${shop.id}/edit`}>
                              <a className="btn btn-primary">
                                <Edit width={20} />
                              </a>
                            </Link>
                            <Link href={`/profile/shops/${shop.id}/edit`}>
                              <a className="btn btn-danger ms-2">
                                <Trash2 width={20} />
                              </a>
                            </Link>
                            </div>
                            
                          </td>
                        </tr>
                        <tr style={{ height: 95 }}>
                          <td className="ps-3 ps-lg-4">
                            <div className="d-flex gap-3">
                              <div
                                className="ratio ratio-16x9"
                                style={{ width: 120 }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    display: "block",
                                    overflow: "hidden",
                                    width: "initial",
                                    height: "initial",
                                    background: "none",
                                    opacity: 1,
                                    border: 0,
                                    margin: 0,
                                    padding: 0,
                                    position: "absolute",
                                    inset: 0,
                                  }}
                                >
                                  {shop.cover && (
                                    <Image
                                      className="card-img-top rounded"
                                      src={shop.cover}
                                      alt="Shop image."
                                      layout="fill"
                                      objectFit="cover"
                                      priority
                                    />
                                  )}
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <Link href={`/profile/shops/1`}>
                                  <a
                                    className="text-nowrap text-dark text-decoration-none pe-3"
                                    style={{ fontSize: 18 }}
                                  >
                                    <h6>
                                      {shop.name}
                                    </h6>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-nowrap pe-3">
                              {shop.createdAt}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex">
                              <div className="text-nowrap px-2 py-1 small rounded bg-warning text-light">
                                Pending
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                            <Link href={`/profile/shops/${shop.id}/edit`}>
                              <a className="btn btn-primary">
                                <Edit width={20} />
                              </a>
                            </Link>
                            <Link href={`/profile/shops/${shop.id}/edit`}>
                              <a className="btn btn-danger ms-2">
                                <Trash2 width={20} />
                              </a>
                            </Link>
                            </div>
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end pt-3 px-3">
                    <Pagination hasPrev={true} hasNext={true} />
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

export default MyShops;
