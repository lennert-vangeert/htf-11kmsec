const ROUTES = {
  home: "/",
  challenge: { path: "challenges/:id", to: "/challenges/" },
  account: "/account",
  scoreboard: "/scoreboard",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",
  notFound: "*",
};

export default ROUTES;
