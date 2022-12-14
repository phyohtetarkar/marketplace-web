import Link from "next/link";
import { useState } from "react";
import ShopEdit from "../../../components/shop/ShopEdit";

function CreateShop() {
  const [currentStep, setCurrentStep] = useState(1);

  const step = (step: number, title: String, end: boolean = false) => {
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
        <div className="card">
          <div className="card-body">
            <div className="row gx-3">
              <div className="col-md">{step(1, "Basic information")}</div>
              <div className="col-md">{step(2, "Shop media")}</div>
              <div className="col-md-auto">
                {step(3, "Select package", true)}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <button className="btn btn-default">Previous</button>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateShop;
