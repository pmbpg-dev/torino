import { useQuery } from "@tanstack/react-query";
import { isLogin } from "../services/configs";

export const useUserLoginStatus = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: isLogin,
  });
};
