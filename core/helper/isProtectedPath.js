export const isProtectedPath = (pathname) => {
  const protectedRoutes = ["/checkout", "/profile"];

  return protectedRoutes.some((route) => pathname.startsWith(route));
};
