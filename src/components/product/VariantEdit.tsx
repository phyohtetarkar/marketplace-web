import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Product, ProductVariant } from "../../common/models";
import { setEmptyOrString } from "../../common/utils";
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
    handleSubmit,
    setValue
  } = useForm<ProductVariant>();

  const optionsField = useFieldArray({ control, name: "options" });

  const [optionErrors, setOptionErrors] =
    useState<({ value: string } | undefined)[]>();

  const [duplicateError, setDuplicateError] = useState<string>();

  const formik = useFormik<ProductVariant>({
    initialValues: {
      options:
        product.options?.map((pop) => ({
          option: pop.name ?? "",
          value: ""
        })) ?? []
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors: FormikErrors<ProductVariant> = {};

      const floatRegex = "^([0-9]*[.])?[0-9]+$";

      if (!values.price || !`${values.price}`.match(floatRegex)) {
        errors.price = "Invalid price input";
      }

      const optionErrors = [] as ({ value: string } | undefined)[];
      let hasOptionErrors = false;
      values.options.forEach((op, i) => {
        if (!op.value || op.value.trim().length === 0) {
          optionErrors.push({ value: `Please enter ${op.option}` });
          hasOptionErrors = true;
        } else {
          optionErrors.push(undefined);
        }
      });

      if (hasOptionErrors) {
        setOptionErrors(optionErrors);
        errors.options = "Option input errors";
      } else {
        setOptionErrors(undefined);
      }

      if (
        !hasOptionErrors &&
        product.variants
          ?.map((v) =>
            v.options.map((op) => op.value.trim().toLowerCase()).join("-")
          )
          .find((key) => {
            return (
              key ===
              values.options
                .map((op) => op.value.trim().toLowerCase())
                .join("-")
            );
          })
      ) {
        errors.options = "Option input errors";
        setDuplicateError("Duplicate variant");
      } else {
        setDuplicateError(undefined);
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const variant = { ...values };
      variant.title = variant.options.map((op) => op.value).join(" / ");
      handleClose?.(variant);
      formik.setSubmitting(false);
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
        {errors.options?.message && (
          <div className="alert alert-danger mb-2h py-2h" role="alert">
            {errors.options.message}
          </div>
        )}
        <Controller
          control={control}
          name="options"
          rules={{
            validate: (pvo) => {
              if (
                product.variants
                  ?.map((v) =>
                    v.options
                      .map((op) => op.value.trim().toLowerCase())
                      .join("-")
                  )
                  .find((key) => {
                    return (
                      key ===
                      pvo.map((op) => op.value.trim().toLowerCase()).join("-")
                    );
                  })
              ) {
                return "Duplicate variant";
              }
              return true;
            }
          }}
          render={() => <></>}
        />
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
              value={formik.values.stockLeft ?? ""}
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
              handleClose?.(data);
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
