import { useQuery } from "@tanstack/react-query";
import { getCities, getPostos } from "@/services/postosService";

export function useCitiesQuery() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getPostos,
    staleTime: 1000 * 60 * 5,
  });
}
