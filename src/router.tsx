import { createBrowserRouter } from "react-router-dom";

// Error pages
import NotFoundPage from "@views/auto/not-found";

// Layouts
import AppLayout from "@views/app-layout";

// Loaders
import { propertyDetailLoader } from "@views/property-detail/property-detail.loader";

// Pages
import HomePage from "@views/home/home";
import ListPage from "@views/list/list";
import PropertyDetailPage from "@views/property-detail/property-detail";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    handle: { title: "Encuentra tu próximo hogar de forma rápida y segura" },
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "property/:id",
        loader: propertyDetailLoader,
        element: <PropertyDetailPage />,
        handle: { title: "Detalle de Propiedad" },
      },
      {
        path: "404",
        element: <NotFoundPage />,
        handle: { title: "Página no encontrada" },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: { title: "Página no encontrada" },
      },
    ],
  },
]);
