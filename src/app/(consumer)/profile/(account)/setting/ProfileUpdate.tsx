import { AuthenticationContext, ProgressContext } from "@/common/contexts";
import { useLoginUser } from "@/common/hooks";
import { UserEdit } from "@/common/models";
import { parseErrorResponse, setEmptyOrString } from "@/common/utils";
import ProgressButton from "@/components/ProgressButton";
import { Input } from "@/components/forms";
import { updateUser, uploadUserImage } from "@/services/UserService";
import Image from "next/image";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ProfileUpdate() {
  const { user, isLoading, error, mutate } = useLoginUser();

  const progressContext = useContext(ProgressContext);

  const authContext = useContext(AuthenticationContext);

  const imageFileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<UserEdit>({ values: { name: user?.name, phone: user?.phone } });

  const save = async (values: UserEdit) => {
    try {
      await updateUser(values);
      authContext.reload();
      toast.success("Profile updated");
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
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
                {/* <div className="hstack gap-2 mb-2">
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
                          </div> */}
                <Input
                  id="phoneInput"
                  label="Phone"
                  type="tel"
                  placeholder="Enter phone number"
                  {...register("phone", {
                    setValueAs: setEmptyOrString
                  })}
                />
              </div>
              <div className="col-lg-12">
                <div className="position-relative">
                  <Input
                    label="Email"
                    id="emailInput"
                    type="email"
                    placeholder="None"
                    disabled
                    defaultValue={user?.email ?? ""}
                    // error={
                    //   errors.email && "Please enter valid email address"
                    // }
                    // {...register("email", {
                    //   validate: (v) => {
                    //     const emailRegex =
                    //       "!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i";
                    //     if (!v) {
                    //       return true;
                    //     }

                    //     return v.match(emailRegex) !== null;
                    //   }
                    // })}
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

                      mutate();
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
        <div className="col order-3 d-flex mt-4">
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
  );
}
