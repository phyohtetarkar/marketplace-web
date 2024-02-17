"use client";
/* eslint-disable @next/next/no-img-element */
import makeApiRequest from "@/common/makeApiRequest";
import { Banner, BannerForm } from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrString,
  validateResponse,
} from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import ProgressButton from "@/components/ProgressButton";
import { Input } from "@/components/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

const getBanner = async (id: number) => {
  if (!id) {
    return undefined;
  }

  const url = `/admin/banners/${id}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((v) => v as Banner)
    .catch((e) => undefined);
};

const saveBanner = async (values: BannerForm) => {
  const url = `/admin/banners`;

  const data = new FormData();
  values.id && data.append("id", values.id.toString());
  values.link && data.append("link", values.link);
  values.position && data.append("position", values.position.toString());
  values.image && data.append("image", values.image);
  values.file && data.append("file", values.file);
  const resp = await makeApiRequest({
    url,
    options: {
      method: !!values.id ? "PUT" : "POST",
      body: data,
    },
    authenticated: true,
  });

  await validateResponse(resp);
};

function BannerEdit({ id }: { id: number }) {
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/admin/banners/${id}`,
    () => getBanner(id),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
    }
  );

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<BannerForm>({ values: data ? data : {} });

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

  const save = async (values: BannerForm) => {
    try {
      await saveBanner({ ...values });
      toast.success("Banner successfully saved!");
      if (id > 0) {
        mutate();
      } else {
        router.replace("/admin/banners");
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
    return <Alert message="Banner not found" />;
  }

  const title = id > 0 ? "Update Banner" : "Add Banner";
  return (
    <>
      <div>
        <h3 className="fw-semibold mb-1">{title}</h3>
        <nav aria-label="breadcrumb col-12">
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <Link href="/admin">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/admin/banners">Banners</Link>
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
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-12">
                    <Input
                      label={
                        <>
                          Banner Link&nbsp;
                          <span className="text-muted">(Optional)</span>
                        </>
                      }
                      id="linkInput"
                      type="text"
                      placeholder="https://www.domain.com"
                      {...register("link", {
                        setValueAs: setEmptyOrString,
                      })}
                    />
                  </div>

                  <div className="col-lg-12">
                    <label className="form-label">Image</label>
                    <div
                      role="button"
                      className="border rounded position-relative"
                      onClick={() => {
                        fileRef.current?.click();
                      }}
                    >
                      <div className="position-absolute top-50 start-50 translate-middle">
                        Click here to choose
                      </div>
                      <div className="ratio ratio-21x9">
                        <Controller
                          control={control}
                          name="image"
                          rules={{
                            validate: (v) => {
                              if (!v) {
                                return "Banner image must not empty";
                              }
                            },
                          }}
                          render={({ field }) => {
                            return field.value ? (
                              <img
                                src={field.value}
                                alt="Banner"
                                style={{ objectFit: "cover" }}
                                className="rounded"
                              />
                            ) : (
                              <></>
                            );
                          }}
                        />
                      </div>
                    </div>
                    {errors.image?.message && (
                      <div className="text-danger small mt-1">
                        {errors.image.message}
                      </div>
                    )}
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
    </>
  );
}

export default withAuthorization(BannerEdit, ["BANNER_WRITE"]);
