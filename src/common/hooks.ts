import useSWR from "swr";
import { getAllCategories } from "../services/CategoryService";

export function useCategories(flat: boolean) {
  const { data, error, isLoading } = useSWR(
    ["/categories/structural", flat],
    ([url, f]) => getAllCategories(f),
    {
      revalidateOnFocus: false
    }
  );

  return {
    data: data,
    error: error,
    isLoading: isLoading
  };
}
