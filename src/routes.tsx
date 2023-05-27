import { useRoutes, RouteObject, Outlet } from 'react-router';
import Home from './pages/home';
import About from './pages/about';
import RouterConfig from "@/.cache/routes_config"
import React from 'react';
import Preview from './components/Preview';
import DO from "./pages/css/basic/index.md"

console.log("DO", DO)
const config: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <Home />,
  // },
  // {
  //   path: '/about',
  //   element: <About />,
  // },
  // {
  //   path: '/about2',
  //   element: <Preview path={() => import("@/pages/css/basic/index.md")} />,
  // },
  ...RouterConfig
];

const Route = () => {
  const render = useRoutes(config);
  return (
    <React.Fragment>
      {render}
      <Outlet />
    </React.Fragment>
  );
};
export default Route;
