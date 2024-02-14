"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SubscriptionPlan } from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrNumber,
  setEmptyOrString,
  validateResponse
} from "@/common/utils";
import { Input, Select } from "@/components/forms";
import ProgressButton from "@/components/ProgressButton";
import useSWR from "swr";
import makeApiRequest from "@/common/makeApiRequest";
import Link from "next/link";
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import { withAuthorization } from "@/common/withAuthorization";

const duration = [
  { value: 1, label: "1 day" },
  { value: 30, label: "30 days" },
  { value: 60, label: "60 days" },
  { value: 90, label: "90 days" }
];

const getSubscriptionPlan = async (id: number) => {
  if (!id) {
    return undefined;
  }
  const url = `/admin/subscription-plans/${id}`;
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((v) => v as SubscriptionPlan)
    .catch((e) => undefined);
};

const saveSubscriptionPlan = async (values: SubscriptionPlan) => {
  const url = `/admin/subscription-plans`;
  const resp = await makeApiRequest({
    url,
    options: {
      method: !!values.id ? "PUT" : "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true,
  });

  await validateResponse(resp);
};

function SubscriptionPlanEdit({ id }: { id: number }) {
  const router = useRouter();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/admin/subscription-plans/${id}`,
    () => getSubscriptionPlan(id),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0
    }
  );

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SubscriptionPlan>({
    values: data ?? {}
  });

  const save = async (values: SubscriptionPlan) => {
    try {
      await saveSubscriptionPlan(values);
      toast.success("Plan successfully saved!");
      if (id > 0) {
        mutate();
      } else {
        router.replace("/admin/settings/subscription-plans");
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
    return <Alert message="Subscription plan not found" />;
  }

  const title = id > 0 ? "Update Subscription Plan" : "Add Subscription Plan";

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
              <Link href="/admin/settings/subscription-plans" className="link-anchor">
                Subscription Plans
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
                  <div className="col-lg-6">
                    <Input
                      label="Title *"
                      placeholder="Enter plan title"
                      error={errors.title?.message}
                      {...register("title", {
                        setValueAs: setEmptyOrString,
                        required: "Please enter plan title"
                      })}
                    />
                  </div>

                  <div className="col-lg-6">
                    <Input
                      label="Price *"
                      placeholder="Enter price"
                      error={errors.price?.message}
                      {...register("price", {
                        validate: (v) => {
                          if (!v) {
                            return "Please enter price";
                          }
                          const floatRegex = "^([0-9]*[.])?[0-9]+$";
                          if (!`${v}`.match(floatRegex)) {
                            return "Invalid price input";
                          }
                          return true;
                        }
                      })}
                    />
                  </div>

                  <div className="col-lg-12">
                    <Select
                      label="Duration *"
                      className="form-select"
                      {...register("duration", {
                        required: "Please choose duration",
                        setValueAs: setEmptyOrNumber
                      })}
                    >
                      {duration.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </Select>
                    {errors.duration && (
                      <small className="text-danger">
                        {errors.duration.message}
                      </small>
                    )}
                  </div>

                  <div className="col-auto">
                    <div className="form-check form-switch">
                      <input
                        id="promoUseableCheck"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        {...register("promoUsable")}
                      ></input>
                      <label
                        htmlFor="promoUseableCheck"
                        className="form-check-label fw-medium"
                      >
                        Promo Useable
                      </label>
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
    </>
  );
}

export default withAuthorization(SubscriptionPlanEdit, ["SUBSCRIPTION_PLAN_WRITE"]);
