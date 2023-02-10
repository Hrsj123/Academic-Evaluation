import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />                    {/* -----> Here Students' Assessment pages are added! */}
    </>
  );
}

export default Layout