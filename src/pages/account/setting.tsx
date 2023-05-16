import Image from "next/image";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthenticationContext, ProgressContext } from "../../common/contexts";
import { User } from "../../common/models";
import { parseErrorResponse, setEmptyOrString } from "../../common/utils";
import { withAuthentication } from "../../common/WithAuthentication";
import AccountMenu from "../../components/account/AccountMenu";
import { Input } from "../../components/forms";
import ProgressButton from "../../components/ProgressButton";
import {
  getLoginUser,
  updateProfile,
  uploadUserImage
} from "../../services/UserService";

function ProfileSetting() {
  const authContext = useContext(AuthenticationContext);

  const progressContext = useContext(ProgressContext);

  const imageFileRef = useRef<HTMLInputElement>(null);

  const user = authContext.payload;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<User>({ values: user });

  const save = async (values: User) => {
    try {
      await updateProfile(values);
      //const user = await getLoginUser();
      authContext.reload();
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  if (authContext.status !== "success") {
    return null;
  }

  return (
    <div>
      {/* <div className="bg-primary">
        <div className="container">
          <div className="py-4">
            <h1 className="text-light text-center text-lg-start">
              Profile Setting
            </h1>
          </div>
        </div>
      </div> */}

      <div className="container py-3 mb-5">
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-body p-md-4">
                <form
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSubmit(async (data) => {
                      await save(data);
                    })();
                  }}
                >
                  <div className="row">
                    <div className="order-2 order-md-2 col-lg-8">
                      <div className="vstack">
                        <div className="row g-3">
                          <div className="col-lg-6">
                            <Input
                              label="Full Name"
                              id="nameInput"
                              type="text"
                              placeholder="Your full name"
                              {...register("name", {
                                required: "Please enter full name",
                                setValueAs: setEmptyOrString
                              })}
                              error={errors.name?.message}
                            />
                          </div>
                          <div className="col-lg-6">
                            <div className="hstack gap-2 mb-2">
                              <label
                                htmlFor="phoneInput"
                                className="form-label mb-0"
                              >
                                Phone
                              </label>
                              <div className="d-flex align-items-center">
                                <div className="vr"></div>
                              </div>
                              <div role="button" className="link-primary small">
                                Change
                              </div>
                            </div>
                            <Input
                              id="phoneInput"
                              name="phone"
                              type="text"
                              disabled
                              defaultValue={
                                user?.phone?.replace("+95", "0") ?? ""
                              }
                            />
                          </div>
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <Input
                                label="Email"
                                id="emailInput"
                                type="email"
                                placeholder="name@domain.com"
                                error={
                                  errors.email &&
                                  "Please enter valid email address"
                                }
                                {...register("email", {
                                  validate: (v) => {
                                    const emailRegex =
                                      "!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i";
                                    if (!v) {
                                      return true;
                                    }

                                    return v.match(emailRegex) !== null;
                                  }
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center order-lg-2 col-lg-4">
                      <div className="mb-2">
                        <div
                          className="position-relative overflow-hidden rounded-circle"
                          style={{ width: 128, height: 128 }}
                        >
                          <Image
                            src={user?.image ?? "/images/profile.png"}
                            fill
                            alt="User image"
                            sizes="33vw"
                            className="rounded-circle border"
                            style={{
                              objectFit: "cover"
                            }}
                            priority
                          />
                          <div
                            className="ms-auto position-absolute bottom-0 py-1 btn btn-dark opacity-75 w-100 text-light text-center"
                            onClick={() => {
                              imageFileRef.current?.click();
                            }}
                          >
                            Edit
                          </div>
                          <input
                            ref={imageFileRef}
                            className="form-control d-none"
                            type="file"
                            id="imageFile"
                            accept="image/x-png,image/jpeg"
                            onChange={async (evt) => {
                              try {
                                const files = evt.target.files;
                                if (files && files.length > 0) {
                                  const file = files[0];
                                  const fileSize = file.size / (1024 * 1024);

                                  if (fileSize > 0.36) {
                                    throw "File size must not greater than 360KB";
                                  }

                                  progressContext.update(true);

                                  await uploadUserImage(file);

                                  await authContext.reload();
                                }
                              } catch (error) {
                                const msg = parseErrorResponse(error);
                                toast.error(msg);
                              } finally {
                                evt.target.value = "";
                                progressContext.update(false);
                              }
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="col order-3 mt-4 d-flex">
                      <ProgressButton
                        type="submit"
                        className="flex-grow-1 flex-md-grow-0 px-3 py-2"
                        loading={isSubmitting}
                      >
                        Update profile
                      </ProgressButton>
                    </div>
                  </div>
                </form>
                <hr className="bg-dark-gray" />
                <div className="row">
                  <div className="col-md">
                    <div className="card bg-light">
                      <div className="card-body">
                        <button
                          type="button"
                          className="btn btn-outline-primary border btn-sm float-end"
                        >
                          Change
                        </button>
                        <p className="mb-0">Password</p>
                        <small className="text-muted d-block w-75">
                          You can change your password by clicking here
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

export default withAuthentication(ProfileSetting);
