const ROUTES = {
  home: "/",
  challenge: { path: "Challenges/:id", to: "/Challenges/" },
  account: "/account",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",
  notFound: "*",
};

export default ROUTES;
