import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ShopCreateForm } from "../../../common/models";
import {
  formatNumber,
  parseErrorResponse,
  setEmptyOrString,
  setStringToSlug
} from "../../../common/utils";
import { withAuthentication } from "../../../common/WithAuthentication";
import { Input } from "../../../components/forms";
import { RichTextEditorInputProps } from "../../../components/forms/RichTextEditor";
import Modal from "../../../components/Modal";
import ProgressButton from "../../../components/ProgressButton";
import {
  AcceptedPaymentEdit,
  DeliveryCityChoice
} from "../../../components/shop";
import StepView from "../../../components/StepView";
import Tooltip from "../../../components/Tooltip";
import { createShop } from "../../../services/ShopService";

const _steps = [
  { step: 1, title: "Basic information" },
  { step: 2, title: "Shop media" },
  { step: 3, title: "Setting" },
  { step: 4, title: "Select package", end: true }
];

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface FormProps {
  values: ShopCreateForm;
  onSubmit?: (values: ShopCreateForm) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const BasicInformation = (props: FormProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    control
  } = useForm<ShopCreateForm>({ defaultValues: props.values });
  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit((data) => {
          props.onSubmit?.(data);
          props.onNext?.();
          window?.scrollTo({
            behavior: "smooth",
            top: 0
          });
        })();
      }}
    >
      <div className="card mb-3">
        <div className="card-header bg-white py-3 px-md-4 border-bottom">
          <h5 className="mb-0">Basic information</h5>
        </div>
        <div className="card-body px-md-4">
          <div className="vstack">
            <div className="row g-4 mb-3">
              <div className="col-lg-6">
                <Input
                  label="Name *"
                  id="nameInput"
                  type="text"
                  placeholder="Enter shop name"
                  {...register("name", {
                    required: true,
                    setValueAs: setEmptyOrString,
                    onChange: (evt) => {
                      setValue("slug", setStringToSlug(evt.target.value), {
                        shouldValidate: !!errors.slug?.message
                      });
                    }
                  })}
                  error={errors.name && "Please enter shop name"}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  label="Slug *"
                  id="slugInput"
                  type="text"
                  placeholder="your-shop-name"
                  {...register("slug", {
                    required: "Please enter slug",
                    setValueAs: setEmptyOrString
                  })}
                  error={errors.slug?.message}
                />
              </div>
            </div>
            <div className="row g-4">
              <div className="order-5 order-lg-3 order-md-5 col-lg-6">
                <label className="form-label">About Us</label>
                <div className="flex-grow-1">
                  <Controller
                    name="about"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DynamicEditor
                          id="aboutInput"
                          placeholder="Enter about us..."
                          minHeight={300}
                          value={field.value}
                          onEditorChange={(value) => {
                            //props.setFieldValue?.("about", value);
                            setValue(field.name, value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="order-3 order-lg-4 order-md-3 order-1 col-lg-6">
                <Input
                  label="Headline"
                  id="headlineInput"
                  type="text"
                  className="mb-3"
                  placeholder="Enter shop headline"
                  {...register("headline")}
                />
                <Input
                  label="Address"
                  id="addressInput"
                  type="text"
                  className="mb-3"
                  placeholder="Enter shop address"
                  {...register("address")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hstack gap-2">
        <button
          type="submit"
          className="btn btn-primary px-3 py-2 ms-auto"
          disabled={isSubmitting}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

const ShopMedia = (props: FormProps) => {
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [logo, setLogo] = useState<string | undefined>(props.values.logo);
  const [logoImage, setLogoImage] = useState(props.values.logoImage);
  const [cover, setCover] = useState<string | undefined>(props.values.cover);
  const [coverImage, setCoverImage] = useState(props.values.coverImage);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    let files = event.target.files;
    const name = event.target.name;
    if (files && files.length > 0) {
      let file = files[0];
      const fileSize = file.size / (1024 * 1024);

      if (fileSize >= 0.512) {
        event.target.value;
        return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        //props.setFieldValue?.(name, e.target?.result);
        const result = e.target?.result;
        if (!result) {
          return;
        }

        if (name === "logo" && logoRef.current) {
          setLogo(result as string);
        } else if (name === "cover" && coverRef.current) {
          setCover(result as string);
        }
      };
      reader.readAsDataURL(file);

      if (name === "logo" && logoRef.current) {
        setLogoImage(file);
        //logoRef.current.value = "";
      } else if (name === "cover" && coverRef.current) {
        setCoverImage(file);
        //coverRef.current.value = "";
      }
    }

    event.target.value = "";
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header bg-white py-3 px-md-4 border-bottom">
          <h5 className="mb-0">Shop media</h5>
        </div>
        <div className="card-body px-md-4">
          <div className="vstack">
            <div className="row g-4">
              <div className="col-lg-3 col-12">
                <label htmlFor="logoInput" className="form-label">
                  Logo image
                </label>
                <div
                  role="button"
                  className="ratio ratio-1x1 border rounded"
                  style={{ width: 80 }}
                  onClick={() => {
                    logoRef.current?.click();
                  }}
                >
                  <Image
                    src={logo ?? "/images/placeholder.jpeg"}
                    className="rounded-1"
                    alt=""
                    fill
                    style={{
                      objectFit: "cover"
                    }}
                  />
                  <input
                    ref={logoRef}
                    onChange={handleImageChange}
                    name="logo"
                    className="form-control d-none"
                    type="file"
                    accept="image/x-png,image/jpeg"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <label className="form-label">Cover image</label>
                <div
                  role="button"
                  className="rounded border position-relative bg-light"
                  style={{
                    minHeight: 200
                  }}
                  onClick={() => {
                    coverRef.current?.click();
                  }}
                >
                  <div className="position-absolute text-muted top-50 start-50 translate-middle h-auto w-auto fw-medium">
                    Click here to upload
                  </div>
                  {cover && (
                    <Image
                      src={cover}
                      fill
                      style={{
                        objectFit: "cover"
                      }}
                      className="rounded-1"
                      alt=""
                    />
                  )}
                  <input
                    ref={coverRef}
                    onChange={handleImageChange}
                    name="cover"
                    className="d-none"
                    type="file"
                    accept="image/x-png,image/jpeg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hstack gap-2">
        <button
          className="btn btn-default px-3 py-2"
          onClick={() => {
            props.onPrev?.();
            window?.scrollTo({
              behavior: "smooth",
              top: 0
            });
          }}
        >
          Previous
        </button>

        <button
          className="btn btn-primary px-3 py-2 ms-auto"
          onClick={() => {
            props.onSubmit?.({
              ...props.values,
              logo: logo,
              cover: cover,
              logoImage: logoImage,
              coverImage: coverImage
            });
            props.onNext?.();
            window?.scrollTo({
              behavior: "smooth",
              top: 0
            });
          }}
        >
          Continue
        </button>
      </div>
    </>
  );
};

const Setting = (props: FormProps) => {
  const [showAcceptedPaymentEdit, setShowAcceptedPaymentEdit] = useState(false);

  const [showDeliveryCityChoice, setShowDeliveryCityChoice] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    control
  } = useForm<ShopCreateForm>({ defaultValues: props.values });

  const acceptedPaymentsField = useFieldArray({
    control,
    name: "acceptedPayments",
    keyName: "vId",
    rules: {
      validate: (v, fv) => {
        if (!fv.bankTransfer) {
          return true;
        }
        return (v?.length ?? 0) > 0 || "At least one accepted payment required";
      }
    }
  });

  const deliveryCitiesField = useFieldArray({
    control,
    name: "deliveryCities",
    keyName: "vId",
    rules: {
      validate: (v, fv) => {
        return v.length > 0 || "At least one delivery city required";
      }
    }
  });

  return (
    <>
      <div className="card mb-3">
        <div className="card-header bg-white py-3 px-md-4 border-bottom">
          <h5 className="mb-0">Setting</h5>
        </div>
        <div className="card-body px-md-4">
          <div className="vstack">
            <h6 className="fw-semibold border-bottom pb-2">Payment</h6>
            <div className="row mb-4 g-3">
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    id="codCheck"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    {...register("cashOnDelivery")}
                  ></input>
                  <label
                    htmlFor="codCheck"
                    className="form-check-label fw-medium"
                  >
                    Cash on delivery
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    id="bankTransferCheck"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    {...register("bankTransfer", {
                      onChange: () => setValue("acceptedPayments", undefined)
                    })}
                  ></input>
                  <label
                    htmlFor="bankTransferCheck"
                    className="form-check-label fw-medium"
                  >
                    Bank transfer
                  </label>
                </div>
              </div>
            </div>
            <Controller
              control={control}
              name="bankTransfer"
              render={({ field, fieldState: { error } }) => {
                if (!field.value) {
                  return <></>;
                }
                return (
                  <>
                    <div className="hstack border-bottom pb-2 gap-2 mb-3">
                      <h6 className="fw-semibold mb-0">Accepted payments</h6>
                      <Tooltip title="Add new">
                        <div
                          role="button"
                          className="link-anchor"
                          onClick={() => setShowAcceptedPaymentEdit(true)}
                        >
                          <PlusCircleIcon width={20} strokeWidth={2} />
                        </div>
                      </Tooltip>
                    </div>
                    {error?.message && (
                      <div className="text-danger mb-3">{error.message}</div>
                    )}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mb-4 g-3">
                      {acceptedPaymentsField.fields.map((p, i) => {
                        return (
                          <div key={p.vId} className="col">
                            <div className="card bg-light border-0 position-relative">
                              <div className="card-body">
                                <h6>{p.accountType}</h6>
                                <div className="text-muted">
                                  {p.accountNumber}
                                </div>
                              </div>

                              <button
                                className="btn btn-sm btn-danger top-0 end-0 m-2"
                                onClick={() => {
                                  acceptedPaymentsField.remove(i);
                                }}
                              >
                                <TrashIcon width={20} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              }}
            />

            <div className="hstack border-bottom pb-2 gap-2 mb-3">
              <h6 className="fw-semibold mb-0">Delivery cities</h6>
              <div
                role="button"
                className="link-anchor"
                onClick={() => setShowDeliveryCityChoice(true)}
              >
                Select
              </div>
            </div>
            {errors?.deliveryCities?.message && (
              <div className="text-danger mb-3">
                {errors.deliveryCities.message}
              </div>
            )}
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {deliveryCitiesField.fields.map((f) => {
                return (
                  <div key={f.vId} className="col fw-semibold">
                    {f.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="hstack gap-2">
        <button
          className="btn btn-default px-3 py-2"
          onClick={() => {
            props.onPrev?.();
            window?.scrollTo({
              behavior: "smooth",
              top: 0
            });
          }}
        >
          Previous
        </button>

        <button
          className="btn btn-primary px-3 py-2 ms-auto"
          onClick={() => {
            handleSubmit((data) => {
              props.onSubmit?.(data);
              props.onNext?.();
              window?.scrollTo({
                behavior: "smooth",
                top: 0
              });
            })();
          }}
        >
          Continue
        </button>
      </div>
      <Modal id="addAcceptedPaymentModal" show={showAcceptedPaymentEdit}>
        {(isShown) =>
          isShown ? (
            <AcceptedPaymentEdit
              submit={async (value) => {
                acceptedPaymentsField.append(value);
                setShowAcceptedPaymentEdit(false);
              }}
              handleClose={() => {
                setShowAcceptedPaymentEdit(false);
              }}
            />
          ) : (
            <></>
          )
        }
      </Modal>
      <Modal id="deliveryCityChoiceModal" show={showDeliveryCityChoice}>
        {(isShown) => {
          if (!isShown) {
            return <></>;
          }

          return (
            <DeliveryCityChoice
              cities={[]}
              close={() => setShowDeliveryCityChoice(false)}
              handleChoose={async (data) => {
                deliveryCitiesField.replace(data);
                setShowDeliveryCityChoice(false);
              }}
            />
          );
        }}
      </Modal>
    </>
  );
};

const PackageSelection = (props: FormProps) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const executeCreate = async (shop: ShopCreateForm) => {
    try {
      setSubmitting(true);

      await createShop(shop);
      router.replace("/account/shops");
    } catch (error) {
      const msg = parseErrorResponse(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="form-check mb-3">
        <input
          id="termsAndConditions"
          type="checkbox"
          name="level"
          className="form-check-input"
        />
        <label className="form-check-label text-muted">
          By checking, you have read and agree to the&nbsp;
          <Link href={"/"} target="_blank" className="link-anchor fw-medium">
            terms of service
          </Link>
          .
        </label>
      </div>
      <div className="hstack gap-2">
        <button
          className="btn btn-default px-3 py-2"
          disabled={isSubmitting}
          onClick={() => props.onPrev?.()}
        >
          Previous
        </button>
        <button
          className="btn btn-danger px-3 py-2 ms-auto"
          disabled={isSubmitting}
          onClick={() => {
            executeCreate(props.values);
          }}
        >
          {isSubmitting && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          Create shop
        </button>
      </div>
    </div>
  );
};

function CreateShop() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [shop, setShop] = useState<ShopCreateForm>({ cashOnDelivery: true });

  const getBodyView = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            values={shop}
            onSubmit={setShop}
            onNext={() => setCurrentStep((s) => s + 1)}
          />
        );
      case 2:
        return (
          <ShopMedia
            values={shop}
            onSubmit={setShop}
            onPrev={() => setCurrentStep((s) => s - 1)}
            onNext={() => setCurrentStep((s) => s + 1)}
          />
        );

      case 3:
        return (
          <Setting
            values={shop}
            onSubmit={setShop}
            onPrev={() => setCurrentStep((s) => s - 1)}
            onNext={() => setCurrentStep((s) => s + 1)}
          />
        );

      case 4:
        return (
          <PackageSelection
            values={shop}
            onPrev={() => setCurrentStep((s) => s - 1)}
          />
        );
    }

    return null;
  };

  const [showAcceptedPaymentEdit, setShowAcceptedPaymentEdit] = useState(false);

  const [showDeliveryCityChoice, setShowDeliveryCityChoice] = useState(false);

  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    control
  } = useForm<ShopCreateForm>({ defaultValues: { cashOnDelivery: true } });

  const acceptedPaymentsField = useFieldArray({
    control,
    name: "acceptedPayments",
    keyName: "vId",
    rules: {
      validate: (v, fv) => {
        if (!fv.bankTransfer) {
          return true;
        }
        return (
          (v?.length ?? 0) > 0 ||
          "Accepted payment required if bank transfer is enabled"
        );
      }
    }
  });

  const deliveryCitiesField = useFieldArray({
    control,
    name: "deliveryCities",
    keyName: "vId",
    rules: {
      validate: (v, fv) => {
        return v.length > 0 || "At least one delivery city required";
      }
    }
  });

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    let files = event.target.files;
    const name = event.target.name;
    if (files && files.length > 0) {
      let file = files[0];
      const fileSize = file.size / (1024 * 1024);

      if (fileSize >= 0.512) {
        event.target.value;
        return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        //props.setFieldValue?.(name, e.target?.result);
        const result = e.target?.result;
        if (!result) {
          return;
        }

        if (name === "logo" && logoRef.current) {
          setValue("logo", result as string);
        } else if (name === "cover" && coverRef.current) {
          setValue("cover", result as string);
        }
      };
      reader.readAsDataURL(file);

      if (name === "logo" && logoRef.current) {
        setValue("logoImage", file);
      } else if (name === "cover" && coverRef.current) {
        setValue("coverImage", file);
      }
    }

    event.target.value = "";
  }

  const executeCreate = async (shop: ShopCreateForm) => {
    try {
      console.log(shop);
      await createShop(shop);
      router.replace("/account/shops");
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="pb-5">
      <div className="header-bar mb-3">
        <div className="container py-3">
          <div className="row g-3">
            <div className="col-lg-6">
              <h3 className="text-lg-start text-light mb-1">Create Shop</h3>
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/account/overview" className="">
                      My profile
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/account/shops" className="">
                      shops
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create shop
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-lg-8 mb-4">
            <h4 className="fw-semibold border-bottom pb-3">
              Basic information
            </h4>
            <div className="row g-3 mb-5">
              <div className="col-lg-6">
                <Input
                  label="Name *"
                  id="nameInput"
                  type="text"
                  placeholder="Enter shop name"
                  {...register("name", {
                    required: "Please enter shop name",
                    setValueAs: setEmptyOrString,
                    onChange: (evt) => {
                      setValue("slug", setStringToSlug(evt.target.value), {
                        shouldValidate: !!errors.slug?.message
                      });
                    }
                  })}
                  error={errors.name?.message}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  label="Slug *"
                  id="slugInput"
                  type="text"
                  placeholder="your-shop-name"
                  {...register("slug", {
                    required: "Please enter slug",
                    setValueAs: setEmptyOrString
                  })}
                  error={errors.slug?.message}
                />
              </div>
              <div className="col-12">
                <Input
                  label="Headline"
                  id="headlineInput"
                  type="text"
                  placeholder="Enter shop headline"
                  {...register("headline")}
                />
              </div>
              <div className="col-12">
                <Input
                  label="Address"
                  id="addressInput"
                  type="text"
                  placeholder="Enter shop address"
                  {...register("address")}
                />
              </div>
              <div className="col-12">
                <label className="form-label">About Us</label>
                <div className="flex-grow-1">
                  <Controller
                    name="about"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DynamicEditor
                          id="aboutInput"
                          placeholder="Enter about us..."
                          minHeight={300}
                          value={field.value}
                          onEditorChange={(value) => {
                            setValue(field.name, value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <h4 className="fw-semibold border-bottom pb-3">Shop media</h4>
            <div className="mb-5">
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="logoInput" className="form-label">
                    Logo image
                  </label>
                  <div
                    role="button"
                    className="ratio ratio-1x1 border rounded"
                    style={{ width: 80 }}
                    onClick={() => {
                      logoRef.current?.click();
                    }}
                  >
                    <Controller
                      control={control}
                      name="logo"
                      render={({ field }) => {
                        return (
                          <Image
                            src={field.value ?? "/images/placeholder.jpeg"}
                            className="rounded-1"
                            alt=""
                            fill
                            style={{
                              objectFit: "cover"
                            }}
                          />
                        );
                      }}
                    />

                    <input
                      ref={logoRef}
                      onChange={handleImageChange}
                      name="logo"
                      className="form-control d-none"
                      type="file"
                      accept="image/x-png,image/jpeg"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <label className="form-label">Cover image</label>
                  <div
                    role="button"
                    className="rounded border position-relative bg-light"
                    style={{
                      minHeight: 200
                    }}
                    onClick={() => {
                      coverRef.current?.click();
                    }}
                  >
                    <div className="position-absolute text-muted top-50 start-50 translate-middle h-auto w-auto fw-medium">
                      Click here to upload
                    </div>
                    <Controller
                      control={control}
                      name="cover"
                      render={({ field }) => {
                        if (!field.value) {
                          return <></>;
                        }
                        return (
                          <Image
                            src={field.value}
                            fill
                            style={{
                              objectFit: "cover"
                            }}
                            className="rounded-1"
                            alt=""
                          />
                        );
                      }}
                    />
                    <input
                      ref={coverRef}
                      onChange={handleImageChange}
                      name="cover"
                      className="d-none"
                      type="file"
                      accept="image/x-png,image/jpeg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h4 className="fw-semibold border-bottom pb-3">Payment setting</h4>
            <div className="row mb-5 g-3">
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    id="codCheck"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    {...register("cashOnDelivery")}
                  ></input>
                  <label
                    htmlFor="codCheck"
                    className="form-check-label fw-medium"
                  >
                    Cash on delivery
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    id="bankTransferCheck"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    {...register("bankTransfer", {
                      onChange: () => setValue("acceptedPayments", undefined)
                    })}
                  ></input>
                  <label
                    htmlFor="bankTransferCheck"
                    className="form-check-label fw-medium"
                  >
                    Bank transfer
                  </label>
                </div>
              </div>
            </div>

            <div className="hstack border-bottom pb-2 gap-2 mb-3">
              <h4 className="fw-semibold mb-0">Accepted payments</h4>
              <div className="flex-grow-1"></div>
              <button
                type="button"
                className="btn btn-sm btn-outline-anchor"
                onClick={() => setShowAcceptedPaymentEdit(true)}
              >
                Add
              </button>
            </div>
            <div className="row row-cols-1 row-cols-md-2 mb-5 g-3">
              {acceptedPaymentsField.fields.map((p, i) => {
                return (
                  <div key={p.vId} className="col">
                    <div className="card bg-light border-0 position-relative">
                      <div className="card-body">
                        <h6 className="fw-semibold">{p.accountType}</h6>
                        <div className="text-muted">{p.accountNumber}</div>
                      </div>

                      <button
                        className="position-absolute btn btn-sm btn-danger top-0 end-0 m-2"
                        onClick={() => {
                          acceptedPaymentsField.remove(i);
                        }}
                      >
                        <TrashIcon width={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hstack border-bottom pb-2 gap-2 mb-3">
              <h4 className="fw-semibold mb-0">Delivery cities</h4>
              <div className="flex-grow-1"></div>
              <button
                type="button"
                className="btn btn-sm btn-outline-anchor"
                onClick={() => setShowDeliveryCityChoice(true)}
              >
                Select
              </button>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {deliveryCitiesField.fields.map((f) => {
                return (
                  <div key={f.vId} className="col fw-semibold">
                    {f.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <div className="vstack">
                  <div className="rounded bg-light p-3 mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        role="radio"
                      ></input>
                      <label className="form-check-label fw-medium">
                        <div className="vstack">
                          <h6 className="fw-semibold mb-1">Package one</h6>
                          <div>30,000Ks / 30days</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="rounded bg-light p-3 mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        role="radio"
                      ></input>
                      <label className="form-check-label fw-medium">
                        <div className="vstack">
                          <h6 className="fw-semibold mb-1">Package two</h6>
                          <div>60,000Ks / 60days</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="rounded bg-light p-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        role="radio"
                      ></input>
                      <label className="form-check-label fw-medium">
                        <div className="vstack">
                          <h6 className="fw-semibold mb-1">Package three</h6>
                          <div>90,000Ks / 90days</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <hr className="text-muted" />

                  <div className="hstack gap-2 mb-3">
                    <span className="h5 fw-bold">Total price</span>
                    <div className="flex-grow-1"></div>
                    <span className="fw-bold h5 mb-0">
                      {formatNumber(30000)}
                    </span>
                  </div>

                  <ProgressButton
                    variant="danger"
                    className="py-2"
                    loading={isSubmitting}
                    onClick={() => {
                      handleSubmit(
                        async (data) => {
                          await executeCreate(data);
                        },
                        (errors) => {
                          const errorList = (
                            <ul className="mb-0">
                              {errors.name?.message && (
                                <li>{errors.name.message}</li>
                              )}
                              {errors.slug?.message && (
                                <li>{errors.slug.message}</li>
                              )}
                              {errors.acceptedPayments?.root?.message && (
                                <li>
                                  {errors.acceptedPayments?.root?.message}
                                </li>
                              )}
                              {errors.deliveryCities?.root?.message && (
                                <li>{errors.deliveryCities?.root?.message}</li>
                              )}
                            </ul>
                          );

                          toast.error(errorList);
                        }
                      )();
                    }}
                  >
                    Create shop
                  </ProgressButton>
                </div>
              </div>
            </div>
            <div className="form-check mb-3">
              <input
                id="termsAndConditions"
                type="checkbox"
                name="level"
                className="form-check-input"
              />
              <label className="form-check-label text-muted">
                By checking, you have read and agree to the&nbsp;
                <Link
                  href={"/"}
                  target="_blank"
                  className="link-anchor fw-medium"
                >
                  terms of service
                </Link>
                .
              </label>
            </div>
          </div>
        </div>

        <div className="row d-none">
          <div className="col-12">
            <div className="card">
              <div className="card-body px-md-4">
                <div className="row gx-3">
                  {_steps.map((s, i) => {
                    return (
                      <div className={s.end ? "col-auto" : "col-md"} key={i}>
                        {/* {getStepView(s.step, s.title, s.end)} */}
                        <StepView
                          step={s.step}
                          title={s.title}
                          active={currentStep === s.step}
                          end={s.end}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row mt-3">
          <div className="col-12">{getBodyView()}</div>
        </div> */}
      </div>

      <Modal id="addAcceptedPaymentModal" show={showAcceptedPaymentEdit}>
        {(isShown) =>
          isShown ? (
            <AcceptedPaymentEdit
              submit={async (value) => {
                acceptedPaymentsField.append(value);
                setShowAcceptedPaymentEdit(false);
              }}
              handleClose={() => {
                setShowAcceptedPaymentEdit(false);
              }}
            />
          ) : (
            <></>
          )
        }
      </Modal>
      <Modal id="deliveryCityChoiceModal" show={showDeliveryCityChoice}>
        {(isShown) => {
          if (!isShown) {
            return <></>;
          }

          return (
            <DeliveryCityChoice
              cities={deliveryCitiesField.fields}
              close={() => setShowDeliveryCityChoice(false)}
              handleChoose={async (data) => {
                deliveryCitiesField.replace(data);
                setShowDeliveryCityChoice(false);
              }}
            />
          );
        }}
      </Modal>
    </div>
  );
}

export default withAuthentication(CreateShop);
