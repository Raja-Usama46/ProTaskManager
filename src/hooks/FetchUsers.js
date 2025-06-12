import { useQuery } from "@tanstack/react-query";

export default function Features() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      return data;
    },
    staleTime: 5000,
  });
  return { isLoading, error, data };
}
