import {flatRoutes} from '@remix-run/fs-routes';
import {type RouteConfig} from '@remix-run/route-config';
import {hydrogenRoutes} from '@shopify/hydrogen';

// For the _landing layout, we don't need special configuration since 
// Remix's file-based routing handles it through the file naming convention
export default hydrogenRoutes([
  ...await flatRoutes({
    // Ensure flat routes finds all route files including our _landing layout
    ignoredRouteFiles: [
      '**/.*',
      '**/*.test.*',
    ],
  }),
]) satisfies RouteConfig;
