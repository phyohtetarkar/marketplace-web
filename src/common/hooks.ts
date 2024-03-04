import { getProductById } from "@/services/ProductService";
import { getPendingOrderCount, getShopById } from "@/services/ShopService";
import useSWR from "swr";
import { getAllCategories, getCategoryBySlug } from "@/services/CategoryService";
import { getAllCities } from "@/services/CityService";
import { getLoginUser } from "@/services/UserService";
import { findDiscounts } from "@/services/DiscountService";
import { useCallback, useContext } from "react";
import { locale_en, locale_mm } from "@/locales/locale.config";
import { LocalizationContext } from "./contexts";

export function useCategory(slug?: string) {
  const { data, error, isLoading } = useSWR(
    ["/categories", slug],
    ([url, s]) => (s ? getCategoryBySlug(s) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  return {
    category: data,
    error: error,
    isLoading: isLoading
  };
}

export function useCategories(root: boolean) {
  const { data, error, isLoading } = useSWR(
    `/categories?root=${root}`,
    () => getAllCategories(root),
    {
      revalidateOnFocus: false
    }
  );

  return {
    categories: data,
    error: error,
    isLoading: isLoading
  };
}

export function useCities() {
  const { data, error, isLoading } = useSWR(`/cities`, () => getAllCities(), {
    revalidateOnFocus: false
  });

  return {
    cities: data,
    error: error,
    isLoading: isLoading
  };
}

export function useLoginUser() {
  const { data, error, isLoading, mutate } = useSWR("/login-user", getLoginUser, {
    revalidateOnFocus: false
  });

  return {
    user: data,
    error: error,
    isLoading: isLoading,
    mutate: mutate
  };
}

export function useDiscounts(shopId: number) {
  const { data, error, isLoading } = useSWR(
    `/discount/${shopId}/unpaged`,
    () => findDiscounts(shopId),
    {
      revalidateOnFocus: false
    }
  );

  return {
    discounts: data,
    error: error,
    isLoading: isLoading
  };
}

export function useShop(shopId: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/vendor/shops/${shopId}`,
    () => getShopById(shopId),
    {
      revalidateOnFocus: false
    }
  );

  return {
    shop: data,
    error: error,
    isLoading: isLoading,
    mutate: mutate
  };
}

export function useProduct(shopId: number, productId: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/vendor/shops/${shopId}/products/${productId}`,
    () => getProductById(shopId, productId),
    {
      revalidateOnFocus: false
    }
  );

  return {
    product: data,
    error: error,
    isLoading: isLoading,
    mutate: mutate
  };
}

export function usePendingOrderCount(shopId: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/shops/${shopId}/pending-order-count`,
    () => getPendingOrderCount(shopId),
    {
      revalidateOnFocus: false
    }
  );

  return {
    count: data,
    error: error,
    isLoading: isLoading,
    mutate: mutate
  };
}

export const useLocalization = () => {
  const { locale, setLocale } = useContext(LocalizationContext);

  const localize = useCallback(
    (key: string) => {
      if (locale === "mm") {
        return locale_mm[key];
      }

      return locale_en[key];
    },
    [locale]
  );

  const change = useCallback(
    (locale: string) => {
      setLocale?.(locale);
    },
    [setLocale]
  );

  return { locale: locale, localize, change };
};