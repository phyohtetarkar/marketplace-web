import { useCategories, useLocalization } from "@/common/hooks";
import { Category } from "@/common/models";
import { getCategoryName } from "@/common/utils";
import { RiListCheck } from "@remixicon/react";
import { useRouter } from "next/navigation";
import MultiLevelDropdown from "./MultiLevelDropdown";

function MultiCategoryDropdown() {
  const router = useRouter();
  const { locale, localize } = useLocalization();
  const { categories, error, isLoading } = useCategories(false);

  return (
    <MultiLevelDropdown<Category>
      toggle={
        <div role="button" className="nav-link hstack">
          <RiListCheck size={20} className="me-1 d-none d-lg-block" />
          <span>{localize("categories")}</span>
        </div>
      }
      items={categories ?? []}
      getMenuLabel={(v) => getCategoryName(locale, v)}
      getSubItems={(v) => v.children}
      getMenuLink={(v) => `/collections/${v.slug}`}
      // onMenuClick={(v) => {
      //   router.push(`/collections/${v.slug}`);
      // }}
    />
  );
}

export default MultiCategoryDropdown;
