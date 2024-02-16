"use client";
import { withAuthentication } from "@/common/WithAuthentication";
import { ProgressContext } from "@/common/contexts";
import { useCategories } from "@/common/hooks";
import {
  Category,
  Product,
  ProductAttributeEdit,
  ProductCreate,
  ProductImage,
  ProductVariant,
  ProductVariantAttribute
} from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrNumber,
  setEmptyOrString,
  setStringToSlug
} from "@/common/utils";
import {
  createProduct,
  deleteProduct,
  getProductById,
} from "@/services/ProductService";
import { RiAddLine, RiDeleteBin6Line } from "@remixicon/react";
import dynamic from "next/dynamic";
import { default as NextImage } from "next/image";
import { useRouter } from "next/navigation";
import {
  CSSProperties,
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Alert";
import ConfirmModal from "../ConfirmModal";
import DiscountSelect from "../DiscountSelect";
import Dropdown from "../Dropdown";
import Loading from "../Loading";
import Modal from "../Modal";
import { AutocompleteSelect, Input } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import OptionEdit from "./OptionEdit";
import ProductvariantEdit from "./ProductVariantEdit";
import Link from "next/link";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface ProductEditProps {
  shopId: number;
  productId?: number;
}

function ProductEdit(props: ProductEditProps) {
  const { shopId, productId } = props;

  const progressContext = useContext(ProgressContext);
  const router = useRouter();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [fetching, setFetching] = useState(!!productId);
  const [product, setProduct] = useState<Product>();
  const [productEdit, setProductEdit] = useState<ProductCreate>({
    shopId: shopId,
    images: [],
    available: true
  });

  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [withVariant, setWithVariant] = useState<boolean>();

  const [error, setError] = useState<string>();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);

  const { categories } = useCategories(false);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    getValues,
    clearErrors
  } = useForm({
    values: productEdit,
    defaultValues: { shopId: shopId, images: [] }
  });

  const variantsField = useFieldArray({
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
    if (productId && productId > 0) {
      getProductById(shopId, productId)
        .then((p) => {
          if (!p) {
            throw "Product not found";
          }
          setProduct(p);
          setProductEdit({
            ...p,
            shopId: shopId,
            categoryId: p.category?.id,
            discountId: p.discount?.id
          });
          setWithVariant(p.withVariant);
        })
        .catch((error) => {
          console.log(error);
          const msg = parseErrorResponse(error);
          setError(msg);
        })
        .finally(() => {
          setFetching(false);
        });
    } else {
      setFetching(false);
    }
  }, [productId]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      const files = event.target.files;

      if (files && files.length > 0) {
        let file = files[0];
        const fileSize = file.size / (1024 * 1024);

        if (fileSize > 0.36) {
          throw "File size must not greater than 360KB";
        }

        var reader = new FileReader();
        reader.onload = function (e) {
          const result = e.target?.result;
          if (result && typeof result === "string") {
            const img = new Image();

            img.onload = (evt) => {
              // if (img.width > 800 || img.height > 800) {
              //   toast.error("Image over dimension");
              //   return;
              // }

              const image: ProductImage = {
                file: file,
                name: result
              };
              imagesField.append(image);
            };

            img.src = result;
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      event.target.value = "";
    }
  }

  function generateVariant(
    attributes: ProductAttributeEdit[],
    index: number,
    variantAttributes?: ProductVariantAttribute[]
  ) {
    const variants: ProductVariant[] = [];
    const attribute = attributes[index];

    const attributeValues = attribute.values ?? [];

    for (const value of attributeValues) {
      if (index < attributes.length - 1) {
        const values = variantAttributes ? [...variantAttributes] : [];
        values.push({
          value: value.value.trim(),
          sort: values.length,
          attribute: attribute.name ?? "",
          vSort: value.sort
        });
        variants.push(...generateVariant(attributes, index + 1, values));
      } else {
        const values = variantAttributes ? variantAttributes : [];
        variants.push({
          attributes: [
            ...values,
            {
              value: value.value.trim(),
              sort: values.length,
              attribute: attribute.name ?? "",
              vSort: value.sort
            }
          ]
        });
      }
    }

    return variants;
  }

  const executeSave = async (values: ProductCreate) => {
    try {
      progressContext.update(true);
      const product = { ...values };

      if (product.variants && product.variants.length > 0) {
        product.variants = product.variants.map((v) => {
          const vp = parseFloat(`${v.price}`);
          return {
            ...v,
            price: isNaN(vp) ? undefined : vp
          };
        });
      }

      if (product.price) {
        const pp = parseFloat(`${product.price}`);
        product.price = isNaN(pp) ? undefined : pp;
      }

      //console.log(product);
      await createProduct(product);
      toast.success("Product saved");
      if (!!product.id) {
      } else {
        router.replace(`/profile/shops/${shopId}/products`);
      }
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      progressContext.update(false);
    }
  };

  const executeDelete = async () => {
    try {
      progressContext.update(true);
      if (!productEdit.id) {
        throw undefined;
      }
      await deleteProduct(shopId, productEdit.id);
      toast.success("Product deleted successfully");
      router.replace(`/profile/shops/${shopId}/products`);
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      progressContext.update(false);
    }
  };

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={error} variant="danger" />;
  }

  const title = (!productEdit.id ? "Create" : "Update") + " product";

  return (
    <>
      <div className="row g-3 align-items-center mb-3">
        <div className="col-lg-6">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb mb-0"
              style={
                {
                  "--bs-breadcrumb-divider-color": "#666",
                  "--bs-breadcrumb-item-active-color": "#666"
                } as CSSProperties
              }
            >
              <li className="breadcrumb-item">
                <Link
                  href={`/profile/shops/${shopId}/dashboard`}
                  className="link-anchor"
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  href={`/profile/shops/${shopId}/products`}
                  className="link-anchor"
                >
                  Products
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-lg-6 d-flex">
          <div className="hstack gap-2 ms-lg-auto">
            {(productEdit.id ?? 0) > 0 && (
              <button
                type="button"
                className="btn btn-danger py-2"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </button>
            )}
            <Dropdown
              toggle={<div>Save as</div>}
              menuClassName="dropdown-menu-end"
              toggleClassName="btn btn-default py-2 dropdown-toggle hstack"
            >
              <li
                className="dropdown-item"
                role="button"
                onClick={() => {
                  handleSubmit(async (data) => {
                    await executeSave({ ...data, draft: true });
                  })();
                }}
              >
                Draft
              </li>
              <div className="dropdown-divider"></div>
              <li
                className="dropdown-item"
                role="button"
                onClick={() => {
                  handleSubmit(async (data) => {
                    await executeSave({ ...data, draft: false });
                  })();
                }}
              >
                {product?.status === "PUBLISHED" ? "Update" : "Publish"}
              </li>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header py-3 border-bottom">
                <h5 className="mb-0">General</h5>
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
                                setValue(
                                  "slug",
                                  setStringToSlug(evt.target.value),
                                  {
                                    shouldValidate: true
                                  }
                                );
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

                <hr className="text-muted my-4"></hr>

                <div className="row g-3 mb-3">
                  {!productEdit.id && (
                    <div className="col-12 col-lg-6">
                      <div className="form-check">
                        <label
                          htmlFor="variantCheck"
                          className="form-check-label fw-medium ps-0"
                        >
                          With variants
                        </label>
                        <input
                          id="variantCheck"
                          className="form-check-input"
                          type="checkbox"
                          {...register("withVariant", {
                            onChange: (evt) => {
                              if (!evt.target.checked) {
                                variantsField.remove();
                                setValue("attributes", undefined);
                              } else {
                                setValue("price", undefined);
                                setValue("sku", undefined);
                              }
                              setValue("available", true);
                              setWithVariant(evt.target.checked);
                              clearErrors();
                            }
                          })}
                        ></input>
                      </div>
                    </div>
                  )}
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
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            {withVariant && (
              <div className="card mb-3">
                <div className="card-header py-3">
                  <div className="hstack justify-content-between">
                    <h5 className="mb-0">Variants</h5>
                    {!productEdit.id ? (
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
                                {variantsField.fields.filter((v) => !v.deleted)
                                  .length > 1 && (
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
            )}

            {!withVariant && (
              <div className="card mb-3">
                <div className="card-header py-3 border-bottom">
                  <h5 className="mb-0">Pricing</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <Input
                        label="Price *"
                        id="priceInput"
                        type="number"
                        placeholder="Enter price"
                        disabled={withVariant}
                        error={errors.price?.message}
                        {...register("price", {
                          setValueAs: setEmptyOrNumber,
                          validate: (v, fv) => {
                            const floatRegex = "^[0-9]{1,10}([.][0-9]{1,2})?$";
                            if (!fv.withVariant && !`${v}`.match(floatRegex)) {
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
                        disabled={withVariant}
                        placeholder="Enter product sku"
                        {...register("sku")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="card mb-3">
              <div className="card-header py-3 border-bottom">
                <h5 className="mb-0">Product description</h5>
              </div>
              <div className="card-body p-0">
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <DynamicEditor
                        id="descriptionInput"
                        placeholder="Enter product description..."
                        minHeight={380}
                        value={field.value}
                        iframeEmbed
                        noBorder
                        onEditorChange={(v) => {
                          setValue("description", v);
                        }}
                      />
                    );
                  }}
                />
              </div>
            </div>

            <div ref={imagesRef} className="card">
              <div className="card-header py-3 border-bottom">
                <h5 className="mb-0">Images</h5>
              </div>
              <div className="card-body">
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
                            src={img.name ?? "/images/placeholder.jpeg"}
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
                            <RiDeleteBin6Line size={18} />
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
                          <RiAddLine
                            size={44}
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
              <div className="card-footer py-3">
                <span className="text-muted">
                  Product image can upload up to <strong>5</strong> images with
                  size constraint of at most <strong>360KB</strong> each.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal id="optionEditModal" show={showOptionModal} variant="large">
        {(isShown) => {
          if (!isShown) {
            return <></>;
          }

          const attributes = [...(getValues("attributes") ?? [])];

          attributes.forEach((a) => {
            a.values = variantsField.fields
              .flatMap((v) => v.attributes)
              .filter((va) => va.attribute === a.name)
              .sort((f, s) => f.sort - s.sort)
              .map((va) => va.value)
              .filter((v, i, array) => array.indexOf(v) === i)
              .map((v, i) => ({ value: v, sort: i }));
          });

          return (
            <OptionEdit
              attributes={attributes}
              handleClose={(list) => {
                if (list) {
                  setValue("attributes", list);

                  // setValue(
                  //   "variants",
                  //   list.length > 0 ? generateVariant(list, 0) : [],
                  //   {
                  //     shouldDirty: true
                  //   }
                  // );
                  const variants =
                    list.length > 0 ? generateVariant(list, 0) : [];
                  variantsField.replace(variants);
                  clearErrors("variants");
                }

                setShowOptionModal(false);
              }}
            />
          );
        }}
      </Modal>

      <Modal id="varientEditModal" show={showVariantModal} variant="large">
        {(isShown) => {
          if (!isShown || !productEdit.id) {
            return <></>;
          }

          const p = { ...getValues() };

          return (
            <ProductvariantEdit
              product={product!}
              handleSave={(variant) => {
                variantsField.append(variant);
                setShowVariantModal(false);
              }}
              close={() => setShowVariantModal(false)}
            />
          );
        }}
      </Modal>

      <ConfirmModal
        message="Are you sure to delete?"
        show={confirmDelete}
        close={() => setConfirmDelete(false)}
        onConfirm={async () => {
          executeDelete();
        }}
      />
    </>
  );
}

export default withAuthentication(ProductEdit);
