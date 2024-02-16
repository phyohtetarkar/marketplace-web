import { formControlHeight } from "@/common/app.config";
import { Discount } from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrNumber,
  setEmptyOrString
} from "@/common/utils";
import { saveDiscount } from "@/services/DiscountService";
import { useForm } from "react-hook-form";
import ProgressButton from "../ProgressButton";
import { Input } from "../forms";

interface DiscountEditProps {
  shopId: number;
  discount?: Discount;
  handleClose?: (result?: boolean) => void;
}

function DiscountEdit(props: DiscountEditProps) {
  const { shopId, discount = { type: "PERCENTAGE" }, handleClose } = props;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<Discount>({ values: { ...discount } });

  const save = async (values: Discount) => {
    try {
      await saveDiscount(shopId, values);
      handleClose?.(true);
    } catch (error) {
      const msg = parseErrorResponse(error);
      console.log(msg);
    }
  };

  const title = (!discount.id ? "Create" : "Update") + " discount";

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
      </div>
      <div className="modal-body">
        <div className="row g-3">
          <div className="col-12">
            <Input
              label="Title"
              placeholder={`Enter discount title`}
              error={errors.title?.message}
              {...register(`title`, {
                setValueAs: setEmptyOrString,
                required: "Please enter discount title"
              })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Amount</label>
            <div
              className={`input-group ${
                errors.value?.message ? "has-validation" : ""
              }`}
            >
              <input
                type="text"
                className={`form-control px-3 ${
                  errors.value?.message ? "is-invalid" : ""
                }`}
                style={{
                  height: formControlHeight
                }}
                placeholder="Enter discount amount"
                {...register("value", {
                  setValueAs: setEmptyOrNumber,
                  validate: (v, fv) => {
                    if (!v) {
                      return "Please enter discount amount";
                    }
                    const floatRegex = "^[0-9]{1,8}$";

                    if (
                      fv.type === "FIXED_AMOUNT" &&
                      !`${v}`.match(floatRegex)
                    ) {
                      return "Invalid value";
                    }

                    if (fv.type === "PERCENTAGE") {
                      const numRegex = "^[0-9]{1,3}$";

                      if (!`${v}`.match(numRegex)) {
                        return "Invalid value";
                      }

                      if (v > 100) {
                        return "Invalid value";
                      }
                    }
                    return true;
                  }
                })}
              />
              <div className="input-group-text px-0">
                <select
                  className="form-select bg-transparent border-0 fw-semibold"
                  {...register("type")}
                >
                  <option value="PERCENTAGE">Percent</option>
                  <option value="FIXED_AMOUNT">Fixed</option>
                </select>
              </div>

              {errors.value?.message && (
                <div className="invalid-feedback">{errors.value.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-default"
          onClick={() => handleClose?.()}
        >
          Cancel
        </button>
        <ProgressButton
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(async (data) => {
              await save(data);
            })();
          }}
        >
          Save
        </ProgressButton>
      </div>
    </>
  );
}

export default DiscountEdit;
