import { Input, Textarea } from "../../components/forms";
import Image from "next/image";
import AccountMenu from "../../components/account/AccountMenu";
import { Camera, CheckCircle, Trash, Trash2 } from "react-feather";

function ProfileSetting() {
  return (
    <div>
      <div className="bg-primary">
        <div className="container" style={{ height: 120 }}>
          <div className="d-flex align-items-center h-100">
            <h1 className="text-light">Profile Setting</h1>
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
              <div className="card-body p-md-4">
                <div className="row">
                  <div className="col-lg-8">
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
                          <Input
                            className="form-control"
                            label="Birthday"
                            id="birthdayInput"
                            name="dob"
                            type="date"
                            placeholder="Date of birth"
                          />
                        </div>
                        <div className="col-lg-6">
                         <label htmlFor="emailInput" className="form-label">
                          Email
                         </label>
                          <div className="position-relative">
                          <Input
                            name="email"
                            type="email"
                            placeholder="name@domain.com"
                            disabled
                          />
                          <div className="position-absolute top-50 end-0 translate-middle-y">
                            <CheckCircle
                                size={20}
                                className="me-3"
                                strokeWidth={2.5}
                                color="#29bf12"
                              />
                          </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <Input
                            label="Phone"
                            id="phoneInput"
                            name="phone"
                            type="text"
                            placeholder="+9512345678"
                          />
                        </div>
                        <div className="col-12">
                          <div className="position-relative">
                            <Input
                              label="Address"
                              id="addressInput"
                              name="address"
                              type="text"
                              placeholder="Current Address"
                            />
                          </div>
                        </div>
                        <div className="col-12 mb-4">
                          <Textarea
                            label="About me"
                            id="bioInput"
                            name="biography"
                            placeholder="Biography"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="text-lg-center mt-3">
                      <Image
                        src="/images/profile.png"
                        width={128}
                        height={128}
                        alt="User Photo"
                        className="rounded-circle"
                        objectFit="cover"
                      />
                      <div className="ms-auto mt-2 mb-4">
                        <button className="btn btn-sm btn-outline-primary">
                          {/* <i className="bi bi-camera-plus-fill text-primary"></i> Upload */}
                          Upload
                          {/* <div className="hstack gap-2">
                            <Camera size={16} />
                            <p className="mt-3 text-center small">Upload</p>
                          </div> */}
                        </button>
                        <button className="btn btn-sm btn-danger ms-2">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="">
                    <button className="btn btn-primary p-2 flex-grow-1 flex-md-grow-0">
                      Update profile
                    </button>
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
