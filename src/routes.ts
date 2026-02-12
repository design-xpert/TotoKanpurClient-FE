import { createBrowserRouter } from "react-router";
import ZonePage from './components/ZonePage';
import VehicleDetails from './components/VehicleDetails';
import NotFound from './components/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ZonePage,
  },
  {
    path: "/vehicle",
    Component: VehicleDetails,
  },
  {
    path: "/:slug",
    Component: ZonePage,
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
