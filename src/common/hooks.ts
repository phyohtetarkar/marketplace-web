import useSWR from "swr";
import {
  getAllCategories,
  getBrandsByCategory,
  getCategory
} from "../services/CategoryService";
import { getAllCities } from "../services/CityService";
import { getLoginUser } from "../services/UserService";

export function useCategory(slug?: string) {
  const { data, error, isLoading } = useSWR(
    ["/categories", slug],
    ([url, s]) => (s ? getCategory(s) : undefined),
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

export function useCategories(tree: boolean) {
  const { data, error, isLoading } = useSWR(
    `/categories?tree=${tree}`,
    () => getAllCategories(tree),
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

export function useBrands(categoryId?: number) {
  const { data, error, isLoading } = useSWR(
    "/brands",
    () => (categoryId ? getBrandsByCategory(categoryId) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  return {
    brands: data,
    error: error,
    isLoading: isLoading
  };
}

export function useLoginUser() {
  const { data, error, isLoading } = useSWR("/login-user", getLoginUser, {
    revalidateOnFocus: false
  });

  return {
    user: data,
    error: error,
    isLoading: isLoading
  };
}
