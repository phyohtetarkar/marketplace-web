"use client";
import { useCategories, useLocalization } from "@/common/hooks";
import {
  Category,
  Product,
  ProductUpdate as ProductGeneralUpdate
} from "@/common/models";
import {
  getCategoryName,
  parseErrorResponse,
  setEmptyOrNumber,
  setEmptyOrString,
  setStringToSlug
} from "@/common/utils";
import DiscountSelect from "@/components/DiscountSelect";
import ProgressButton from "@/components/ProgressButton";
import { AutocompleteSelect, Input } from "@/components/forms";
import { updateProduct } from "@/services/ProductService";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

interface ProductEditProps {
  shopId: number;
  product: Product;
}

function ProductGeneralUpdate(props: ProductEditProps) {
  const { shopId, product } = props;

  const { mutate } = useSWRConfig();

  const { locale } = useLocalization();

  const { categories } = useCategories(false);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ProductGeneralUpdate>({
    values: {
      shopId: shopId,
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      brand: product.brand,
      available: product.available,
      newArrival: product.newArrival,
      categoryId: product.category.id,
      discountId: product.discount?.id
    }
  });

  const executeSave = async (values: ProductGeneralUpdate) => {
    try {
      await updateProduct({ ...values, discount: undefined });
      toast.success("Product updated");
      mutate<Product>(`/vendor/shops/${shopId}/products/${product.id}`).then(
        (p) => {
          setValue("slug", p?.slug);
        }
      );
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header border-bottom">
        <div className="hstack gap-3">
          <h5 className="mb-0">General</h5>
          <ProgressButton
            className="ms-auto btn btn-primary"
            loading={isSubmitting}
            onClick={() => {
              handleSubmit(executeSave)();
            }}
          >
            Save
          </ProgressButton>
        </div>
      </div>
      <div className="card-body">
        <div className="row g-3 mb-4">
          <div className="col-12 col-lg-6">
            <Input
              label="Name *"
              id="nameInput"
              type="text"
              placeholder="Enter product name"
              {...register("name", {
                required: "Please enter product name",
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

          <div className="col-12 col-lg-6">
            <Controller
              control={control}
              name="slug"
              rules={{
                validate: (v) => {
                  if (!setStringToSlug(v)) {
                    return "Please enter valid slug";
                  }
                  return true;
                }
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Input
                      label="Slug *"
                      value={field.value ?? ""}
                      placeholder="your-product-name"
                      onChange={(evt) => {
                        setValue("slug", setStringToSlug(evt.target.value), {
                          shouldValidate: true
                        });
                      }}
                      error={error?.message}
                    />
                    {/* {!error?.message && (
                              <small className="text-muted">{`${
                                window.location.origin
                              }/products/${field.value ?? ""}`}</small>
                            )} */}
                  </>
                );
              }}
            />
          </div>

          <div className="col-12">
            <div>
              <label className="form-label">Category *</label>
              <Controller
                name="categoryId"
                control={control}
                rules={{
                  validate: (v) => !!v || "Please select category"
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <AutocompleteSelect<Category, number>
                      options={categories ?? []}
                      defaultValue={product?.category}
                      getOptionLabel={(v) => getCategoryName(locale, v)}
                      getOptionKey={(v) => v.id}
                      getNestedData={(v) => v.children}
                      canSelect={(v) => !v.children || v.children?.length === 0}
                      onChange={(v) => {
                        if (!v) {
                          return;
                        }
                        // setValue("category", v, {
                        //   shouldValidate: !!error?.message
                        // });
                        setValue("categoryId", v.id, {
                          shouldValidate: true
                        });
                      }}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
          </div>

          <div className="col-12">
            <Input
              label="Brand name"
              id="brandInput"
              type="text"
              placeholder="Enter brand name"
              {...register("brand", {
                setValueAs: setEmptyOrString
              })}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Discount</label>
            <Controller
              control={control}
              name="discount"
              render={({ field }) => {
                return (
                  <DiscountSelect
                    shopId={shopId}
                    value={field.value}
                    onChange={(value) => {
                      setValue("discount", value);
                      setValue("discountId", value?.id);
                    }}
                  />
                );
              }}
            />
          </div>
        </div>

        {!product.withVariant && (
          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <Input
                label="Price *"
                id="priceInput"
                type="number"
                placeholder="Enter price"
                disabled={product.withVariant ?? false}
                error={errors.price?.message}
                {...register("price", {
                  setValueAs: setEmptyOrNumber,
                  validate: (v, fv) => {
                    const floatRegex = "^[0-9]{1,10}([.][0-9]{1,2})?$";
                    if (!product.withVariant && !`${v}`.match(floatRegex)) {
                      return "Invalid price input";
                    }
                    return true;
                  }
                })}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Input
                label="SKU"
                id="skuInput"
                type="text"
                disabled={product.withVariant ?? false}
                placeholder="Enter product sku"
                {...register("sku")}
              />
            </div>
          </div>
        )}

        <hr className="text-muted my-4"></hr>

        <div className="row g-3 mb-3">
          <div className="col-12 col-lg-6">
            <div className="form-check">
              <label
                htmlFor="newArrivalCheck"
                className="form-check-label fw-medium ps-0"
              >
                New arrival
              </label>
              <input
                id="newArrivalCheck"
                className="form-check-input"
                type="checkbox"
                {...register("newArrival")}
              ></input>
            </div>
          </div>
          {!product.withVariant && (
            <div className="col-12 col-lg-6">
              <div className="form-check">
                <label
                  htmlFor="availableCheck"
                  className="form-check-label fw-medium ps-0"
                >
                  Available
                </label>
                <input
                  id="availableCheck"
                  className="form-check-input"
                  type="checkbox"
                  {...register("available")}
                ></input>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductGeneralUpdate;
