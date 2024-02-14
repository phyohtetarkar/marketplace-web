"use client";
import { Product, ProductVariant } from "@/common/models";
import { parseErrorResponse, setEmptyOrNumber } from "@/common/utils";
import Modal from "@/components/Modal";
import ProgressButton from "@/components/ProgressButton";
import { Input } from "@/components/forms";
import ProductvariantEdit from "@/components/product/ProductVariantEdit";
import { updateProductVariants } from "@/services/ProductService";
import { RiAddCircleLine, RiDeleteBin6Line } from "@remixicon/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

interface ProductEditProps {
  shopId: number;
  product: Product;
}

function ProductVariantsUpdate(props: ProductEditProps) {
  const { shopId, product } = props;

  const { mutate } = useSWRConfig();

  const [showVariantModal, setShowVariantModal] = useState(false);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    clearErrors
  } = useForm({
    values: {
      variants: product.variants ?? []
    }
  });

  const variantsField = useFieldArray({
    control,
    name: "variants",
    keyName: "vId",
    rules: {
      validate: (v, fv) => {
        if (!product.withVariant) {
          return true;
        }
        return (
          v.filter((v) => !v.deleted).length > 0 ||
          "At least one variant required"
        );
      }
    }
  });

  const executeSave = async (values: ProductVariant[]) => {
    try {
      clearErrors();
      await updateProductVariants(shopId, product.id, values);
      toast.success("Product variants saved");
      mutate(`/vendor/shops/${shopId}/products/${product.id}`);
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="hstack">
            <h5 className="mb-0 hstack">
              <span>Variants</span>
              <div
                role="button"
                className="ms-1 text-anchor"
                onClick={() => {
                  setShowVariantModal(true);
                }}
              >
                <RiAddCircleLine size={20} />
              </div>
            </h5>
            <ProgressButton
              className="ms-auto"
              loading={isSubmitting}
              onClick={() => {
                handleSubmit((data) => executeSave(data.variants))();
              }}
            >
              Save
            </ProgressButton>
          </div>
        </div>
        <div className="card-body p-0">
          <div
            className="table-responsive scrollbar-custom"
            style={{ maxHeight: 360 }}
          >
            <table className="table align-middle">
              <thead className="table-light text-nowrap align-middle">
                <tr style={{ height: 50 }}>
                  <th className="ps-3 ps-md-4 fw-medium w-100">VARIANT</th>
                  <th className="fw-medium" style={{ minWidth: 200 }}>
                    PRICE
                  </th>
                  <th className="fw-medium" style={{ minWidth: 200 }}>
                    SKU
                  </th>
                  <th className="fw-medium" style={{ minWidth: 150 }}>
                    Available
                  </th>
                  <th className="fw-medium" style={{ minWidth: 100 }}>
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {variantsField.fields.map((variant, i) => {
                  if (variant.deleted) {
                    return null;
                  }
                  return (
                    <tr key={variant.vId}>
                      <td className="ps-3 ps-md-4 w-100 align-top py-3">
                        <span className="text-nowrap me-3">
                          {variant.attributes
                            .sort((f, s) => f.sort - s.sort)
                            .map((a) => a.value)
                            .join(" / ")}
                        </span>
                      </td>
                      <td className="align-top">
                        <Input
                          type="number"
                          placeholder="Enter variant price"
                          height={40}
                          {...register(`variants.${i}.price`, {
                            setValueAs: setEmptyOrNumber,
                            validate: (v) => {
                              //const floatRegex = "^([0-9]*[.])?[0-9]+$";
                              const floatRegex =
                                "^[0-9]{1,10}([.][0-9]{1,2})?$";
                              if (!`${v}`.match(floatRegex)) {
                                return "Invalid price input";
                              }
                              return true;
                            }
                          })}
                          error={errors.variants?.[i]?.price?.message}
                        />
                      </td>
                      <td className="align-top">
                        <Input
                          type="text"
                          placeholder="Enter variant sku"
                          height={40}
                          {...register(`variants.${i}.sku`)}
                        />
                      </td>
                      <td className="align-top py-2h">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            {...register(`variants.${i}.available`)}
                          ></input>
                        </div>
                      </td>
                      <td className="align-top py-3">
                        {variantsField.fields.filter((v) => !v.deleted).length >
                          1 && (
                          <div
                            role="button"
                            className="link-danger"
                            onClick={() => {
                              if ((variant.id ?? 0) > 0) {
                                variantsField.update(i, {
                                  ...variant,
                                  deleted: true
                                });
                              } else {
                                variantsField.remove(i);
                              }
                            }}
                          >
                            <RiDeleteBin6Line size={20} />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {errors.variants?.root?.message && (
            <div className="text-danger medium px-3 pb-3 px-md-4 pb-md-4">
              {errors.variants.root.message}
            </div>
          )}
        </div>
      </div>

      <Modal id="varientEditModal" show={showVariantModal} variant="large">
        {(isShown) => {
          if (!isShown || !product.id) {
            return <></>;
          }

          return (
            <ProductvariantEdit
              product={product}
              handleSave={(variant) => {
                const v = { ...variant };
                for (const va of v.attributes) {
                  var last = product.variants
                    ?.flatMap((v) => v.attributes)
                    .sort((a, b) => a.vSort - b.vSort)
                    .pop();
                  // console.log(last);
                  va.vSort = !last ? 0 : last.vSort + 1;
                }
                variantsField.append(v);
                setShowVariantModal(false);
              }}
              close={() => setShowVariantModal(false)}
            />
          );
        }}
      </Modal>
    </>
  );
}

export default ProductVariantsUpdate;
