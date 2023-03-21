import {
  MapPinIcon,
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useLoginUser } from "../../common/hooks";
import { withAuthentication } from "../../common/WithAuthentication";
import AccountMenu from "../../components/account/AccountMenu";
import Loading from "../../components/Loading";

function ProfileOverview() {
  const { user, error, isLoading } = useLoginUser();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return (
    <div>
      <div className="bg-primary">
        <div className="container">
          <div className="py-4">
            <h1 className="text-light text-center text-lg-start">
              Profile Overview
            </h1>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="card shadow-sm mb-3">
              <div className="card-body p-md-4">
                <div className="hstack">
                  <div className="position-relative flex-shrink-0">
                    <Image
                      src={user?.image ?? "/images/profile.png"}
                      width={60}
                      height={60}
                      alt=""
                      className="rounded-circle"
                      style={{
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">{user?.name ?? ""}</h6>
                    <span className="text-muted small">
                      Phone: {user?.phone ?? ""}
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="d-flex d-none d-lg-block">
                      <button className="btn btn-outline-primary">Edit</button>
                    </div>
                  </div>
                  <div className="d-flex d-block d-lg-none ms-2">
                    <button className="btn btn-outline-primary">
                      <PencilSquareIcon width={16} />
                    </button>
                  </div>
                </div>
                <hr className="bg-dark-gray" />
                <div className="text-muted mb-3">Overview</div>
                <div className="card-group mt-2">
                  <div className="card border bg-light">
                    <div className="p-3">
                      <h4 className="title">38</h4>
                      <span>Orders</span>
                    </div>
                  </div>
                  <div className="card border bg-light">
                    <div className="p-3">
                      <h4 className="title">5</h4>
                      <span>Wishlist</span>
                    </div>
                  </div>
                  <div className="card border bg-light">
                    <div className="p-3">
                      <h4 className="title">12</h4>
                      <span>Awaiting delivery</span>
                    </div>
                  </div>
                  <div className="card border bg-light">
                    <div className="p-3">
                      <h4 className="title">50</h4>
                      <span>Delivered items</span>
                    </div>
                  </div>
                </div>
                <hr className="bg-dark-gray" />
                <div className="text-muted mb-3">Addresses</div>
                <div className="row row-cols-1 row-cols-lg-2 g-2 mb-3">
                  <div className="col">
                    <div className="card border bg-light">
                      <div className="card-body">
                        <div className="hstack gap-2">
                          <MapPinIcon
                            className="text-muted flex-shrink-0"
                            width={20}
                          />
                          <div className="flex-grow-1">
                            Yangon city, Pyay Road, Building 123, House 321
                          </div>
                          <div role="button">
                            <TrashIcon className="text-danger" width={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="btn btn-outline-primary">
                  <div className="hstack">
                    <PlusIcon className="me-2" width={20} />
                    Add new address
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuthentication(ProfileOverview);
