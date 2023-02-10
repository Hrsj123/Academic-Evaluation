import { Outlet, useOutletContext } from "react-router-dom";      

const Layout = () => {
  const { setIsAuthenticated, setUserName, setUserType } = useOutletContext();
  
  return (
    <>
      <Outlet context={{ setIsAuthenticated, setUserName, setUserType }}/>                    {/* -----> Here Students' pages are added! */}
    </>
  );
}

export default Layout