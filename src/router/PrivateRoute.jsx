import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { fetchConfig, selectConfig } from "../app/HomeSlice/HomeSlice.jsx";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.user);
  const config = useSelector(selectConfig);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return !config?.mandatory_login ? (
    <Outlet />
  ) : currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
