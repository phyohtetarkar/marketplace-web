import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Product, ProductVariant } from "../../common/models";
import { setEmptyOrString } from "../../common/utils";
import Alert from "../Alert";
import { Input } from "../forms";

interface VaraintEditProps {
  product: Product;
  handleClose?: (value?: ProductVariant) => void;
}

function VaraintEdit(props: VaraintEditProps) {
  const { product, handleClose } = props;

  const {
    control,
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ProductVariant>({
    defaultValues: {
      options: product.options?.map((op) => ({ option: op.name }))
    }
  });

  const optionsField = useFieldArray({
    control,
    name: "options",
    rules: {
      validate: (pvo) => {
        if (
          product.variants
            ?.map((v) =>
              v.options.map((op) => op.value?.trim()?.toLowerCase()).join("-")
            )
            .find((key) => {
              return (
                key ===
                pvo.map((op) => op.value?.trim()?.toLowerCase()).join("-")
              );
            })
        ) {
          return "Duplicate variant";
        }
        return true;
      }
    }
  });

  if (!product.options || product.options.length === 0) {
    return null;
  }

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Add Variant</h5>
      </div>

      <div className="modal-body">
        {errors.options?.root?.message && (
          <Alert message={errors.options.root.message} variant="danger" />
        )}
        <div className="row g-3">
          {optionsField.fields.map((op, i) => {
            return (
              <div key={i} className="col-12">
                <Input
                  label={op.option}
                  placeholder={`Enter ${op.option.toLowerCase()}`}
                  error={errors.options?.[i]?.value?.message}
                  {...register(`options.${i}.value`, {
                    setValueAs: setEmptyOrString,
                    validate: (v, fv) => {
                      if (!v) {
                        return `Please enter ${op.option}`;
                      }
                      return true;
                    }
                  })}
                />
              </div>
            );
          })}
          <div className="col-lg-6">
            <Input
              label="Price"
              placeholder="Enter variant price"
              error={errors.price?.message}
              {...register("price", {
                validate: (v) => {
                  const floatRegex = "^([0-9]*[.])?[0-9]+$";
                  if (!`${v}`.match(floatRegex)) {
                    return "Invalid price input";
                  }
                  return true;
                }
              })}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="SKU"
              placeholder="Enter variant sku"
              {...register("sku")}
            />
          </div>
          <div className="col-12">
            <Input
              label="Stock amount"
              type="text"
              placeholder="Enter stock amount"
              {...register("stockLeft", {
                validate: (v, fv) => {
                  const numRegex = "^[0-9]*$";
                  if (!`${v}`.match(numRegex)) {
                    return "Invalid stock amount input";
                  }
                  return true;
                }
              })}
              error={errors.stockLeft?.message}
            />
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            handleSubmit((data) => {
              const title = data.options.map((op) => op.value).join(" / ");
              handleClose?.({ ...data, title: title });
            })();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default VaraintEdit;
