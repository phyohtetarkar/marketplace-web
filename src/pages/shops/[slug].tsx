import Image from "next/image";
import Link from "next/link";
import { Edit, Facebook, Instagram, Twitter } from "react-feather";
import { Input } from "../../components/forms";
import { ProductGridItem } from "../../components/product";

function Shop() {
  return (
    <div className="vstack">
      <div className="bg-primary">
        <div className="container">
          <div className="row py-4">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <a className="text-light">Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/shops">
                    <a className="text-light">Shops</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Healthy Shop
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="border rounded bg-white vstack overflow-hidden">
              <div
                style={{
                  width: "100%",
                  height: 200
                }}
                className="position-relative"
              >
                <Image
                  src="/images/banner.jpeg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                <Link href={`/`}>
                  <a className="btn btn-dark opacity-75 position-absolute end-0 m-3">
                    <Edit size={20} />
                  </a>
                </Link>
              </div>
              <div className="row p-3 py-sm-4">
                <div className="col">
                  <div className="hstack">
                    <div className="flex-shrink-0 mt-n6">
                      <Image
                        src="/images/profile.png"
                        width={85}
                        height={85}
                        alt=""
                        className="rounded-circle border border-white border-4"
                        objectFit="cover"
                      />
                    </div>
                    <div className="ms-2 d-flex flex-column mt-n2 mt-sm-n3">
                      <h4 className="mb-0">Healthy Shop</h4>
                      <div className="text-muted small mb-1 text-truncate">
                        Health &amp; beauty
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
                    <a
                      href="#"
                      target="_blank"
                      className="btn btn-outline-light text-muted border"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="btn btn-outline-light text-muted border"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="btn btn-outline-light text-muted border"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 mb-3">
            <div className="card">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">About us</h5>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hstack mb-3">
              <div className="ms-md-auto">
                <Input type="search" placeholder="Search in shop" height={44} />
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
              <div className="col">
                <ProductGridItem />
              </div>
              <div className="col">
                <ProductGridItem />
              </div>
              <div className="col">
                <ProductGridItem />
              </div>
              <div className="col">
                <ProductGridItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
