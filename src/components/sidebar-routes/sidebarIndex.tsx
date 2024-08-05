import React from "react";
import { Outlet } from "react-router-dom";

const SidebarIndexRoute = React.memo((props: any) => {
    return (
        <Outlet />
    )
})

export default SidebarIndexRoute