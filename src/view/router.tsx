import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

const routeObjects: RouteObject[] = [
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    Component() {
      let data = useLoaderData() as { message: string };
      return <h1>{data.message}</h1>;
    },
  },
];

const router = createBrowserRouter(routeObjects);
export default router;
