import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { selectConfig } from "../app/HomeSlice/HomeSlice.jsx";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state?.user);
  const config = useSelector(selectConfig);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    !config?.mandatory_login && !currentUser && nav("/login");
  }, [config, nav]);
  return <Outlet />;
}
