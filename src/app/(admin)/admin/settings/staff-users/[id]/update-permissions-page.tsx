"use client";
import { permissionGroup } from "@/common/app.config";
import makeApiRequest from "@/common/makeApiRequest";
import { Permission, User } from "@/common/models";
import { parseErrorResponse, validateResponse } from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import ProgressButton from "@/components/ProgressButton";
import Link from "next/link";
import { useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

const getUserById = async (userId: number) => {
  const url = `/admin/users/${userId}`;
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((json) => json as User)
    .catch((e) => undefined);
};

const updatePermissions = async (
  userId: number,
  permissions: Set<Permission>
) => {
  const url = `/admin/staff-users/${userId}/permissions`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: JSON.stringify(Array.from(permissions)),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
};

function UpdatePermissionsPage({ userId }: { userId: number }) {
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/users/${useId}`,
    () => getUserById(userId),
    {
      revalidateOnFocus: false
    }
  );

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
  } = useForm({
    values: {
      permissions: new Set<Permission>()
    }
  });

  useEffect(() => {
    if (data) {
      setValue("permissions", new Set(data.permissions ?? []));
    }
  }, [data, setValue]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!data) {
    return <Alert message="User not found" />;
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="fw-semibold mb-1">Update permissions</h3>
        <nav aria-label="breadcrumb col-12">
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <Link href="/admin/settings" className="link-anchor">
                Settings
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/admin/settings/staff-users" className="link-anchor">
                Staff users
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {data.name}
            </li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <div className="row g-4">
                <div className="col-12">
                  <h4 className="mb-3">Permissions</h4>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {permissionGroup.map((g, i) => {
                      return (
                        <div key={i} className="col">
                          <div className="text-uppercase small border-bottom pb-2 mb-3">
                            {g.name}
                          </div>
                          <div className="vstack gap-2">
                            {g.permissions.map((p, i) => {
                              const key = `${g.name}_${p}`
                                .replace(/\s+/, "_")
                                .toUpperCase() as Permission;
                              return (
                                <Controller
                                  key={i}
                                  control={control}
                                  name="permissions"
                                  render={({ field }) => {
                                    return (
                                      <div className="form-check">
                                        <input
                                          id={key}
                                          className="form-check-input"
                                          type="checkbox"
                                          name={key}
                                          checked={field.value.has(key)}
                                          onChange={(evt) => {
                                            const isChecked =
                                              evt.target.checked;
                                            const permissions = new Set(
                                              field.value
                                            );
                                            if (isChecked) {
                                              permissions.add(key);
                                            } else {
                                              permissions.delete(key);
                                            }
                                            setValue(
                                              `permissions`,
                                              permissions
                                            );
                                          }}
                                        ></input>
                                        <label
                                          htmlFor={key}
                                          className="form-check-label"
                                        >
                                          {p}
                                        </label>
                                      </div>
                                    );
                                  }}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer py-3">
              <div className="hstack">
                <ProgressButton
                  type="submit"
                  loading={isSubmitting}
                  onClick={() => {
                    handleSubmit(async (values) => {
                      try {
                        await updatePermissions(userId, values.permissions);
                        mutate();
                        toast.success("User permissions updated");
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

export default withAuthorization(UpdatePermissionsPage, []);
