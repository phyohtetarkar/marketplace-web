"use client";
import { Product, ProductVariant } from "@/common/models";
import { setEmptyOrNumber, setEmptyOrString } from "@/common/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@/components/Alert";
import { Input } from "@/components/forms";

interface Props {
  product: Product;
  handleSave?: (value: ProductVariant) => void;
  close?: () => void;
}

function ProductvariantEdit(props: Props) {
  const { product, handleSave, close } = props;

  const [error, setError] = useState<string>();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ProductVariant>();

  if (!product.attributes || product.attributes.length === 0) {
    return null;
  }

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Add Variant</h5>
      </div>

      <div className="modal-body">
        {error && <Alert message={error} variant="danger" />}
        <div className="row g-3">
          {product.attributes
            .sort((f, s) => f.sort - s.sort)
            .map((a, i) => {
              return (
                <div key={i} className="col-12">
                  <input
                    type="hidden"
                    {...register(`attributes.${i}.attribute`, {
                      value: a.name
                    })}
                  />
                  <input
                    type="hidden"
                    {...register(`attributes.${i}.sort`, {
                      value: i
                    })}
                  />
                  <Input
                    label={a.name}
                    placeholder={`Enter ${a.name?.toLowerCase()}`}
                    error={errors.attributes?.[i]?.value?.message}
                    {...register(`attributes.${i}.value`, {
                      setValueAs: setEmptyOrString,
                      validate: (v, fv) => {
                        if (!v) {
                          return `Please enter ${a.name}`;
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
              label="Price *"
              type="number"
              placeholder="Enter variant price"
              error={errors.price?.message}
              {...register("price", {
                setValueAs: setEmptyOrNumber,
                validate: (v) => {
                  const floatRegex = "^[0-9]{1,10}([.][0-9]{1,2})?$";
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
            <div className="form-check">
              <input
                id="variantAvailableCheck"
                className="form-check-input"
                type="checkbox"
                {...register("available")}
              ></input>
              <label
                htmlFor="variantAvailableCheck"
                className="form-check-label fw-medium"
              >
                Available
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-default"
          onClick={() => close?.()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            handleSubmit((data) => {
              const values = data.attributes;
              if (
                product.variants?.find((pv) => {
                  return pv.attributes.every((va) => {
                    return values
                      .map((v) => v.value.trim().toLowerCase())
                      .includes(va.value.trim().toLowerCase());
                  });
                })
              ) {
                setError("Variant already exists");
                return;
              }

              handleSave?.(data);
            })();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default ProductvariantEdit;
