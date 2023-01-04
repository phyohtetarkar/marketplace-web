import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { User } from "../../common/models";
import AccountMenu from "../../components/account/AccountMenu";
import { Input } from "../../components/forms";
import { updateProfile } from "../../services/UserService";

function ProfileSetting() {
  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik<User>({
      initialValues: {
        id: "",
        name: "",
        phone: "",
        email: "",
      },
      validate: async (values) => {
        const errors: User = {
          id: "",
          name: "",
          phone: "",
          email: "",
        };

        if (!values.name || values.name.trim().length === 0) {
          errors.name = "Please enter user name.";
        }
        return errors;
      },
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: (values) => {
        updateProfile(values);
      },
    });

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
              <div className="card shadow-sm">
                <div className="card-body p-md-4">
                <form onSubmit={handleSubmit}>
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
                              value={values.name}
                              onChange={handleChange}
                              error={errors.name}
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
                                value={values.email || ""}
                                onChange={handleChange}
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
                      <button
                        className="btn btn-primary p-2 flex-grow-1 flex-md-grow-0"
                        disabled={isSubmitting}
                      >
                        Update profile
                      </button>
                    </div>
                  </div>
                  </form>
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
                            You can reset or change your password by clicking
                            here
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
