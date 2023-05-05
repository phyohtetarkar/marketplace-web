import { useEffect, useState } from "react";
import { useCities } from "../../common/hooks";
import { City } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import Alert from "../Alert";
import Loading from "../Loading";
import ProgressButton from "../ProgressButton";

interface DeliveryCityChoiceProps {
  cities: City[];
  handleChoose?: (cities: City[]) => Promise<void>;
  close?: () => void;
}

function DeliveryCityChoice(props: DeliveryCityChoiceProps) {
  const { cities, handleChoose, close } = props;

  const [isSubmitting, setSubmitting] = useState(false);

  const [selectAll, setSelectAll] = useState<boolean>();

  const [selectedMap, setSelectedMap] = useState(
    new Map(cities.map((c) => [c.id, c.name]))
  );

  const citiesState = useCities();

  useEffect(() => {
    if (selectAll === true) {
      citiesState.cities &&
        setSelectedMap(new Map(citiesState.cities.map((c) => [c.id, c.name])));
    } else if (selectAll === false) {
      setSelectedMap(new Map<number, string>());
    }
  }, [selectAll, citiesState.cities]);

  const content = () => {
    if (citiesState.isLoading) {
      return <Loading />;
    }

    if (citiesState.error) {
      return (
        <Alert
          message={parseErrorResponse(citiesState.error)}
          variant="danger"
        />
      );
    }

    var list = citiesState.cities ?? [];

    return (
      <div className="vstack gap-2">
        {list
          .sort((f, s) => f.name.localeCompare(s.name))
          .map((c) => {
            return (
              <div key={c.id} className="form-check">
                <input
                  id={`cityCheck${c.id}`}
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  disabled={isSubmitting}
                  checked={selectedMap.has(c.id)}
                  onChange={(evt) => {
                    setSelectedMap((old) => {
                      const copy = new Map(old);
                      if (evt.target.checked) {
                        copy.set(c.id, c.name);
                      } else {
                        copy.delete(c.id);
                      }
                      return copy;
                    });
                  }}
                ></input>
                <label
                  htmlFor="codCheck"
                  className="form-check-label fw-medium"
                >
                  {c.name}
                </label>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <div className="modal-header">
        <div className="hstack">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              disabled={
                isSubmitting || citiesState.isLoading || citiesState.error
              }
              checked={selectAll ?? false}
              onChange={(evt) => {
                setSelectAll(evt.target.checked);
              }}
            ></input>
          </div>
          <h4 className="modal-title">Delivery cities</h4>
        </div>
        <button
          type="button"
          className="btn-close shadow-none"
          aria-label="Close"
          onClick={close}
        ></button>
      </div>
      <div className="modal-body">{content()}</div>
      <div className="modal-footer">
        <ProgressButton
          loading={isSubmitting}
          disabled={selectedMap.size <= 0}
          onClick={async () => {
            setSubmitting(true);
            var selectedCities = Array.from(
              selectedMap,
              ([id, name]) => ({ id, name } as City)
            );
            await handleChoose?.(selectedCities);
            setSubmitting(false);
          }}
        >
          Save
        </ProgressButton>
      </div>
    </>
  );
}

export default DeliveryCityChoice;
