import Image from "next/image";
import Link from "next/link";
import Dropdown from "../../../../components/Dropdown";
import Pagination from "../../../../components/Pagination";
import ProductManageGridItem from "../../../../components/product/ProductManageGridItem";

function ShopDetail() {
  const list = [1, 2, 3, 4, 5];
  let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
    Math.random() * 100
  )}`;

  return (
    <div className="vstack">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                <h3 className="text-light text-lg-start">Shop Overview</h3>
              </div>
              <div className="row px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link href="/profile/shops">
                        <a href="#" className="text-light">
                          Shops
                        </a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shoes World
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <div className="border rounded bg-white vstack overflow-hidden">
              <div
                style={{
                  width: "100%",
                  height: 200,
                }}
                className="position-relative"
              >
                <Image
                  src={image}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="row p-3 py-sm-4">
                <div className="col">
                  <div className="hstack">
                    <div className="flex-shrink-0 mt-n9">
                      <Image
                        src={image}
                        width={100}
                        height={100}
                        alt=""
                        className="border rounded border-white border-4"
                        objectFit="cover"
                      />
                    </div>
                    <div className="ms-2 d-flex flex-column mt-n2 mt-sm-n3">
                      <h4 className="mb-0">{"Shoes World"}</h4>
                      <div className="text-muted small mb-1 text-truncate">
                        {"Shop HeadLine"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-auto">
                  <div
                    className="mt-2 mt-sm-0 gap-1 hstack"
                    style={{ zIndex: 999 }}
                  >
                    <div className="flex-grow-1 d-none d-md-block"></div>
                    <Dropdown
                      toggle={"Shop Action"}
                      toggleClassName="dropdown-toggle"
                    >
                      <li role="button" className="dropdown-item">
                        Edit
                      </li>
                      <li role="button" className="dropdown-item">
                        Delete
                      </li>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-3 mb-3">
          <div className="card-header bg-white fs-4 fw-semibold p-3">
            <div className="hstack">
              Products
              <div className="ms-auto">
                <Link href="/profile/shops/1/create-product">
                  <a className="btn btn-primary h-100 hstack">Create new</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="vstack">
              <div className="card-body">
                <div className="vstack">
                  <div className="row g-3">
                    {list.map((i) => {
                      return (
                        <div className="col-lg-3" key={i}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetail;
