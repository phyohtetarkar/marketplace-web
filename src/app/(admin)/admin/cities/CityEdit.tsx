import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { City } from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrString,
  validateResponse,
} from "@/common/utils";
import Alert from "@/components/Alert";
import { Input } from "@/components/forms";
import ProgressButton from "@/components/ProgressButton";
import makeApiRequest from "@/common/makeApiRequest";

const saveCity = async (values: City) => {
  const url = "/admin/cities";
  const resp = await makeApiRequest({
    url,
    options: {
      method: !!values.id ? "PUT" : "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    },
    authenticated: true,
  });

  await validateResponse(resp);
};

interface CityEditProps {
  city: City;
  handleClose?: (reload?: boolean) => void;
}

function CityEdit(props: CityEditProps) {
  const { city, handleClose } = props;

  const [error, setError] = useState<string>();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<City>({ values: city });

  const executeSave = async (value: City) => {
    try {
      setError(undefined);
      await saveCity(value);
      toast.success("City saved successfully");
      handleClose?.(true);
    } catch (error) {
      const msg = parseErrorResponse(error);
      setError(msg);
    }
  };

  return (
    <>
      <div className="modal-header">
        <h4 className="modal-title">{city.id > 0 ? "Update" : "Add"} City</h4>
        <button
          type="button"
          className="btn-close shadow-none"
          aria-label="Close"
          onClick={() => handleClose?.()}
        ></button>
      </div>
      <div className="modal-body">
        {error && <Alert message={error} variant="danger" />}
        <div className="row g-3">
          <div className="col-12">
            <Input
              label="Name *"
              id="accountTypeInput"
              type="text"
              placeholder="Enter city name"
              {...register("name", {
                setValueAs: setEmptyOrString,
                required: "Please enter city name",
              })}
              error={errors.name?.message}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <ProgressButton
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(async (data) => {
              await executeSave(data);
            })();
          }}
        >
          Save
        </ProgressButton>
      </div>
    </>
  );
}

export default CityEdit;
