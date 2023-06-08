import ReactSelect from "react-select";
import { formControlHeight, primaryColor } from "../common/app.config";
import { useDiscounts } from "../common/hooks";
import { Discount } from "../common/models";

interface DiscountSelectProps {
  shopId: number;
  value?: Discount;
  onChange?: (value?: Discount) => void;
}

function DiscountSelect(props: DiscountSelectProps) {
  const { shopId, value, onChange } = props;

  const { discounts, error, isLoading } = useDiscounts(shopId);

  return (
    <ReactSelect
      name="discounts"
      styles={{
        control: (css, state) => ({
          ...css,
          padding: "0 0.25rem",
          minHeight: formControlHeight,
          boxShadow: "none",
          backgroundColor: "#f9fafb",
          borderColor: "#e5e7eb"
        })
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#dddddd",
          primary: primaryColor
        }
      })}
      value={value}
      isLoading={isLoading}
      options={discounts}
      isClearable={true}
      getOptionValue={(d) => `${d.id ?? ""}`}
      getOptionLabel={(d) =>
        `${d.title} (-${d.value}${d.type === "PERCENTAGE" ? "%" : ""})`
      }
      onChange={(value) => {
        onChange?.(value ?? undefined);
      }}
    />
  );
}

export default DiscountSelect;
