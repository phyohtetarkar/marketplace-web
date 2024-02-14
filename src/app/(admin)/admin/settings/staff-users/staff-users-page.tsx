"use client";
import { AuthenticationContext } from "@/common/contexts";
import makeApiRequest from "@/common/makeApiRequest";
import { PageData, User } from "@/common/models";
import {
  buildQueryParams,
  parseErrorResponse,
  validateResponse
} from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { RiDeleteBinLine, RiPencilFill } from "@remixicon/react";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export interface UserQuery {
  name?: string;
  phone?: string;
  email?: string;
  "staff-only"?: boolean;
  page?: number;
}

const getUsers = async (query: UserQuery) => {
  const q = buildQueryParams({ ...query });
  const url = `/admin/users${q}`;
  const resp = await makeApiRequest({ url, authenticated: true });
  await validateResponse(resp);
  return resp.json() as Promise<PageData<User>>;
};

const removeStaffUser = async (userId: number) => {
  const url = `/admin/staff-users/${userId}/dismiss-admin`;
  const resp = await makeApiRequest({
    url,
    options: { method: "PUT" },
    authenticated: true
  });
  await validateResponse(resp);
};

function StaffUsersPage() {
  const { user } = useContext(AuthenticationContext);

  const { write } = useMemo(() => {
    return {
      write: user?.role === "OWNER"
    };
  }, [user]);

  const [showRemoveConfrim, setShowRemoveConfirm] = useState(false);

  const [staff, setStaff] = useState<User>();

  const [query, setQuery] = useState<UserQuery>({
    "staff-only": true
  });

  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/staff-users", query],
    ([url, q]) => getUsers(q),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (data?.totalElements === 0) {
      return <Alert message="No users found" variant="info" />;
    }

    return (
      <>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="text-nowrap align-middle">
              <tr>
                <th scope="col" style={{ minWidth: 300 }}>
                  NAME
                </th>
                <th scope="col" style={{ minWidth: 200 }}>
                  EMAIL
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  PHONE
                </th>
                <th scope="col" style={{ minWidth: 100 }}>
                  ROLE
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.contents?.map((u, i) => (
                <tr key={u.id}>
                  <th scope="row" className="py-3">
                    {u.name}
                  </th>
                  <td>{u.email ?? ""}</td>
                  <td>{u.phone ?? ""}</td>
                  <td>{u.role}</td>
                  <td>
                    {write && u.id !== u?.id && u.role !== "OWNER" && (
                      <div className="hstack gap-2">
                        <Link
                          href={`/admin/settings/staff-users/${u.id}`}
                          className="btn btn-default"
                        >
                          <RiPencilFill size={20} />
                        </Link>
                        <div
                          role={"button"}
                          className="btn btn-danger"
                          onClick={() => {
                            setStaff(u);
                            setShowRemoveConfirm(true);
                          }}
                        >
                          <RiDeleteBinLine size={20} />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end pt-3 mb-5">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={(p) => {
              setQuery((old) => {
                return { ...old, page: p };
              });
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row mb-4 g-3">
        <div className="col-auto me-auto">
          <h3 className="fw-semibold mb-1">Staff Users</h3>
          <nav aria-label="breadcrumb col-12">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <Link href="/admin/settings" className="link-anchor">
                  Settings
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Staffs
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {content()}

      <ConfirmModal
        show={showRemoveConfrim}
        message={`Are you sure to remove user: ${staff?.name}?`}
        close={() => {
          setShowRemoveConfirm(false);
        }}
        onHidden={() => {
          setStaff(undefined);
        }}
        onConfirm={async () => {
          try {
            if (!staff) {
              throw "Unauthorized";
            }
            await removeStaffUser(staff.id);
            mutate();
            toast.success("Staff user removed");
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />
    </>
  );
}

export default withAuthorization(StaffUsersPage, []);
