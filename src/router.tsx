import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Cross-fade between pages where the browser supports it. Styled in styles.css.
    defaultViewTransition: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
