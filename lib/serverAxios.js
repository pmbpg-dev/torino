import axios from "axios";
import { cookies } from "next/headers";

export function createServerAxios() {
  const cookieStore = cookies();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DB_HOST,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        originalRequest._retry = true;

        try {
          const refreshRes = await fetch(
            `${process.env.NEXT_PUBLIC_NEXT_HOST}/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
            },
          );

          if (!refreshRes.ok) throw new Error("refresh failed");

          const data = await refreshRes.json();
          const newAccessToken = data.accessToken;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        } catch (err) {
          cookieStore.delete("accessToken");
          cookieStore.delete("refreshToken");

          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
}
