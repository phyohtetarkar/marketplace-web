"use client";
import { Product, ProductImage } from "@/common/models";
import { parseErrorResponse } from "@/common/utils";
import ProgressButton from "@/components/ProgressButton";
import { updateProductImages } from "@/services/ProductService";
import {
  RiAddLine,
  RiCircleLine,
  RiDeleteBin6Line,
  RiRadioButtonLine
} from "@remixicon/react";
import { default as NextImage } from "next/image";
import { ChangeEvent, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

interface ProductEditProps {
  shopId: number;
  product: Product;
}

function ProductImagesUpdate(props: ProductEditProps) {
  const { shopId, product } = props;

  const { mutate } = useSWRConfig();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    clearErrors
  } = useForm({
    values: {
      images: product.images ?? []
    }
  });

  const imagesField = useFieldArray({
    control,
    name: "images",
    keyName: "vId",
    rules: {
      validate: (v) => {
        if (v.filter((img) => !img.deleted).length <= 0) {
          return "Required at least one image";
        }

        return true;
      }
    }
  });

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

  const executeSave = async (values: ProductImage[]) => {
    try {
      clearErrors();
      await updateProductImages(shopId, product.id, values);
      toast.success("Product saved");
      mutate(`/vendor/shops/${shopId}/products/${product.id}`);
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header border-bottom">
          <div className="hstack gap-3">
            <h5 className="mb-0">Images</h5>
            <ProgressButton
              className="ms-auto btn btn-primary"
              loading={isSubmitting}
              onClick={() => {
                handleSubmit((data) => executeSave(data.images))();
              }}
            >
              Save
            </ProgressButton>
          </div>
        </div>
        <div className="card-body">
          {errors.images?.root?.message && (
            <div className="text-danger mb-3">{errors.images.root.message}</div>
          )}
          <div className="d-flex flex-wrap gap-3">
            {imagesField.fields.map((img, index) => {
              if (img.deleted) {
                return null;
              }
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
                  <div
                    role="button"
                    className="hstack justify-content-center mt-1 gap-1"
                    onClick={() => {
                      const images = imagesField.fields.map((m, j) => {
                        return {
                          ...m,
                          thumbnail: index === j
                        };
                      });

                      imagesField.replace(images);
                    }}
                  >
                    {img.thumbnail ? (
                      <RiRadioButtonLine size={24} className="text-primary" />
                    ) : (
                      <RiCircleLine size={24} className="text-light-gray" />
                    )}
                    <span className="text-muted">Thumbnail</span>
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
                const list = field.value?.filter((img) => !img.deleted) ?? [];

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
            Product image can upload up to <strong>5</strong> images with size
            constraint of at most <strong>360KB</strong> each.
          </span>
        </div>
      </div>
    </>
  );
}

export default ProductImagesUpdate;
