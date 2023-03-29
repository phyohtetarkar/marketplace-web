import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { default as NextImage } from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { useCategories } from "../../common/hooks";
import {
  Category,
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
  ProductVariantOption,
  Shop
} from "../../common/models";
import {
  parseErrorResponse,
  setEmptyOrNumber,
  setEmptyOrString,
  setStringToSlug
} from "../../common/utils";
import {
  getProductById,
  ProductQuery,
  saveProduct
} from "../../services/ProductService";
import { AutocompleteSelect, Input } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import Loading from "../Loading";
import Modal from "../Modal";
import ProgressButton from "../ProgressButton";
import OptionEdit, { Option } from "./OptionEdit";
import VaraintEdit from "./VariantEdit";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface ProductEditProps {
  shop: Shop;
  productId?: number;
  pendingQuery?: ProductQuery;
  onPopBack?: (reload?: boolean) => void;
}

function ProductEdit({
  shop,
  productId,
  pendingQuery,
  onPopBack
}: ProductEditProps) {
  const { mutate } = useSWRConfig();

  const [fetching, setFetching] = useState((productId ?? 0) > 0);
  const [product, setProduct] = useState<Product>({
    shopId: shop.id,
    images: []
  });

  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  //const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [withVariant, setWithVariant] = useState<boolean>();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);

  const { categories } = useCategories(false);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    clearErrors
  } = useForm<Product>({ values: product });

  const varaintsField = useFieldArray({
    control,
    name: "variants",
    keyName: "vId",
    rules: {
      validate: (v, fv) => {
        if (!fv.withVariant) {
          return true;
        }
        return (
          v.filter((v) => !v.deleted).length > 0 ||
          "At least one variant required"
        );
      }
    }
  });

  const imagesField = useFieldArray({
    control,
    name: "images",
    keyName: "vId",
    rules: {
      validate: (v) => {
        if (v.filter((img) => !img.deleted).length <= 0) {
          imagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          return "Required at least one image";
        }

        return true;
      }
    }
  });

  useEffect(() => {
    // if (
    //   !productSlug ||
    //   productSlug.trim().length === 0 ||
    //   productSlug === "new"
    // ) {
    //   return;
    // }

    if (!productId) {
      return;
    }

    if (!categories) {
      return;
    }

    getProductById(productId)
      .then((p) => {
        setProduct({
          ...p,
          shopId: p.shop?.id,
          categoryId: p.category?.id,
          discountId: p.discount?.id
        });
        setWithVariant(p.withVariant);
      })
      .catch((error) => {
        const msg = parseErrorResponse(error);
      })
      .finally(() => {
        setFetching(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files.length > 0) {
      let file = files[0];
      const fileSize = file.size / (1024 * 1024);

      var reader = new FileReader();
      reader.onload = function (e) {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          const img = new Image();

          img.onload = (evt) => {
            if (img.width > 800 || img.height > 800) {
              toast.error("Image over dimension");
              return;
            }

            const image: ProductImage = {
              file: file,
              url: result
            };
            imagesField.append(image);
          };

          img.src = result;
        }
      };
      reader.readAsDataURL(file);
    }

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  function generateVariant(
    list: Option[],
    index: number,
    key: string,
    variantOptions?: ProductVariantOption[]
  ) {
    const result: ProductVariant[] = [];
    const option = list[index];

    for (const value of option.values) {
      if (index < list.length - 1) {
        const options = variantOptions ? variantOptions : [];
        options.push({
          option: option.name.trim(),
          value: value.trim()
        });
        result.push(
          ...generateVariant(
            list,
            index + 1,
            `${index > 0 ? key + " / " + value : value}`,
            options
          )
        );
      } else {
        const options = variantOptions ? variantOptions : [];
        result.push({
          title: `${index > 0 ? key + " / " + value : value}`,
          options: [
            ...options,
            { option: option.name.trim(), value: value.trim() }
          ]
        });
      }
    }

    return result;
  }

  const executeSave = async (values: Product) => {
    try {
      const product = { ...values };
      if (product.variants && product.variants.length > 0) {
        let totalStock = 0;
        product.variants = product.variants.map((v) => {
          const vp = parseFloat(`${v.price}`);
          if (!v.deleted) {
            totalStock += v.stockLeft ?? 0;
          }
          return {
            ...v,
            price: isNaN(vp) ? undefined : vp
          };
        });

        product.stockLeft = totalStock;
      }

      if (product.price) {
        const pp = parseFloat(`${product.price}`);
        product.price = isNaN(pp) ? undefined : pp;
      }

      if (!product.id) {
        product.options = options.map((op, i) => {
          return { name: op.name.trim(), position: i } as ProductOption;
        });
      }

      console.log(product);
      await saveProduct(product);
      //mutate(["/products", pendingQuery]);
      onPopBack?.(true);
      toast.success("Product successfully saved");
    } catch (error) {
      const msg = parseErrorResponse(error);
      console.log(msg);
      toast.error(msg);
    } finally {
      //formik.setSubmitting(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-3">
        <Loading />
      </div>
    );
  }

  const title = (!product.id ? "Create" : "Update") + " product";

  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(async (data) => {
            await executeSave(data);
          })();
        }}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
          }
        }}
      >
        <div className="hstack my-3">
          <button
            type="button"
            className="btn btn-default py-2 me-2 ms-auto"
            onClick={() => {
              onPopBack?.(false);
            }}
          >
            Go back
          </button>
          <ProgressButton
            loading={isSubmitting}
            className="py-2"
            onClick={() => {
              handleSubmit(async (data) => await executeSave({ ...data }))();
            }}
          >
            {title}
          </ProgressButton>
          {/* <button
            type="button"
            className="btn btn-default py-2 ms-2 d-block d-md-none"
            onClick={() => {
              onPopBack?.(false);
            }}
          >
            Go back
          </button> */}
          {/* <Dropdown
                    toggle={
                     
                    }
                    className="dropdown-menu-end"
                  >
                    <li
                      className="dropdown-item"
                      role="button"
                      onClick={() => {
                        
                      }}
                    >
                      Draft
                    </li>
                    <li
                      className="dropdown-item"
                      role="button"
                      onClick={() => {
                        handleSubmit(
                          async (data) =>
                            await executeSave({ ...data, status: "PUBLISHED" })
                        )();
                      }}
                    >
                      Published
                    </li>
                  </Dropdown> */}
        </div>

        <div className="">
          <div className="vstack gap-3">
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3 px-md-4 border-bottom">
                <h5 className="mb-0">General</h5>
              </div>
              <div className="card-body p-md-4">
                <div className="row g-4 mb-4">
                  <div className="col-lg-6">
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

                  <div className="col-lg-6">
                    <Input
                      label="Slug *"
                      id="slugInput"
                      type="text"
                      placeholder="your-product-name"
                      {...register("slug", {
                        required: "Please enter slug",
                        setValueAs: setEmptyOrString
                      })}
                      error={errors.slug?.message}
                    />
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-lg-6 order-2 order-lg-1 vstack">
                    <label className="form-label">Description</label>
                    <div
                      className="flex-grow-1"
                      // ref={(e) => {
                      //   const h = e?.clientHeight ?? 300;
                      //   setEditorHeight(h > 250 ? h : 300);
                      // }}
                    >
                      <Controller
                        control={control}
                        name="description"
                        render={({ field }) => {
                          return (
                            <DynamicEditor
                              id="descriptionInput"
                              placeholder="Enter product description..."
                              minHeight={300}
                              value={field.value}
                              onEditorChange={(v) => {
                                setValue("description", v);
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 order-1 order-lg-2">
                    <div className="vstack">
                      <div className="mb-3">
                        <label className="form-label">Category *</label>
                        <Controller
                          name="category"
                          control={control}
                          rules={{
                            validate: (v) => !!v || "Please select category"
                          }}
                          render={({ field, fieldState: { error } }) => {
                            return (
                              <AutocompleteSelect<Category, number>
                                options={categories ?? []}
                                defaultValue={field.value}
                                getOptionLabel={(v) => v.name}
                                getOptionKey={(v) => v.id}
                                getNestedData={(v) => v.children}
                                canSelect={(v) =>
                                  !v.children || v.children?.length === 0
                                }
                                onChange={(v) => {
                                  if (!v) {
                                    return;
                                  }
                                  setValue("category", v, {
                                    shouldValidate: !!error?.message
                                  });
                                  setValue("categoryId", v.id);
                                }}
                                error={error?.message}
                              />
                            );
                          }}
                        />
                      </div>

                      <Input
                        label="Brand name"
                        id="brandInput"
                        type="text"
                        placeholder="Enter brand name"
                        {...register("brand", {
                          setValueAs: setEmptyOrString
                        })}
                      />

                      <label className="form-label mt-3">
                        Country of origin
                      </label>
                      <AutocompleteSelect<string, string>
                        options={[
                          "Myanmar",
                          "China",
                          "UK",
                          "India",
                          "Japan",
                          "Korea"
                        ].sort()}
                        getOptionLabel={(v) => v}
                        getOptionKey={(v) => v}
                      />
                    </div>
                  </div>
                </div>

                <div className="row g-4 my-4">
                  {!product.id && (
                    <div className="col-auto">
                      <div className="form-check form-switch">
                        <input
                          id="variantCheck"
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          {...register("withVariant", {
                            onChange: (evt) => {
                              if (!evt.target.checked) {
                                setValue("variants", undefined);
                                setOptions([]);
                              } else {
                                setValue("price", undefined);
                                setValue("sku", undefined);
                              }
                              setValue("stockLeft", undefined);
                              setWithVariant(evt.target.checked);
                            }
                          })}
                        ></input>
                        <label
                          htmlFor="variantCheck"
                          className="form-check-label fw-medium"
                        >
                          With variants
                        </label>
                      </div>
                    </div>
                  )}
                  <div className="col-auto">
                    <div className="form-check form-switch">
                      <input
                        id="newArrivalCheck"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        {...register("newArrival")}
                      ></input>
                      <label
                        htmlFor="newArrivalCheck"
                        className="form-check-label fw-medium"
                      >
                        New arrival
                      </label>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="form-check form-switch">
                      <input
                        id="hiddenCheck"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        {...register("hidden")}
                      ></input>
                      <label
                        htmlFor="hiddenCheck"
                        className="form-check-label fw-medium"
                      >
                        Hidden
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {withVariant && (
              <div className="card shadow-sm">
                <div className="card-header bg-white py-3 px-md-4">
                  <div className="hstack justify-content-between">
                    <h5 className="mb-0">Variants</h5>
                    {!product.id ? (
                      <button
                        type="button"
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setShowOptionModal(true);
                        }}
                      >
                        Edit Options
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setShowVariantModal(true);
                        }}
                      >
                        Add Variant
                      </button>
                    )}
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
                          <th className="ps-3 ps-md-4 fw-medium w-100">
                            VARIANT
                          </th>
                          <th className="fw-medium" style={{ minWidth: 200 }}>
                            PRICE
                          </th>
                          <th className="fw-medium" style={{ minWidth: 200 }}>
                            SKU
                          </th>
                          <th className="fw-medium" style={{ minWidth: 200 }}>
                            STOCK
                          </th>
                          <th className="fw-medium" style={{ minWidth: 100 }}>
                            ACTION
                          </th>
                        </tr>
                      </thead>
                      <tbody className="border-top-0">
                        {varaintsField.fields.map((variant, i) => {
                          if (variant.deleted) {
                            return null;
                          }
                          return (
                            <tr key={i}>
                              <td className="ps-3 ps-md-4 w-100">
                                <span className="text-nowrap me-3">
                                  {variant.title}
                                </span>
                              </td>
                              <td className="align-top">
                                <Input
                                  type="text"
                                  placeholder="Enter variant price"
                                  height={40}
                                  {...register(`variants.${i}.price`, {
                                    validate: (v) => {
                                      const floatRegex = "^([0-9]*[.])?[0-9]+$";
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
                              <td className="align-top">
                                <Input
                                  type="text"
                                  placeholder="Enter stock amount"
                                  height={40}
                                  {...register(`variants.${i}.stockLeft`, {
                                    setValueAs: (v) =>
                                      !v ? 0 : setEmptyOrNumber(v),
                                    validate: (v) => {
                                      const numRegex = "^[0-9]*$";
                                      if (!`${v}`.match(numRegex)) {
                                        return "Invalid stock amount input";
                                      }
                                      return true;
                                    }
                                  })}
                                  error={
                                    errors.variants?.[i]?.stockLeft?.message
                                  }
                                />
                              </td>
                              <td>
                                <div
                                  role="button"
                                  className="link-danger"
                                  onClick={() => {
                                    if ((variant.id ?? 0) > 0) {
                                      varaintsField.update(i, {
                                        ...variant,
                                        deleted: true
                                      });
                                    } else {
                                      varaintsField.remove(i);
                                    }
                                  }}
                                >
                                  <TrashIcon width={20} />
                                </div>
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
            )}

            {!withVariant && (
              <div className="card shadow-sm">
                <div className="card-header bg-white py-3 px-md-4 border-bottom">
                  <h5 className="mb-0">Pricing</h5>
                </div>
                <div className="card-body p-md-4">
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <Input
                        label="Price *"
                        id="priceInput"
                        type="text"
                        placeholder="Enter price"
                        error={errors.price?.message}
                        {...register("price", {
                          validate: (v, fv) => {
                            const floatRegex = "^([0-9]*[.])?[0-9]+$";
                            if (!fv.withVariant && !`${v}`.match(floatRegex)) {
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
                        id="skuInput"
                        type="text"
                        placeholder="Enter product sku"
                        {...register("sku")}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        label="Stock *"
                        id="stockInput"
                        type="text"
                        placeholder="Enter stock amount"
                        {...register("stockLeft", {
                          setValueAs: (v) => (!v ? 0 : setEmptyOrNumber(v)),
                          validate: (v, fv) => {
                            const numRegex = "^[0-9]*$";
                            if (!fv.withVariant && !`${v}`.match(numRegex)) {
                              return "Invalid stock amount input";
                            }
                            return true;
                          }
                        })}
                        error={errors.stockLeft?.message}
                      />
                    </div>
                    {/* <div className="col-lg-12">
                  <label className="form-label">Discount</label>
                  <div className="input-group">
                    <Input
                      id="discountInput"
                      name="discount"
                      type="text"
                      placeholder="Enter discount"
                    />
                    <div className="d-flex">
                      <select className="form-select rounded-0 border-start-0 bg-light">
                        <option value="fixed">.00</option>
                        <option value="percent">%</option>
                      </select>
                    </div>
                    <div className="input-group-text">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                        ></input>
                        <label className="form-check-label">Apply</label>
                      </div>
                    </div>
                  </div>
                </div> */}
                  </div>
                </div>
              </div>
            )}

            {/* <div className="card">
            <div className="card-header bg-white py-3 px-md-4">
              <h5 className="mb-0">Promotion</h5>
            </div>
            <div className="card-body p-md-4">
              <div className="row g-4">
                <div className="col-lg-6">
                  <label className="form-label">Discount</label>
                  <AutocompleteSelect<string, string>
                    placeholder="Choose discount"
                    getOptionLabel={(v) => v}
                    getOptionValue={(v) => v}
                  />
                </div>
              </div>
            </div>
          </div> */}

            <div ref={imagesRef} className="card shadow-sm">
              <div className="card-header bg-white py-3 px-md-4 border-bottom">
                <h5 className="mb-0">Images</h5>
              </div>
              <div className="card-body p-md-4">
                {errors.images?.root?.message && (
                  <div className="text-danger mb-3">
                    {errors.images.root.message}
                  </div>
                )}
                <div className="d-flex flex-wrap gap-3">
                  {imagesField.fields
                    .filter((img) => !img.deleted)
                    .map((img, index) => {
                      return (
                        <div key={index} className="position-relative">
                          <NextImage
                            src={img.url ?? "/images/placeholder.jpeg"}
                            width={150}
                            height={150}
                            alt=""
                            style={{
                              objectFit: "contain"
                            }}
                            className="rounded border"
                          />
                          <div className="hstack justify-content-center">
                            <div className="form-check">
                              <input
                                id={`thumbnail${index}Check`}
                                className="form-check-input"
                                type="radio"
                                checked={img.thumbnail ?? false}
                                {...register(`images.${index}.thumbnail`, {
                                  onChange: (evt) => {
                                    // imagesField.fields.forEach((m, j) => {
                                    //   if (index !== j) {
                                    //     setValue(
                                    //       `images.${j}.thumbnail`,
                                    //       false
                                    //     );
                                    //   }
                                    // });

                                    const images = imagesField.fields.map(
                                      (m, j) => {
                                        return {
                                          ...m,
                                          thumbnail: index === j
                                        };
                                      }
                                    );

                                    imagesField.replace(images);
                                  }
                                })}
                              ></input>
                              <label
                                htmlFor={`thumbnail${index}Check`}
                                className="form-check-label"
                              >
                                Thumbnail
                              </label>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="position-absolute top-0 end-0 m-2 btn btn-sm btn-danger"
                            onClick={() => {
                              if (img.id && img.id > 0) {
                                imagesField.update(index, {
                                  ...img,
                                  deleted: true
                                });
                              } else {
                                imagesField.remove(index);
                              }
                            }}
                          >
                            <TrashIcon width={18} />
                          </button>
                        </div>
                      );
                    })}
                  <Controller
                    control={control}
                    name="images"
                    render={({ field }) => {
                      const list =
                        field.value?.filter((img) => !img.deleted) ?? [];

                      if (list.length >= 5) {
                        return <></>;
                      }
                      return (
                        <button
                          type="button"
                          className="btn btn-light-gray hstack justify-content-center"
                          style={{ width: 150, height: 150 }}
                          onClick={() => fileRef.current?.click()}
                        >
                          <PlusIcon
                            width={44}
                            strokeWidth={2}
                            className="text-muted"
                          />
                        </button>
                      );
                    }}
                  />
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  className="d-none"
                  accept="image/x-png,image/jpeg"
                  onChange={handleImageChange}
                />
              </div>
              <div className="card-footer px-md-4 py-3">
                <span className="text-muted">
                  Product image can upload up to <strong>5</strong> images with
                  dimension constraint of at most <strong>800x800</strong>px.
                </span>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-header bg-white py-3 px-md-4 border-bottom">
                <h5 className="mb-0">Product video</h5>
              </div>
              <div className="card-body p-md-4">
                <div className="vstack gap-4">
                  <Input
                    id="videoInput"
                    type="text"
                    placeholder="Enter youtube ID"
                    {...register("videoId")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal id="optionEditModal" show={showOptionModal} variant="large">
        {(isShown) =>
          isShown && options ? (
            <OptionEdit
              data={[...options]}
              handleClose={(list) => {
                if (list) {
                  setOptions(list);
                  varaintsField.replace(
                    list.length > 0 ? generateVariant(list, 0, "") : []
                  );
                  clearErrors("variants");
                }

                setShowOptionModal(false);
              }}
            />
          ) : (
            <></>
          )
        }
      </Modal>

      <Modal id="varientEditModal" show={showVariantModal} variant="large">
        {(isShown) =>
          isShown && product.id ? (
            <VaraintEdit
              product={product}
              handleClose={(value) => {
                if (value) {
                  varaintsField.append(value);
                }

                setShowVariantModal(false);
              }}
            />
          ) : (
            <></>
          )
        }
      </Modal>
    </div>
  );
}

export default ProductEdit;
