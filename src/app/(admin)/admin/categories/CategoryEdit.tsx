"use client";
/* eslint-disable @next/next/no-img-element */
import { useCategories } from "@/common/hooks";
import makeApiRequest from "@/common/makeApiRequest";
import { Category, CategoryForm } from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrString,
  setStringToSlug,
  validateResponse
} from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import ProgressButton from "@/components/ProgressButton";
import { AutocompleteSelect, Input } from "@/components/forms";
import { getCategoryById } from "@/services/CategoryService";
import { RiAddLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

const saveCategory = async (values: CategoryForm) => {
  const url = `/admin/categories`;
  const data = new FormData();
  values.id && data.append("id", values.id.toString());
  data.append("slug", values.slug!);
  data.append("featured", values.featured ? "true" : "false");
  values.categoryId && data.append("categoryId", values.categoryId.toString());
  values.file && data.append("file", values.file);

  values.names?.forEach((n, i) => {
    data.append(`names[${i}].lang`, n.lang);
    n.name && data.append(`names[${i}].name`, n.name);
  });

  const resp = await makeApiRequest({
    url,
    options: {
      method: !!values.id ? "PUT" : "POST",
      body: data
    },
    authenticated: true
  });

  await validateResponse(resp);
};

function CategoryEdit({ id }: { id: number }) {
  const router = useRouter();

  const { categories } = useCategories(false);

  const { data, error, isLoading, mutate } = useSWR(
    `/admin/categories/${id}`,
    () => getCategoryById(id),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0
    }
  );

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<CategoryForm>({
    values: data
      ? data
      : {
          names: [{ lang: "en" }, { lang: "mm" }]
        }
  });

  const namesField = useFieldArray({
    control,
    name: "names",
    keyName: "vId"
  });

  const fileRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    let files = event.target.files;
    if (files && files.length > 0) {
      let file = files[0];
      setValue("file", file);

      var reader = new FileReader();
      reader.onload = function (e) {
        const result = e.target?.result;
        if (!result) {
          return;
        }
        setValue("image", result as string);
      };
      reader.readAsDataURL(file);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  const save = async (values: CategoryForm) => {
    try {
      await saveCategory({ ...values });
      toast.success("Category successfully saved!");
      if ((values.categoryId ?? 0) > 0) {
        router.replace(`/admin/categories/${values.categoryId}/list`);
      } else {
        router.replace("/admin/categories");
      }
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!data && id !== 0) {
    return <Alert message="Category not found" />;
  }

  const title = id > 0 ? "Update Category" : "Add Category";

  return (
    <div>
      <div>
        <h3 className="fw-semibold">{title}</h3>
        <nav aria-label="breadcrumb col-12">
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <Link href="/admin">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/admin/categories">Categories</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="row py-4">
        <div className="col-lg-7">
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              handleSubmit(async (data) => {
                await save(data);
              })();
            }}
          >
            <div className="card">
              <div className="card-body p-md-4">
                <div className="row g-4">
                  {namesField.fields.map((name, i) => {
                    return (
                      <div className="col-12" key={name.vId}>
                        <label className="form-label">Name *</label>
                        <div
                          className={`input-group ${
                            errors.names?.[i]?.name?.message
                              ? "has-validation"
                              : ""
                          }`}
                        >
                          <Input
                            className={`${errors.names?.[i]?.name?.message ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Enter localized category name"
                            {...register(`names.${i}.name`, {
                              required: "Please enter category name",
                              setValueAs: setEmptyOrString,
                              onChange: (evt) => {
                                if (name.lang == "en") {
                                  setValue(
                                    "slug",
                                    setStringToSlug(evt.target.value),
                                    {
                                      shouldValidate: !!errors.slug?.message
                                    }
                                  );
                                }
                              }
                            })}
                          />
                          <span
                            className="input-group-text"
                            style={{ width: 56 }}
                          >
                            {name.lang.toUpperCase()}
                          </span>

                          {errors.names?.[i]?.name?.message && (
                            <div className="invalid-feedback">
                              {errors.names?.[i]?.name?.message}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="col-lg-12">
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
                              placeholder="your-category-name"
                              value={field.value ?? ""}
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
                                process.env.REACT_APP_CONSUMER_URL
                              }/collections/${field.value ?? ""}`}</small>
                            )} */}
                          </>
                        );
                      }}
                    />
                  </div>

                  <div className="col-lg-12">
                    <label className="form-label">Parent Category</label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => {
                        return (
                          <AutocompleteSelect<Category, number>
                            defaultValue={field.value}
                            options={categories}
                            getOptionLabel={(v) => v.name}
                            getOptionKey={(v) => v.id}
                            skipOption={(v) => v.id === id}
                            onChange={(v) => {
                              setValue("category", v);
                              setValue("categoryId", v?.id);
                            }}
                            getNestedData={(v) => v.children}
                            formatSelectedOption={(v) => v.name}
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="col-auto">
                    <div className="form-check form-switch">
                      <input
                        id="featuredCheck"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        {...register("featured")}
                      ></input>
                      <label
                        htmlFor="featuredCheck"
                        className="form-check-label fw-medium"
                      >
                        Featured
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <label className="form-label">Image</label>
                    <div className="d-flex flex-wrap gap-2">
                      <div
                        role="button"
                        className="border rounded position-relative"
                        onClick={() => fileRef.current?.click()}
                      >
                        <RiAddLine
                          size={46}
                          className="position-absolute top-50 start-50 translate-middle text-muted"
                        />
                        <div className="ratio ratio-1x1" style={{ width: 120 }}>
                          <Controller
                            control={control}
                            name="image"
                            render={({ field }) => {
                              return field.value ? (
                                <img
                                  src={field.value}
                                  alt=""
                                  style={{ objectFit: "contain" }}
                                  className="rounded"
                                />
                              ) : (
                                <></>
                              );
                            }}
                          />
                        </div>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/x-png,image/jpeg"
                          className="d-none"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-end ">
                  <ProgressButton type="submit" loading={isSubmitting}>
                    Save
                  </ProgressButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(CategoryEdit, ["CATEGORY_WRITE"]);
