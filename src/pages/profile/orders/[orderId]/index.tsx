import { PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
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

function OrderTableRow() {
  return (
    <tr>
      <td className="ps-3 ps-lg-4 w-100 pt-3">
        <a
          href="#"
          className="text-inherit text-dark text-decoration-none text-block"
        >
          <div className="d-lg-flex gap-3">
            <div className="ratio ratio-16x9" style={{ width: 120 }}>
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
            <div className="ms-lg-4 mt-2 mt-lg-0">
              <h6 className="mb-1">Product name here</h6>
              <span className="small">
                <span className="text-muted">Color:</span> White, <span className="text-muted">Size:</span> Medium
              </span>
            </div>
          </div>
        </a>
      </td>
      <td className="pt-3">
        <span className="text-nowrap fw-light">2</span>
      </td>
      <td className="pt-3">
        <span className="text-nowrap fw-light">300,000ks</span>
      </td>
    </tr>
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
            <div className="ms-auto">
                <button className="btn btn-danger border-0 py-2 px-3 ms-2 fw-medium"><small>Cancel Order</small></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-xl-8 col-lg-7 col-12">
            <div className="card mb-3">
              <div className="card-header py-4 bg-white">
                <div className="row">
                  <div className="col d-flex">
                    <span className="fw-semibold h5 my-auto">
                      Order ID: 20001
                    </span>
                  </div>
                  <div className="col-auto">
                    <div>
                      <span className="fw-semibold">Status:</span>
                      <small className="ms-2 fw-semibold text-success">
                        DELIVERED
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card-body">
                <div className="row gx-2 gy-3">
                  <div className="col-md-5 small">
                    <h6 className="fw-bold">Deliver to</h6>
                    <div>
                      Name:<span className="text-muted ms-2">Mobile Com</span>
                    </div>
                    <div>
                      Phone:
                      <span className="text-muted ms-2">+95911223344</span>
                    </div>
                    <div>
                      Address:
                      <span className="text-muted ms-2">
                        No. 26, Pyay Street, Hlaing Township, Yangon, Myanmar
                      </span>
                    </div>
                    <div>
                      Notes:
                      <span className="text-muted ms-2">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4 small">
                    <h6 className="fw-bold">Payment info</h6>
                    <div>
                      Total Products:<span className="text-muted ms-2">5</span>
                    </div>
                    <div>
                      Subtotal:<span className="text-muted ms-2">30,000ks</span>
                    </div>
                    <div>
                      Discounts:
                      <span className="text-danger ms-2">-0ks</span>
                    </div>
                    <div>
                      Total Price:
                      <span className="text-success ms-2">33,000ks</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold">Status</h6>
                    <div className="text-success">
                      <small className="fw-semibold">DELIVERED</small>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* {list.map((i) => (
                    <OrderRow key={i} />
                  ))} */}
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead
                    className="text-nowrap align-middle"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <tr style={{ height: 50 }}>
                      <th
                        className="ps-3 ps-lg-4 fw-normal"
                        style={{ minWidth: 200 }}
                      >
                        Products
                      </th>
                      <th className="fw-normal" style={{ minWidth: 150 }}>
                        Items
                      </th>
                      <th className="fw-normal" style={{ minWidth: 150 }}>
                        Amounts
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {list.map((i) => (
                      <OrderTableRow key={i} />
                    ))}
                    <tr className="small">
                      <td className="border-bottom-0 pt-3"></td>
                      <td
                        colSpan={1}
                        className="border-bottom-0 pt-3"
                      >
                        Total Products :
                      </td>
                      <td className="fw-medium border-bottom-0 pt-3">5</td>
                    </tr>
                    <tr className="small">
                      <td className="border-bottom-0"></td>
                      <td
                        colSpan={1}
                        className="border-bottom-0"
                      >
                        Sub Total :
                      </td>
                      <td className="fw-medium border-bottom-0">
                        600,000ks
                      </td>
                    </tr>
                    <tr className="small">
                      <td className="border-bottom-0"></td>
                      <td colSpan={1}>
                        Discount :
                      </td>
                      <td className="fw-medium text-danger">-0ks</td>
                    </tr>
                    <tr>
                      <td className="border-bottom-0"></td>
                      <td
                        colSpan={1}
                        className="text-uppercase border-bottom-0"
                      >
                        Total Price
                      </td>
                      <td className="fw-medium border-bottom-0">
                        3000,000ks
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-footer small border-0 py-3 text-muted">
                {formatTimestamp(Date.now(), true)}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5  col-12">
            <div className="card mb-4 mt-4 mt-lg-0">
              <div className="card-body p-4 fw-light small">
                <h6 className="fw-medium mb-3">Customer</h6>
                <div className="hstack mt-2">
                  <UserIcon width={18} strokeWidth={2} className="text-muted"/>
                  <span className="ms-2 fw-medium">Josep William</span>
                </div>
                <div className="hstack mt-2">
                  <PhoneIcon width={18} strokeWidth={2} className="text-muted" />
                  <span className="text-muted ms-2">+95911223344</span>
                </div>
              </div>
              <div className="card-body border-top p-4 fw-light small">
                <h6 className="fw-medium mb-3">Address</h6>
                <p className="text-muted">
                  No.26, Pyay Street, Hlaing Township, Yangon, Myanmar.
                </p>
              </div>
              <div className="card-body border-top p-4 fw-light small">
                <h6 className="fw-medium mb-3">Notes</h6>
                <p className="text-muted">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
