import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/services/postosService";

export function useCitiesQuery(debouncedSearchTerm: string) {
  return useQuery({
    queryKey: ["searchCities", debouncedSearchTerm],
    queryFn: () => getCities(debouncedSearchTerm),
    // Prevents query from running if the input is completely empty
    enabled: debouncedSearchTerm.length > 0,
    // Keeps previous results on screen while loading new ones for a smoother UX
    placeholderData: (previousData) => previousData,
  });
}
