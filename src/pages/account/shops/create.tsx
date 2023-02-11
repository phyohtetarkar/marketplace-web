import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Shop } from "../../../common/models";
import { parseErrorResponse, setEmptyOrString } from "../../../common/utils";
import { withAuthentication } from "../../../common/WithAuthentication";
import { Input } from "../../../components/forms";
import { RichTextEditorInputProps } from "../../../components/forms/RichTextEditor";
import StepView from "../../../components/order/StepView";
import { createShop } from "../../../services/ShopService";

const _steps = [
  { step: 1, title: "Basic information" },
  { step: 2, title: "Shop media" },
  { step: 3, title: "Select package", end: true }
];

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface FormProps {
  values: Shop;
  onSubmit?: (values: Shop) => void;
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
  } = useForm<Shop>({ defaultValues: props.values });
  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit((data) => {
          props.onSubmit?.(data);
          props.onNext?.();
        })();
      }}
    >
      <div className="card shadow-sm mb-3">
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
                    setValueAs: setEmptyOrString
                  })}
                  error={errors.name && "Please enter shop name"}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  label="Headline"
                  id="headlineInput"
                  type="text"
                  className="mb-3"
                  placeholder="Enter shop headline"
                  {...register("headline")}
                />
                {/* <Input
                label="Slug *"
                id="slugInput"
                name="slug"
                type="text"
                placeholder="your-shop-name"
                value={props.values.slug ?? ""}
                onChange={props.handleChange}
                error={props.errors.slug}
              /> */}
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
                  label="Address"
                  id="addressInput"
                  type="text"
                  placeholder="Enter shop address"
                  {...register("contact.address")}
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
          Next
        </button>
      </div>
    </form>
  );
};

const ShopMedia = (props: FormProps) => {
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [logo, setLogo] = useState<string | null | undefined>(
    props.values.logo
  );
  const [logoImage, setLogoImage] = useState(props.values.logoImage);
  const [cover, setCover] = useState<string | null | undefined>(
    props.values.cover
  );
  const [coverImage, setCoverImage] = useState(props.values.coverImage);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    let files = event.target.files;
    const name = event.target.name;
    if (files && files.length > 0) {
      let file = files[0];
      const fileSize = file.size / (1024 * 1024);
      //props.setFieldValue?.(`${name}Image`, file);

      if (fileSize <= 0.8) {
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
  }

  return (
    <>
      <div className="card shadow-sm mb-3">
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
                    layout="fill"
                    objectFit="cover"
                    className="rounded-1"
                    alt=""
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
                      layout="fill"
                      objectFit="cover"
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
          onClick={() => props.onPrev?.()}
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
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

const PackageSelection = (props: FormProps) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const executeCreate = async (shop: Shop) => {
    try {
      setSubmitting(true);

      await createShop(shop);
      router.replace("/profile/shops");
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
          <Link href={"/"}>
            <a target="_blank" className="text-decoration-none fw-medium">
              terms of service
            </a>
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

  const [shop, setShop] = useState<Shop>({ contact: {} });

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
          <PackageSelection
            values={shop}
            onPrev={() => setCurrentStep((s) => s - 1)}
          />
        );
    }

    return null;
  };

  return (
    <div className="pb-5">
      <div className="header-bar mb-3">
        <div className="container py-4">
          <div className="row g-3">
            <div className="col-lg-6">
              <h3 className="text-light text-lg-start">Create Shop</h3>
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/account/shops">
                      <a className="text-light">Shops</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create Shop
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-6">
              <div className="hstack h-100">
                <Link href="/account/shops">
                  <a className="btn btn-light text-dark py-2 px-3 ms-lg-auto">
                    Back to shops
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <div className="card shadow-sm">
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

        <div className="row mt-3">
          <div className="col-12">{getBodyView()}</div>
        </div>

        {/* {currentStep === _steps.length && (
          <div className="row">
            <div className="col-12">
              <div className="form-check">
                <input
                  id="termsAndConditions"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label className="form-check-label text-muted">
                  By checking, you have read and agree to the&nbsp;
                  <Link href={"/"}>
                    <a
                      target="_blank"
                      className="text-decoration-none fw-medium"
                    >
                      terms of service
                    </a>
                  </Link>
                  .
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-3">
          <div className="col">
            {currentStep > 1 && (
              <button
                className="btn btn-default px-3 py-2"
                disabled={formik.isSubmitting}
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Previous
              </button>
            )}
          </div>
          <div className="col-auto">
            {currentStep < _steps.length && (
              <button
                className="btn btn-primary px-3 py-2"
                disabled={validating}
                onClick={async () => {
                  setValidating(true);
                  const errors = await formik.validateForm();
                  if (Object.keys(errors).length === 0) {
                    setCurrentStep((s) => s + 1);
                  }
                  setValidating(false);
                }}
              >
                {validating && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Next
              </button>
            )}
            {currentStep === _steps.length && (
              <button
                className="btn btn-danger px-3 py-2"
                disabled={formik.isSubmitting}
                onClick={() => {
                  debounce(() => {
                    formik.setSubmitting(true);
                    formik.submitForm();
                  }, 500)();
                }}
              >
                {formik.isSubmitting && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Create shop
              </button>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default withAuthentication(CreateShop);
