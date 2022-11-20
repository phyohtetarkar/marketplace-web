import { CalendarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { formatTimestamp } from "../../../../common/utils";

function OrderRow() {
  return (
    <div className="col">
      <div className="d-flex">
        <div>
          <div className="flex-shrink-0">
            <div className="ratio ratio-1x1" style={{ width: 80 }}>
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
                  alt="Product image."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </span>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 ms-3 h-100">
          <div className="vstack">
            <a className="text-dark text-decoration-none" href="#">
              Product name here
            </a>
            <small className="text-muted mb-2" style={{ fontSize: 12 }}>
              <span>Medium</span>,&nbsp;<span>White</span>
            </small>
            <h6 className="mb-0">1 × 10,000</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDetail() {
  const list = [1, 2, 3, 4];

  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                <h3 className="text-light text-lg-start">Order Detail</h3>
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
                      Order Detail
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
            <div className="card mb-3">
              <div className="card-header py-3 bg-white">
                <div className="row">
                  <div className="col d-flex">
                    <span className="fw-semibold h5 my-auto">
                      Order ID: 20001
                    </span>
                  </div>
                  <div className="col-auto">
                    <Link href={"/profile/orders/1"}>
                      <a className="btn btn-sm btn-outline-danger">
                        Cancel order
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row gx-2 gy-3">
                  <div className="col-md-5">
                    <h6 className="fw-bold">Deliver to</h6>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium">Name:</text>
                    <div className="vstack">Mobile Com</div>
                    </div>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium">Phone:</text>
                    <div className="vstack">+95911223344</div>
                    </div>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium">Address:</text>
                    <div className="vstack">No. 26, Pyay Street, Hlaing Township, Yangon, Myanmar</div>
                    </div>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium">Notes:</text>
                    <div className="vstack">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                    </div>
                    {/* <div className="vstack">
                      <span><text className="me-2 fw-medium">Name:</text> Mobile Com</span>
                      <span><text className="me-2 fw-medium">Phone:</text> +95911223344</span>
                      <span><text className="me-2 fw-medium">Address:</text> No. 26, Pyay Street, Hlaing Township, Yangon, Myanmar</span>
                      <span><text className="me-2 fw-medium">Notes:</text> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                    </div> */}
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold">Payment info</h6>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium">Total Products:</text>
                    <div className="vstack">5</div>
                    </div>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium">Subtotal:</text>
                    <div className="vstack">30,000ks</div>
                    </div>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium text-danger">Discounts:</text>
                    <div className="vstack text-danger">-0ks</div>
                    </div>
                    <div className="hstack align-items-start gap-2">
                    <text className="fw-medium text-success">Total Price:</text>
                    <div className="vstack text-success">33,000ks</div>
                    </div>
                    {/* <div>
                      <text className="text-muted me-2">Total Products:</text>5
                    </div>
                    <div>
                      <text className="text-muted me-2">Subtotal:</text>{" "}
                      30,000ks
                    </div>
                    <div className="text-muted">
                      Discounts: <text className="text-danger ms-2">-0ks</text>
                    </div>
                    <div>
                      <text className="text-muted me-2">Delivery fee:</text>{" "}
                      3,000ks
                    </div>
                    <div className="text-muted">
                      Total Price:{" "}
                      <text className="text-success ms-2">33,000ks</text>
                    </div> */}
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold">Status</h6>
                    <div className="text-success">
                      <span className="fw-semibold">DELIVERED</span>
                    </div>
                  </div>
                </div>
                <hr className="dark-gray" />
                <div className="row row-cols-1 row-cols-md-3 g-3">
                  {list.map((i) => (
                    <OrderRow key={i} />
                  ))}
                </div>
              </div>
              <div className="card-footer small border-0 py-3 text-muted">
                {formatTimestamp(Date.now(), true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
