import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";

export function usePosts() {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["post"],
    queryFn: getPosts,
  });

  return { isLoading, posts };
}
