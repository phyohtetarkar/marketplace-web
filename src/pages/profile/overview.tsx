import { Input, Textarea } from "../../components/forms";
import Image from "next/image";
import AccountMenu from "../../components/account/AccountMenu";
import { Calendar, Edit2, MapPin, Plus, Trash, Trash2 } from "react-feather";
import Link from "next/link";

function ProfileOverview() {
  return (
    <div>
      <div className="bg-primary">
        <div className="container" style={{ height: 120 }}>
          <div className="d-flex align-items-center h-100">
            <h1 className="text-light">Profile Overview</h1>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="card mb-3">
              <div className="card-body p-md-4">
                <div className="hstack">
                  <div className="position-relative flex-shrink-0">
                    <Image
                      src="/images/profile.png"
                      width={60}
                      height={60}
                      alt=""
                      className="rounded-circle"
                      objectFit="cover"
                    />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Your Avatar</h6>
                    <span className="mb-0 text-muted small">
                      Email: myusername@gmail.com
                      <span className="d-flex d-none d-md-inline px-2">
                        &#x2022;
                      </span>
                      <span className="d-flex d-block d-md-none"></span>
                      Phone: +95244144442
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="d-flex d-none d-lg-block">
                      <button className="btn btn-outline-primary">Edit</button>
                    </div>
                  </div>
                  <div className="d-flex d-block d-lg-none ms-2">
                    <button className="btn btn-outline-primary">
                      <Edit2 size={16} />
                    </button>
                  </div>
                </div>
                <hr className="bg-dark-gray" />
                <div className="mb-1 text-muted mb-3">Overview</div>
                <div className="card-group card-stat mt-2">
                  <div className="card bg-light">
                    <div className="p-3">
                      <h4 className="title">38</h4>
                      <span>Orders</span>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="p-3">
                      <h4 className="title">5</h4>
                      <span>Wishlist</span>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="p-3">
                      <h4 className="title">12</h4>
                      <span>Awaiting delivery</span>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="p-3">
                      <h4 className="title">50</h4>
                      <span>Delivered items</span>
                    </div>
                  </div>
                </div>
                <hr className="bg-dark-gray" />
                <div className="mb-1 text-muted mb-3">Addresses</div>
                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                  <div className="border border-1 rounded p-2">
                      <div className="d-flex hstack">
                      <div className="mx-2 my-1 align-self-start">
                        <MapPin
                          className="text-muted"
                          size={17}
                        />
                        </div>
                        <div className="flex-fill">
                        Yangon city, Pyay Road, Building 123, House 321
                        </div>
                        <div className= "align-self-start mx-2 my-1">
                          <Trash2 className="text-danger" size={19}/>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border border-1 rounded p-2">
                      <div className="hstack">
                      <div className="mx-2 my-1 align-self-start">
                        <MapPin
                          className="text-muted"
                          size={17}
                        />
                        </div>
                        <div className="flex-fill">
                        Mandalay city, Insein Road, Building 224, House 11
                        </div>
                        <div className= "d-flex align-self-start mx-2 my-1">
                          <Trash2 className="text-danger" size={19}/>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="btn btn-outline-primary">
                  <div className="hstack">
                  <Plus className="me-2" size={17}/>
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
export default ProfileOverview;
