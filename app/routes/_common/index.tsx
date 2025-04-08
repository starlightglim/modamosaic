import { redirect } from '@shopify/remix-oxygen';

/**
 * Redirect from /_common/ to the home page
 */
export function loader() {
  return redirect('/');
} 