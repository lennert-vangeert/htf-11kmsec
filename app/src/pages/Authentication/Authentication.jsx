import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ROUTES from "../../consts/ROUTES";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Account from "../Account/Account";
import NotFound from "../../components/NotFound/NotFound";
import { useAuthContext } from "../../contexts/AuthContainer";
import Challenge from "../Challenge/Challenge";
import ChallengeList from "../ProductList/ChallengeList";

const Authentication = () => {
  const { user, login } = useAuthContext();
  return (
    <Routes>
      <Route path={ROUTES.home} element={<ChallengeList />} />

      <Route path={ROUTES.challenge.path} element={<Challenge />} />

      <Route path={ROUTES.login} element={<Login onLogin={login} />} />
      <Route path={ROUTES.register} element={<Register onLogin={login} />} />

      {user ? (
        <Route path={ROUTES.account} element={<Account />} />
      ) : (
        <Route path={ROUTES.account} element={<Navigate to={ROUTES.login} />} />
      )}
      {/* {user ? (
        <Route path={ROUTES.basket} element={<Basket />} />
      ) : (
        <Route path={ROUTES.basket} element={<Navigate to={ROUTES.login} />} />
      )} */}
      <Route path={ROUTES.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Authentication;
