import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state?.user);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    !currentUser && nav(".");
  }, [currentUser]);
  return currentUser && <Outlet />;
}
