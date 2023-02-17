import { useState } from "react";
import StepView from "../../components/StepView";

const _steps = [
  { step: 1, title: "Customer info" },
  { step: 2, title: "Confirm checkout", end: true }
];

function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);

  const content = () => {};

  return (
    <div className="pb-5">
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body px-md-4">
                <div className="row gx-3">
                  {_steps.map((s, i) => {
                    return (
                      <div className={s.end ? "col-auto" : "col-md"} key={i}>
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
      </div>
    </div>
  );
}

export default Checkout;
