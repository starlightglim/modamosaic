# Importing a Next.js Landing Page into Hydrogen/Remix

This guide documents the process of porting a Next.js landing page from a commerce project into a Hydrogen/Remix e-commerce application.

## Prerequisites

- Existing Next.js commerce project with a landing page
- Target Hydrogen/Remix project
- Fonts and other assets from the original project

## Step 1: Copy and Configure Font Files

1. Copy the required font files from the Next.js project to the Hydrogen/Remix project:
   ```bash
   cp -v commerce/fonts/*.ttf app/fonts/
   cp -v commerce/fonts/*.ttf public/fonts/
   ```
   
   Note: Font files need to be in both `app/fonts/` (for reference) and `public/fonts/` (for web access).

## Step 2: Set Up Tailwind CSS

1. Install Tailwind CSS and required plugins:
   ```bash
   npm install tailwindcss@3.x postcss autoprefixer @tailwindcss/container-queries @tailwindcss/typography tailwind-scrollbar
   ```

2. Create a `postcss.config.cjs` file (note the `.cjs` extension for CommonJS format when project is ESM):
   ```javascript
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

3. Create a `tailwind.config.cjs` file with the appropriate configuration:
   ```javascript
   module.exports = {
     content: ['./app/**/*.{js,ts,jsx,tsx}'],
     theme: {
       extend: {
         fontFamily: {
           sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
           jacquard: ['Jacquard12', 'cursive'],
         },
         keyframes: {
           fadeIn: {
             from: { opacity: 0 },
             to: { opacity: 1 },
           },
           marquee: {
             '0%': { transform: 'translateX(0%)' },
             '100%': { transform: 'translateX(-100%)' },
           },
           blink: {
             '0%': { opacity: 0.2 },
             '20%': { opacity: 1 },
             '100% ': { opacity: 0.2 },
           },
         },
         animation: {
           fadeIn: 'fadeIn .3s ease-in-out',
           carousel: 'marquee 60s linear infinite',
           blink: 'blink 1.4s both infinite',
         },
       },
     },
     plugins: [
       require('@tailwindcss/container-queries'),
       require('@tailwindcss/typography'),
       require('tailwindcss/plugin')(({ matchUtilities, theme }) => {
         matchUtilities(
           {
             'animation-delay': (value) => ({ 'animation-delay': value }),
           },
           { values: theme('transitionDelay') }
         );
       }),
       require('tailwind-scrollbar')({ nocompatible: true }),
     ],
   };
   ```

4. Update the project's `vite.config.ts` to correctly process CSS:
   ```javascript
   css: {
     // Use the external PostCSS config
     postcss: './postcss.config.cjs',
   },
   ```

5. Add Tailwind directives to `app/styles/app.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* Rest of existing CSS */

   /* Add font faces */
   @layer base {
     @font-face {
       font-family: 'Jacquard12';
       src: url('/fonts/Jacquard12-Regular.ttf') format('truetype');
       font-weight: normal;
       font-style: normal;
       font-display: swap;
     }

     @font-face {
       font-family: 'Inter';
       src: url('/fonts/Inter-Bold.ttf') format('truetype');
       font-weight: bold;
       font-style: normal;
       font-display: swap;
     }
   }

   /* Add additional global styles like scrollbars if needed */
   ```

## Step 3: Copy and Adapt Components

1. Copy needed interactive components from the Next.js project, such as `AnimatedText`:
   ```tsx
   // app/components/AnimatedText.tsx
   import React, { useEffect, useRef, useState } from 'react';
   
   // (component code adapted from the Next.js project)
   ```

2. Ensure component imports are updated to use Remix paths:
   - Change `next/link` to `@remix-run/react` for `Link` components
   - Adjust any other Next.js-specific imports 

## Step 4: Create a Specialized Layout (Optional)

If you want the landing page without normal navigation bars/footers:

1. Create a specific layout route file `app/routes/_landing.tsx`:
   ```tsx
   import {useNonce, Analytics} from '@shopify/hydrogen';
   import {
     Links, Meta, Scripts, useRouteLoaderData, ScrollRestoration, Outlet,
   } from '@remix-run/react';
   import resetStyles from '~/styles/reset.css?url';
   import appStyles from '~/styles/app.css?url';
   import { RootLoader } from '../root';

   /**
    * This layout is used specifically for the landing page without header and footer
    */
   export default function LandingLayout() {
     const nonce = useNonce();
     const data = useRouteLoaderData<RootLoader>('root');

     return (
       <html lang="en">
         <head>
           <meta charSet="utf-8" />
           <meta name="viewport" content="width=device-width,initial-scale=1" />
           <link rel="stylesheet" href={resetStyles}></link>
           <link rel="stylesheet" href={appStyles}></link>
           <Meta />
           <Links />
         </head>
         <body>
           {data ? (
             <Analytics.Provider
               cart={data.cart}
               shop={data.shop}
               consent={data.consent}
             >
               {/* No PageLayout wrapper - directly render the outlet */}
               <Outlet />
             </Analytics.Provider>
           ) : (
             <Outlet />
           )}
           <ScrollRestoration nonce={nonce} />
           <Scripts nonce={nonce} />
         </body>
       </html>
     );
   }
   ```

2. Create a landing page route at `app/routes/_landing._index.tsx` that renders the adapted Next.js landing page:
   ```tsx
   import { type MetaFunction, Link } from '@remix-run/react';
   import { motion } from 'framer-motion';
   import { AnimatedText } from '~/components/AnimatedText';
   
   // (Adapted landing page code from Next.js)
   ```

3. Update `app/routes/_index.tsx` to redirect to the landing page layout:
   ```tsx
   import { redirect } from '@shopify/remix-oxygen';
   
   export function loader() {
     return redirect('/');
   }
   ```

4. Ensure your `app/routes.ts` is configured correctly:
   ```typescript
   import {flatRoutes} from '@remix-run/fs-routes';
   import {type RouteConfig} from '@remix-run/route-config';
   import {hydrogenRoutes} from '@shopify/hydrogen';
   
   export default hydrogenRoutes([
     ...await flatRoutes({
       ignoredRouteFiles: [
         '**/.*',
         '**/*.test.*',
       ],
     }),
   ]) satisfies RouteConfig;
   ```

## Step 5: Troubleshooting Common Issues

### Module Format Errors
- If you see errors about `module is not defined in ES module scope`, ensure you're using `.cjs` extension for CommonJS files like PostCSS and Tailwind configs when your project uses ESM.

### Tailwind Not Processing
- Ensure your CSS imports don't use the `?url` suffix in layout files if you want Vite to process them through PostCSS.
- Check that the Tailwind directives are at the top of your CSS file.

### Font Issues
- Ensure fonts are properly copied to the `public/fonts` directory and correctly referenced in `@font-face` rules.
- Double-check font family names in Tailwind config and CSS classes.

### Build Problems
- Run `npm install` after making configuration changes.
- Restart the development server with `npm run dev`.

## Conclusion

By following these steps, you can successfully adapt a Next.js landing page to work within a Hydrogen/Remix application while maintaining the original styling, animations, and functionality. The key is understanding the differences between the frameworks' routing, styling, and component systems. 