import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import { Input } from "../../../components/forms";
import { RichTextEditorInputProps } from "../../../components/forms/RichTextEditor";

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

const BasicInformation = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white py-3 px-md-4 border-bottom">
        <h5 className="mb-0">Basic information</h5>
      </div>
      <div className="card-body px-md-4">
        <div className="vstack">
          <div className="row g-4 mb-3">
            <div className="col-lg-6">
              <Input
                label="Name *"
                id="shopNameInput"
                name="name"
                type="text"
                placeholder="Enter shop name"
              />
            </div>
            <div className="col-lg-6">
              <Input
                label="Slug *"
                id="slugInput"
                name="slug"
                type="text"
                placeholder="your-shop-name"
              />
            </div>
          </div>
          <div className="row g-4">
            <div className="order-5 order-lg-3 order-md-5 col-lg-6">
              <label className="form-label">About Us</label>
              <div className="flex-grow-1">
                <DynamicEditor
                  id="aboutInput"
                  placeholder="Enter about us..."
                  minHeight={300}
                />
              </div>
            </div>
            <div className="order-3 order-lg-4 order-md-3 order-1 col-lg-6">
              <Input
                label="Headline"
                id="headlineInput"
                name="headline"
                type="text"
                className="mb-3"
                placeholder="Enter shop headline"
              />
              <Input
                label="Address"
                id="addressInput"
                name="address"
                type="text"
                placeholder="Enter shop address"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopMedia = () => {
  return (
    <div className="card shadow-sm">
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
              >
                <Image
                  src={"/images/placeholder.jpeg"}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
                <input className="form-control d-none" type="file" />
              </div>
            </div>
            <div className="col-lg-12">
              <label className="form-label">Cover image</label>
              <div
                role="button"
                className="ratio rounded border position-relative bg-light"
                style={{ "--bs-aspect-ratio": "20%" } as CSSProperties}
              >
                <div className="position-absolute text-muted top-50 start-50 translate-middle h-auto w-auto fw-medium">
                  Click here to upload
                </div>
                {/* <Image src={"/"} layout="fill" objectFit="cover" alt="" /> */}
                <input className="d-none" type="file" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CreateShop() {
  const [currentStep, setCurrentStep] = useState(1);

  const getStepView = (step: number, title: String, end: boolean = false) => {
    const active = step === currentStep;
    return (
      <div
        className="row gx-2 align-items-center"
        role="button"
        onClick={() => setCurrentStep(step)}
      >
        <div
          className={`col-auto rounded-circle d-flex align-items-center justify-content-center ${
            active ? "bg-primary text-light" : "bg-light-gray"
          }`}
          style={{ width: 40, height: 40 }}
        >
          {step}
        </div>
        <span className={`col-auto ${active ? "text-primary" : "text-dark"}`}>
          {title}
        </span>
        {!end && (
          <>
            <hr className="col my-0 d-none d-md-block" />
            <div className="col-12 b-block d-md-none px-0">
              <div
                className="d-flex justify-content-center py-1"
                style={{ width: 40 }}
              >
                <div className="vr"></div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const getBodyView = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformation />;
      case 2:
        return <ShopMedia />;
    }

    return null;
  };

  return (
    <div className="pb-5">
      <div className="bg-primary mb-3">
        <div className="container py-4">
          <div className="row g-3">
            <div className="col-lg-6">
              <h3 className="text-light text-lg-start">Create Shop</h3>
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/profile/shops">
                      <a href="#" className="text-light">
                        Shops
                      </a>
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
                <button className="btn btn-light py-2 px-3 ms-lg-auto">
                  Back to shops
                </button>
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
                        {getStepView(s.step, s.title, s.end)}
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

        {currentStep === _steps.length && (
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
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                Next
              </button>
            )}
            {currentStep === _steps.length && (
              <button className="btn btn-danger px-3 py-2">Create shop</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateShop;
