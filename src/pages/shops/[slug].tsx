import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "react-feather";
import useSWR from "swr";
import { Input } from "../../components/forms";
import Loading from "../../components/Loading";
import { ProductGridItem } from "../../components/product";
import { Shop } from "../../models";
import { getProducts } from "../../services/ProductService";
import { getShop } from "../../services/ShopService";

function ShopHome({ shop }: { shop: Shop }) {
  const { data, error } = useSWR(
    [shop.id],
    (shopId) => getProducts({ shopId: shopId, orderBy: "none" }),
    { revalidateOnFocus: false }
  );

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
                  {shop.name}
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
                  src={shop.cover!}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                <Link href={`/`}>
                  <a className="btn btn-dark position-absolute end-0 m-3">
                    <PencilSquareIcon width={20} />
                  </a>
                </Link>
              </div>
              <div className="row p-3 py-sm-4">
                <div className="col">
                  <div className="hstack">
                    <div className="flex-shrink-0 mt-n6">
                      <Image
                        src={shop.logo!}
                        width={85}
                        height={85}
                        alt=""
                        className="rounded-circle border border-white border-4"
                        objectFit="cover"
                      />
                    </div>
                    <div className="ms-2 d-flex flex-column mt-n2 mt-sm-n3">
                      <h4 className="mb-0">{shop.name}</h4>
                      <div className="text-muted small mb-1 text-truncate">
                        Headline
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
                <p className="mb-0">{shop.description}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hstack mb-3">
              <div className="ms-md-auto">
                <Input type="search" placeholder="Search in shop" height={44} />
              </div>
            </div>
            {!data && !error && <Loading />}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
              {data &&
                !error &&
                data.map((p) => {
                  return (
                    <div key={p.id} className="col">
                      <ProductGridItem data={p} heading="category" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { slug } = context.query;
    const shop = await getShop(slug);
    return {
      props: { shop: shop } // will be passed to the page component as props
    };
  } catch (e) {
    console.log(e);
  }

  return {
    notFound: true
  };
}

export default ShopHome;
