import { CalendarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { formatTimestamp } from "../../../../common/utils";
import { Input, Select, Textarea } from "../../../../components/forms";

function OrderRow() {
  return (
    <tr>
      <td className="ps-3 ps-lg-4 w-100">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className="ratio ratio-1x1" style={{ width: 60 }}>
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
                <Image
                  className="card-img-top rounded"
                  src={`https://source.unsplash.com/random/200x240?random=${Math.floor(
                    Math.random() * 100
                  )}`}
                  alt="Shop image."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </span>
            </div>
          </div>
          <div className="flex-grow ms-3">
            <span className="text-primary">Gopro hero 7</span>
          </div>
        </div>
      </td>
      <td>
        <span className="text-nowrap fw-light">1</span>
      </td>
      <td>
        <span className="text-nowrap fw-light">200,000ks</span>
      </td>
      <td>
        <span className="text-nowrap fw-light">200,000ks</span>
      </td>
    </tr>
  );
}

function OrderDetail() {
  const list = [1, 2];

  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                <h3 className="text-light text-lg-start">Order Details</h3>
              </div>
              <div className="row px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link href="/profile/orders">
                        <a href="#" className="text-light">
                          Orders
                        </a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Order Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          <div className=" col-lg-12">
            <div className="card">
              <div className="card-body px-md-4">
                <div className="p-3 p-lg-2">
                  <div className="row g-3">
                    <div className="col">
                      <div className="hstack ">
                        <CalendarIcon
                          className="me-2 text-muted align-self-start flex-shrink-0"
                          width={22}
                        />
                        <div className="vstack">
                          <span className="text-wrap">{formatTimestamp(Date.now(), true)}</span>
                          <small className="text-muted text-wrap">#ID 20001</small>
                        </div>
                      </div>
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
                      <Link href="#">
                        <a className="ms-auto btn btn-outline-danger h-100 hstack">
                          Cancel order
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <hr className="dark-gray" />
                <div className="row gx-2 gy-3 mb-4">
                  <div className="col-md-5">
                    <h6 className="fw-bold">Deliver to</h6>
                    <div className="vstack text-dark small">
                      <span>Name: Mobile Com</span>
                      <span>Address: No. 26, Pyay Street, Hlaing Township</span>
                      <span>Yangon, Myanmar</span>
                      <span>Phone: Tel: +95911223344</span>
                      <span>Note:</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold">Payment Method</h6>
                    <div>Total Products: 5</div>
                    <div>Subtotal: 30,000ks</div>
                    <div className="text-danger">Discounts: -0ks</div>
                    <div>Delivery fee: 3,000ks</div>
                    <div className="text-success fw-semibold">
                      Total Price: 33,000ks
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold">Status</h6>
                    <div className="text-success">
                      <span className="fw-semibold">DELIVERED</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-4">
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="table-responsive pt-1">
                          <table className="table bg-white align-middle">
                            <thead className="text-nowrap align-middle">
                              <tr style={{ height: 50 }}>
                                <th
                                  className="ps-3 ps-lg-4 fw-normal text-muted"
                                  style={{ minWidth: 200 }}
                                >
                                  Product
                                </th>
                                <th
                                  className="fw-normal text-muted"
                                  style={{ minWidth: 150 }}
                                >
                                  Quantity
                                </th>
                                <th
                                  className="fw-normal text-muted"
                                  style={{ minWidth: 200 }}
                                >
                                  Unit Price
                                </th>
                                <th
                                  className="fw-normal text-muted"
                                  style={{ minWidth: 100 }}
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="border-top-0">
                              {list.map((i) => (
                                <OrderRow key={i} />
                              ))}
                            </tbody>
                          </table>
                        </div>
                          <div className="hstack gap-5 justify-content-end px-3 py-2">
                          <div className="d-flex flex-column gap-2">
                            <span className="text-muted">Subtotal</span>
                            <span className="text-muted">Shipping cost</span>
                            <span className="text-muted">Subtotal</span>
                          </div>
                          <div className="d-flex flex-column align-items-end gap-2">
                            <small className="fw-bold">200,000ks</small>
                            <small className="fw-bold">3000ks</small>
                            <span className="fw-bold">203,000ks</span>
                          </div>
                          </div>
                        <div className="d-flex justify-content-end px-3 py-2">
                          <span className="text-nowrap px-2 py-1 small rounded bg-success bg-opacity-10 text-success">
                            Payment made
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Textarea
                      label="Notes"
                      id="slugInput"
                      name="slug"
                      type="text"
                      placeholder="Type here"
                    />
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

export default OrderDetail;
