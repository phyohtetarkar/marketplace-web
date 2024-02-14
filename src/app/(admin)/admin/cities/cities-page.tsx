"use client";
import makeApiRequest from "@/common/makeApiRequest";
import { City } from "@/common/models";
import { parseErrorResponse, validateResponse } from "@/common/utils";
import { hasAccess, withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiDeleteBinLine,
  RiPencilFill
} from "@remixicon/react";
import { useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import CityEdit from "./CityEdit";
import { AuthenticationContext } from "@/common/contexts";

const getCities = async () => {
  const url = "/admin/cities";
  const resp = await makeApiRequest({ url, authenticated: true });
  await validateResponse(resp);
  return resp.json() as Promise<City[]>;
};

const deleteCity = async (id: number) => {
  const url = `/admin/cities/${id}`;
  const resp = await makeApiRequest({
    url,
    options: { method: "DELETE" },
    authenticated: true
  });
  await validateResponse(resp);
};

function CityPage() {
  const { user } = useContext(AuthenticationContext);

  const [showConfirm, setShowConfirm] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [city, setCity] = useState<City>();

  const [nameAscending, setNameAscending] = useState<boolean>(true);

  const { write, del } = useMemo(() => {
    return {
      write: hasAccess(["CITY_WRITE"], user),
      del: hasAccess(["CITY_WRITE"], user)
    };
  }, [user]);

  const { data, error, isLoading, mutate } = useSWR("/cities", getCities, {
    revalidateOnFocus: false
  });

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data || data.length === 0) {
      return <Alert message="No cities found" variant="info" />;
    }

    return (
      <>
        <div className="table-responsive py-1 scrollbar-custom">
          <table className="table align-middle">
            <thead className="text-nowrap align-middle">
              <tr>
                <th scope="col" style={{ minWidth: 400 }}>
                  <div className="hstack gap-2">
                    NAME
                    <div
                      role="button"
                      className="text-primary"
                      onClick={() => setNameAscending((old) => !old)}
                    >
                      {nameAscending ? (
                        <RiArrowUpLine size={20} />
                      ) : (
                        <RiArrowDownLine size={20} />
                      )}
                    </div>
                  </div>
                </th>
                <th scope="col" style={{ minWidth: 200 }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.sort((f, s) => {
                  if (nameAscending === undefined) {
                    return s.id - f.id;
                  }

                  return nameAscending
                    ? f.name.localeCompare(s.name)
                    : s.name.localeCompare(f.name);
                })
                .map((c, i) => {
                  return (
                    <tr key={c.id}>
                      <th scope="row" className="w-100 py-3">
                        {c.name}
                      </th>
                      <td>
                        <div className="hstack align-items-center gap-2">
                          {write && (
                            <button
                              className="btn btn-default"
                              onClick={() => {
                                setCity(c);
                                setShowEdit(true);
                              }}
                            >
                              <RiPencilFill size={20} />
                            </button>
                          )}
                          {del && (
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setCity(c);
                                setShowConfirm(true);
                              }}
                            >
                              <RiDeleteBinLine size={20} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-auto me-auto">
          <h2 className="mb-0">Cities</h2>
        </div>

        <div className="col-auto hstack">
          {write && (
            <button
              className="btn btn-primary align-self-center text-nowrap"
              onClick={() => {
                setCity({ id: 0, name: "" });
                setShowEdit(true);
              }}
            >
              Add new
            </button>
          )}
        </div>
      </div>

      {content()}

      <ConfirmModal
        show={showConfirm}
        message="Are you sure to delete?"
        onConfirm={async () => {
          try {
            if (!city) {
              return;
            }
            await deleteCity(city.id);
            mutate();
            toast.success("City deleted successfully");
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error("Delete failed");
          } finally {
            setCity(undefined);
          }
        }}
        close={() => {
          setShowConfirm(false);
          setCity(undefined);
        }}
      />

      <Modal id="editModal" show={showEdit} onHidden={() => setCity(undefined)}>
        {(isShown) => {
          return isShown && city ? (
            <CityEdit
              city={city}
              handleClose={(reload) => {
                setShowEdit(false);
                if (reload) {
                  mutate();
                }
              }}
            />
          ) : (
            <></>
          );
        }}
      </Modal>
    </div>
  );
}

export default withAuthorization(CityPage, ["CITY_READ", "CITY_WRITE"]);
