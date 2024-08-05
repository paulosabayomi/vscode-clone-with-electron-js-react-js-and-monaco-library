import { createBrowserRouter, createHashRouter } from "react-router-dom";
import MainComponent from "../components/main";
import ExplorerRoute from "../components/sidebar-routes/explorer";
import SidebarIndexRoute from "../components/sidebar-routes/sidebarIndex";
import SearchComponent from "../components/sidebar-routes/search";
import SourceComponent from "../components/sidebar-routes/source";
import DebugComponent from "../components/sidebar-routes/debug";
import ExtensionsComponent from "../components/sidebar-routes/extensions";
import AccountComponent from "../components/sidebar-routes/account";
import SettingsComponent from "../components/sidebar-routes/settings";

export default createHashRouter([
    {
      path: "/main_window",
      element: <MainComponent />,
      errorElement: <MainComponent />,
      children: [
        {
          path: '/main_window',
          element: <ExplorerRoute />,
          index: true
        },
        {
          path: '/main_window/search',
          element: <SearchComponent />,
        },
        {
          path: '/main_window/source',
          element: <SourceComponent />,
        },
        {
          path: '/main_window/debug',
          element: <DebugComponent />,
        },
        {
          path: '/main_window/extensions',
          element: <ExtensionsComponent />,
        },
        {
          path: '/main_window/accounts',
          element: <AccountComponent />,
        },
        {
          path: '/main_window/settings',
          element: <SettingsComponent />,
        },
      ]
    },
]);