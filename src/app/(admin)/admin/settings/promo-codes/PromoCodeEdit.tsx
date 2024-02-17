"use client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ValueType, SubscriptionPromo } from "@/common/models";
import {
  generateUUID,
  parseErrorResponse,
  setEmptyOrNumber,
  setZeroOrNumber,
  validateResponse
} from "@/common/utils";
import { DatePickerInput2, Input, Select } from "@/components/forms";
import ProgressButton from "@/components/ProgressButton";
import Tooltip from "@/components/Tooltip";
import makeApiRequest from "@/common/makeApiRequest";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";
import { withAuthorization } from "@/common/withAuthorization";
import { RiRefreshLine } from "@remixicon/react";

const getPromoCode = async (id: number) => {
  if (!id) {
    return undefined;
  }
  const url = `/admin/subscription-promos/${id}`;
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((v) => v as SubscriptionPromo)
    .catch((e) => undefined);
};

const savePromoCode = async (values: SubscriptionPromo) => {
  const url = `/admin/subscription-promos`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: !values.id ? "POST" : "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
};

function PromoCodeEdit({ id }: { id: number }) {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/subscription-promos/${id}`,
    () => getPromoCode(id),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0
    }
  );

  useEffect(() => {
    dayjs.extend(utc);
  }, []);

  const {
    control,
    formState: { isSubmitting, errors },
    register,
    setValue,
    handleSubmit
  } = useForm<SubscriptionPromo>({
    values: data ?? {},
    defaultValues: {}
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!data && id !== 0) {
    return <Alert message="Promo code not found" />;
  }

  const title = id > 0 ? "Update Promo Code" : "Add Promo Code";

  return (
    <>
      <div>
        <h3 className="fw-semibold mb-1">{title}</h3>
        <nav aria-label="breadcrumb col-12">
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <Link href="/admin/settings" className="link-anchor">
                Settings
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/admin/settings/promo-codes" className="link-anchor">
                Promo Codes
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="row py-4">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body p-md-4">
              <div className="row g-4">
                <div className="col-lg-6">
                  <label className="form-label">Code *</label>
                  <div
                    className={`input-group ${
                      errors.code?.message ? "has-validation" : ""
                    }`}
                  >
                    <Input
                      id="codeInput"
                      type="text"
                      readonly
                      disabled={data?.used ?? false}
                      placeholder="Enter promo code"
                      className={`${errors.code?.message ? "is-invalid" : ""}`}
                      {...register("code", {
                        required: "Required promo code"
                      })}
                    />
                    {!data?.id && (
                      <div
                        className="input-group-text px-3"
                        role="button"
                        onClick={() => {
                          if (!data?.id) {
                            const code = `PROMO${generateUUID()
                              .substring(0, 8)
                              .toUpperCase()}`;
                            setValue("code", code);
                          }
                        }}
                      >
                        <Tooltip title="Generate">
                          <RiRefreshLine size={20} />
                        </Tooltip>
                      </div>
                    )}

                    {errors.code?.message && (
                      <div className="invalid-feedback">
                        {errors.code.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <label className="form-label">Expired Date *</label>
                  <Controller
                    control={control}
                    name="expiredAt"
                    rules={{
                      validate: (v) => (!v ? "Please select expire date" : true)
                    }}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <DatePickerInput2
                          placeholder="Select date time"
                          error={error?.message}
                          disabled={data?.used ?? false}
                          value={
                            field.value
                              ? dayjs(field.value).format("MMM DD, YYYY")
                              : ""
                          }
                          dates={
                            field.value ? [dayjs(field.value).toDate()] : []
                          }
                          mode="single"
                          dateFormat="M d, Y"
                          minDate={new Date()}
                          onDateChange={(values) => {
                            if (values.length === 0) {
                              return;
                            }

                            const d = values[0];
                            d.setHours(23, 59, 59);

                            // console.log(d.toISOString());
                            // console.log(d.getTime());

                            // console.log(
                            //   dayjs(d).utc().format("YYYY-MM-DD hh:mm A")
                            // );

                            setValue("expiredAt", d.getTime(), {
                              shouldValidate: true
                            });
                          }}
                        />
                      );
                    }}
                  />
                </div>

                <div className="col-lg-12">
                  <label className="form-label">Amount *</label>
                  <div
                    className={`input-group ${
                      errors.value?.message ? "has-validation" : ""
                    }`}
                  >
                    <Input
                      id="discountInput"
                      type="number"
                      placeholder="Enter discount amount"
                      disabled={data?.used ?? false}
                      className={`${errors.value?.message ? "is-invalid" : ""}`}
                      {...register("value", {
                        setValueAs: setEmptyOrNumber,
                        validate: (v, fv) => {
                          const floatRegex = "^[0-9]{1,10}([.][0-9]{1,2})?$";
                          if (!`${v}`.match(floatRegex)) {
                            return "Invalid amount";
                          }

                          if (fv.valueType === "PERCENTAGE" && (v ?? 0) > 100) {
                            return "Invalid amount";
                          }
                          return true;
                        }
                      })}
                    />
                    <div className="d-flex input-group-text border-0 p-0">
                      <Select
                        className="rounded-0 rounded-end"
                        disabled={data?.used ?? false}
                        {...register("valueType", {
                          setValueAs: (v) =>
                            !v ? undefined : (v as ValueType)
                        })}
                      >
                        <option value="FIXED_AMOUNT">.00</option>
                        <option value="PERCENTAGE">%</option>
                      </Select>
                    </div>

                    {errors.value?.message && (
                      <div className="invalid-feedback">
                        {errors.value.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <Input
                    label="Minimum Constraint"
                    id="minAmountInput"
                    type="number"
                    disabled={data?.used ?? false}
                    placeholder="Enter minimum useable amount"
                    {...register("minConstraint", {
                      setValueAs: setZeroOrNumber,
                      validate: (v, fv) => {
                        const floatRegex = "^[0-9]{1,10}([.][0-9]{1,2})?$";
                        if (!`${v}`.match(floatRegex)) {
                          return "Please enter minimum usable amount";
                        }
                        return true;
                      }
                    })}
                    error={errors.minConstraint?.message}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end ">
                <ProgressButton
                  loading={isSubmitting}
                  className="btn btn-primary"
                  disabled={data?.used ?? false}
                  onClick={() => {
                    handleSubmit(async (data) => {
                      try {
                        await savePromoCode(data);
                        toast.success("Promo code saved");
                        if (id > 0) {
                          mutate();
                        } else {
                          router.replace("/admin/settings/promo-codes");
                        }
                      } catch (error) {
                        const msg = parseErrorResponse(error);
                        toast.error(msg);
                      }
                    })();
                  }}
                >
                  Save
                </ProgressButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthorization(PromoCodeEdit, ["PROMO_CODE_WRITE"]);
