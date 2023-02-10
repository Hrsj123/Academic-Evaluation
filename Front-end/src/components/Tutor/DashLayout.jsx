import React from 'react'
import { Outlet } from react-router-dom;

const DashLayout = () => {
  return (
    <>
        <div className="dast-container">
            <Outlet />
        </div>
    </>
  )
}

export default DashLayout