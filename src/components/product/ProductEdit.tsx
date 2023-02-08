import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FormikErrors, useFormik } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
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
import { parseErrorResponse } from "../../common/utils";
import {
  getProductBySlug,
  ProductQuery,
  saveProduct
} from "../../services/ProductService";
import Dropdown from "../Dropdown";
import { AutocompleteSelect, Input, TagInput } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import Loading from "../Loading";
import Modal from "../Modal";
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
  productSlug?: string;
  onPopBack?: () => void;
}

function ProductEdit({ shop, productSlug, onPopBack }: ProductEditProps) {
  const { mutate } = useSWRConfig();

  const [fetching, setFetching] = useState(productSlug !== "new");
  const [editorHeight, setEditorHeight] = useState(300);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  //const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [imageCount, setImageCount] = useState(0);
  const [variantErrors, setVariantErrors] =
    useState<({ price: string } | undefined)[]>();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { categories } = useCategories(false);

  const formik = useFormik<Product>({
    initialValues: {
      shopId: shop.id
    },
    enableReinitialize: true,
    validate: async (values) => {
      const errors: FormikErrors<Product> = {};
      const floatRegex = "^([0-9]*[.])?[0-9]+$";

      if (!values.name || values.name.trim().length === 0) {
        errors.name = "Please enter product name";
      }

      // if (!values.slug || values.slug.trim().length === 0) {
      //   errors.slug = "Please enter product slug";
      // } else {
      //   try {
      //     if (await existsProductBySlug(values.slug)) {
      //       errors.slug = "Product slug already in use";
      //     }
      //   } catch (error) {
      //     errors.slug = "Error checking, please try again";
      //   }
      // }

      if ((values.images?.filter((img) => !img.deleted).length ?? 0) === 0) {
        errors.images = "At least one image required";
      }

      if (!values.withVariant && !`${values.price}`.match(floatRegex)) {
        errors.price = "Invalid price input";
      }

      let hasVariantErrors = false;
      const variantErrors = [] as ({ price: string } | undefined)[];

      if (
        values.withVariant &&
        (values.variants?.filter((v) => !v.deleted).length ?? 0) === 0
      ) {
        errors.variants = "At least one variant required";
      } else {
        values.variants?.forEach((v, i) => {
          if (!v.price || !`${v.price}`.match(floatRegex)) {
            variantErrors.push({
              price: "Invalid price input"
            });
            hasVariantErrors = true;
          } else {
            variantErrors.push(undefined);
          }
        });
      }

      if (hasVariantErrors) {
        setVariantErrors(variantErrors);
        errors.variants = "";
      } else {
        setVariantErrors(undefined);
      }

      return errors;
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      executeSave(values);
    }
  });

  useEffect(() => {
    if (
      !productSlug ||
      productSlug.trim().length === 0 ||
      productSlug === "new"
    ) {
      return;
    }

    if (!categories) {
      return;
    }

    getProductBySlug(productSlug)
      .then((p) => {
        formik.setValues({
          ...p,
          shopId: p.shop?.id,
          categoryId: p.category?.id,
          discountId: p.discount?.id
        });
        //setWithVariant(!!p.variants && p.variants.length > 0);
      })
      .catch((error) => {
        const msg = parseErrorResponse(error);
      })
      .finally(() => {
        setFetching(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug, categories]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files.length > 0) {
      let file = files[0];
      const fileSize = file.size / (1024 * 1024);

      const image: ProductImage = {
        file: file
      };

      //props.setFieldValue?.(`${name}Image`, file);

      if (fileSize <= 0.512) {
        var reader = new FileReader();
        reader.onload = function (e) {
          if (e.target?.result && typeof e.target.result === "string") {
            image.name = e.target?.result;
            const images = formik.values.images ?? [];
            images.push(image);
            formik.setFieldValue("images", images);
            setImageCount(images.filter((img) => !img.deleted).length);
          }

          //props.setFieldValue?.(name, e.target?.result);
        };
        reader.readAsDataURL(file);
      }
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
      mutate(["/products", { "shop-id": values.shopId } as ProductQuery]);
      onPopBack?.();
    } catch (error) {
      const msg = parseErrorResponse(error);
      console.log(msg);
    } finally {
      formik.setSubmitting(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-3">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
          }
        }}
      >
        <div className="header-bar">
          <div className="container py-4">
            <div className="hstack">
              <div>
                <h3 className="fw-bold">
                  {!formik.values.id ? "Create" : "Update"} Product
                </h3>
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link href="/shops">
                        <a className="">Shops</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a
                        href="#"
                        className=""
                        onClick={(evt) => {
                          evt.preventDefault();
                          onPopBack?.();
                        }}
                      >
                        {shop.name}
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {!formik.values.id ? "Create" : "Update"} Product
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="ms-auto">
                <Dropdown
                  toggle={
                    <button
                      type="button"
                      className="btn btn-accent dropdown-toggle py-2 px-3 ms-2"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Save as
                    </button>
                  }
                  className="dropdown-menu-end"
                >
                  <li
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      formik
                        .setFieldValue("status", "DRAFT")
                        .then((v) => {
                          formik.submitForm();
                        })
                        .catch((error) => {});
                    }}
                  >
                    Draft
                  </li>
                  <li
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      formik
                        .setFieldValue("status", "PUBLISHED")
                        .then((v) => {
                          formik.submitForm();
                        })
                        .catch((error) => {});
                    }}
                  >
                    Published
                  </li>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-4">
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
                      name="name"
                      type="text"
                      placeholder="Enter product name"
                      value={formik.values.name ?? ""}
                      onChange={(evt) => {
                        // const slug = evt.target.value
                        //   .replace(/\s+/g, "-")
                        //   .toLowerCase();
                        // formik.setFieldValue?.("slug", slug);
                        formik.handleChange(evt);
                      }}
                      error={formik.errors.name}
                    />
                  </div>

                  <div className="col-lg-6">
                    {/* <Input
                      label="Slug *"
                      id="slugInput"
                      name="slug"
                      type="text"
                      placeholder="slug"
                      value={formik.values.slug ?? ""}
                      onChange={formik.handleChange}
                      error={formik.errors.slug}
                    /> */}
                    <label className="form-label">Category *</label>
                    <AutocompleteSelect<Category, number>
                      options={categories ?? []}
                      defaultValue={formik.values.category}
                      getOptionLabel={(v) => v.name}
                      getOptionKey={(v) => v.id}
                      getNestedData={(v) => v.children}
                      canSelect={(v) => !v.children || v.children?.length === 0}
                      onChange={(v) => {
                        formik.setFieldValue("category", v);
                        formik.setFieldValue("categoryId", v.id);
                      }}
                    />
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-lg-6 order-2 order-lg-1 vstack">
                    <label className="form-label">Description</label>
                    <div
                      className="flex-grow-1"
                      ref={(e) => {
                        const h = e?.clientHeight ?? 300;
                        setEditorHeight(h > 250 ? h : 300);
                      }}
                    >
                      <DynamicEditor
                        id="descriptionInput"
                        placeholder="Enter product description..."
                        minHeight={editorHeight}
                        value={formik.values.description ?? ""}
                        onEditorChange={(v) => {
                          formik.setFieldValue("description", v);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 order-1 order-lg-2">
                    <div className="vstack">
                      <div>
                        <Input
                          label="Brand name"
                          id="brandInput"
                          name="brand"
                          type="text"
                          placeholder="Enter brand name"
                          value={formik.values.brand ?? ""}
                          onChange={formik.handleChange}
                          error={formik.errors.brand}
                        />
                      </div>

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
                  {!formik.values.id && (
                    <div className="col-auto">
                      <div className="form-check form-switch">
                        <input
                          id="variantCheck"
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          name="withVariant"
                          checked={formik.values.withVariant ?? false}
                          onChange={(evt) => {
                            formik.handleChange(evt);
                            if (!evt.target.checked) {
                              formik.setFieldValue("variants", undefined);
                              setOptions([]);
                              formik.setFieldValue("stockLeft", undefined);
                            } else {
                              formik.setFieldValue("price", undefined);
                              formik.setFieldValue("sku", undefined);
                              formik.setFieldValue("stockLeft", undefined);
                            }
                          }}
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
                        name="newArrival"
                        checked={formik.values.newArrival ?? false}
                        onChange={formik.handleChange}
                      ></input>
                      <label
                        htmlFor="newArrivalCheck"
                        className="form-check-label fw-medium"
                      >
                        New arrival
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {formik.values.withVariant && (
              <div className="card shadow-sm">
                <div className="card-header bg-white py-3 px-md-4">
                  <div className="hstack justify-content-between">
                    <h5 className="mb-0">Variants</h5>
                    {!formik.values.id ? (
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
                        {formik.values.variants &&
                          formik.values.variants.map((v, i) => {
                            if (v.deleted) {
                              return null;
                            }
                            return (
                              <tr key={i}>
                                <td className="ps-3 ps-md-4 w-100">
                                  <span className="text-nowrap me-3">
                                    {v.title}
                                  </span>
                                </td>
                                <td className="align-top">
                                  <Input
                                    name={`variants[${i}].price`}
                                    type="text"
                                    placeholder="Enter variant price"
                                    height={40}
                                    value={
                                      formik.values.variants?.[i].price ?? ""
                                    }
                                    onChange={formik.handleChange}
                                    error={variantErrors?.[i]?.price}
                                  />
                                </td>
                                <td className="align-top">
                                  <Input
                                    name={`variants[${i}].sku`}
                                    type="text"
                                    placeholder="Enter variant sku"
                                    height={40}
                                    value={
                                      formik.values.variants?.[i].sku ?? ""
                                    }
                                    onChange={formik.handleChange}
                                  />
                                </td>
                                <td className="align-top">
                                  <Input
                                    name={`variants[${i}].stockLeft`}
                                    type="text"
                                    placeholder="Enter stock amount"
                                    height={40}
                                    value={
                                      formik.values.variants?.[i].stockLeft ??
                                      ""
                                    }
                                    onChange={(evt) => {
                                      const value = evt.target.value;
                                      if (
                                        value.trim().length > 0 &&
                                        !isNaN(parseInt(value))
                                      ) {
                                        formik.setFieldValue(
                                          evt.target.name,
                                          parseInt(evt.target.value)
                                        );
                                      } else {
                                        formik.setFieldValue(
                                          evt.target.name,
                                          undefined
                                        );
                                      }
                                    }}
                                  />
                                </td>
                                <td>
                                  <div
                                    role="button"
                                    className="link-danger"
                                    onClick={() => {
                                      const ary = formik.values.variants ?? [];
                                      if ((v.id ?? 0) > 0) {
                                        const old = ary[i];
                                        ary[i] = { ...old, deleted: true };
                                      } else {
                                        ary?.splice(i, 1);
                                      }

                                      formik.setFieldValue("variants", ary);
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

                  {formik.errors.variants && (
                    <div className="text-danger medium px-3 pb-3 px-md-4 pb-md-4">
                      {formik.errors.variants}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!formik.values.withVariant && (
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
                        name="price"
                        type="text"
                        placeholder="Enter price"
                        value={formik.values.price ?? ""}
                        onChange={formik.handleChange}
                        error={formik.errors.price}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        label="SKU"
                        id="skuInput"
                        name="sku"
                        type="text"
                        placeholder="Enter product sku"
                        value={formik.values.sku ?? ""}
                        onChange={formik.handleChange}
                        error={formik.errors.sku}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        label="Stock *"
                        id="stockInput"
                        name="stockLeft"
                        type="text"
                        placeholder="Enter stock amount"
                        value={formik.values.stockLeft ?? ""}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          if (
                            value.trim().length > 0 &&
                            !isNaN(parseInt(value))
                          ) {
                            formik.setFieldValue(
                              evt.target.name,
                              parseInt(evt.target.value)
                            );
                          } else {
                            formik.setFieldValue(evt.target.name, undefined);
                          }
                        }}
                        error={formik.errors.stockLeft}
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

            <div className="card shadow-sm">
              <div className="card-header bg-white py-3 px-md-4 border-bottom">
                <h5 className="mb-0">Images</h5>
              </div>
              <div className="card-body p-md-4">
                {formik.errors.images && (
                  <div className="text-danger mb-3">{formik.errors.images}</div>
                )}
                <div className="d-flex flex-wrap gap-3">
                  {formik.values.images
                    ?.filter((v) => !v.deleted)
                    .map((v, i) => {
                      return (
                        <div key={i} className="position-relative">
                          <Image
                            src={v.name ?? "/images/placeholder.jpeg"}
                            width={150}
                            height={150}
                            alt=""
                            objectFit="contain"
                            className="rounded border"
                          />
                          <div className="hstack justify-content-center">
                            <div className="form-check">
                              <input
                                id={`thumbnail[${i}]Check`}
                                className="form-check-input"
                                type="radio"
                                name={`images[${i}].thumbnail`}
                                checked={
                                  formik.values.images?.[i].thumbnail ?? false
                                }
                                onChange={(evt) => {
                                  const images = formik.values.images ?? [];
                                  images.forEach((img, j) => {
                                    if (i !== j) {
                                      img.thumbnail = false;
                                    } else {
                                      img.thumbnail = evt.target.checked;
                                    }
                                  });
                                  formik.setFieldValue("images", [...images]);
                                }}
                              ></input>
                              <label
                                htmlFor={`thumbnail[${i}]Check`}
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
                              if (v.id && v.id > 0) {
                                const old = formik.values.images![i];
                                old.deleted = true;
                                old.thumbnail = false;
                                formik.setFieldValue(`images[${i}]`, old);
                              } else {
                                formik.values.images?.splice(i, 1);
                                formik.setFieldValue(
                                  `images`,
                                  formik.values.images
                                );
                              }

                              setImageCount(
                                formik.values.images?.filter(
                                  (img) => !img.deleted
                                ).length ?? 0
                              );
                            }}
                          >
                            <TrashIcon width={18} />
                          </button>
                        </div>
                      );
                    })}
                  {imageCount <= 5 && (
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
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  className="d-none"
                  accept="image/x-png,image/jpeg"
                  onChange={handleImageChange}
                />
              </div>
              <div className="card-footer px-4 py-3">
                <span className="text-muted">
                  Product image can upload up to <strong>5</strong> images with
                  size constraint of at most <strong>512KB</strong> each.
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
                    name="video"
                    type="text"
                    placeholder="Enter youtube ID"
                    value={formik.values.videoId ?? ""}
                    onChange={formik.handleChange}
                    error={formik.errors.videoId}
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
                  setVariantErrors(undefined);

                  formik.setFieldValue(
                    "variants",
                    list.length > 0 ? generateVariant(list, 0, "") : []
                  );

                  formik.errors.variants = undefined;
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
          isShown && formik.values.id ? (
            <VaraintEdit
              product={formik.values}
              handleClose={(value) => {
                if (value) {
                  const variants = [...(formik.values.variants ?? []), value];
                  formik.setFieldValue("variants", variants);
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
