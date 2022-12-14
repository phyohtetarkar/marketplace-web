import { fstat } from "fs";
import Image from "next/image";
import Link from "next/link";
import AccountMenu from "../../components/account/AccountMenu";
import { Input } from "../../components/forms";

function ProfileSetting() {
  return (
    <div>
      <div className="bg-primary">
        <div className="container">
          <div className="py-4">
            <h1 className="text-light text-center text-lg-start">
              Profile Setting
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
            <div className="card">
              <div className="card-body p-md-4">
                <div className="row">
                  <div className="order-2 order-md-2 col-lg-8">
                    <div className="vstack">
                      <div className="row g-3">
                        <div className="col-lg-6">
                          <Input
                            label="Full Name"
                            id="nameInput"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="col-lg-6">
                          <div className="hstack mb-2 gap-2">
                            <label
                              htmlFor="phoneInput"
                              className="form-label mb-0"
                            >
                              Phone
                            </label>
                            <div className="d-flex align-items-center">
                              <div className="vr"></div>
                            </div>
                            <Link href={"#"}>
                              <a className="text-decoration-none small">
                                Change
                              </a>
                            </Link>
                          </div>
                          <Input
                            id="phoneInput"
                            name="phone"
                            type="text"
                            disabled
                            placeholder="+9512345678"
                          />
                        </div>
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Input
                              label="Email"
                              id="emailInput"
                              name="email"
                              type="email"
                              placeholder="name@domain.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center order-lg-2 col-lg-4">
                    <div className="mt-3 mb-2">
                      <div
                        className="position-relative bg-dark overflow-hidden rounded-circle"
                        style={{ width: 128, height: 128 }}
                      >
                        <Image
                          src="/images/profile.png"
                          layout="fill"
                          alt="User Photo"
                          className="rounded-circle"
                          objectFit="cover"
                          priority
                        />
                        <div className="ms-auto position-absolute bottom-0 py-1 btn btn-dark opacity-75 w-100 text-light text-center">
                          Edit
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="col order-3 mt-3">
                    <button className="btn btn-primary p-2 flex-grow-1 flex-md-grow-0">
                      Update profile
                    </button>
                  </div>
                </div>
                <hr className="bg-dark-gray" />
                <div className="row">
                  <div className="col-md">
                    <div className="card bg-light mb-3">
                      <div className="card-body">
                        <button className="btn btn-outline-primary bg-white btn-sm border border-light-gray float-end">
                          Change
                        </button>
                        <p className="mb-0">Password</p>
                        <small className="text-muted d-block w-75">
                          You can reset or change your password by clicking here
                        </small>
                      </div>
                    </div>
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

export default ProfileSetting;
