# Hydrogen & Remix Routing Guide

This guide provides a complete reference for proper route structure in Remix/Hydrogen applications to ensure correct routing and CSS loading.

## Understanding Remix Route Structure

Remix uses a file-based routing system with specific conventions that determine both the URL and component hierarchy.

### Key Routing Concepts

1. **Route Files**:
   - Each file in `app/routes/` corresponds to a route
   - URL path is determined by file name - e.g., `app/routes/explore.tsx` maps to `/explore`

2. **Layout Routes**:
   - Files beginning with underscore (`_layout.tsx`) act as layout routes
   - **IMPORTANT**: They do NOT add segments to the URL path
   - They wrap child routes with shared layout elements

3. **Index Routes**:
   - Named `index.tsx` or `_index.tsx` (when inside a layout folder)
   - Render at the parent's path - e.g., `app/routes/_landing/index.tsx` or `app/routes/_landing._index.tsx` render at `/`

4. **Nested Routes**:
   - Can be created in two ways:
     - Using folders: `app/routes/parent/child.tsx` → `/parent/child`
     - Using dot notation: `app/routes/parent.child.tsx` → `/parent/child`

5. **Dynamic Routes**:
   - Use `$` to create parameterized segments: `app/routes/products.$id.tsx` → `/products/:id`

## Route Hierarchy and Layout Nesting

```
app/routes/
├── _layout.tsx            # Root layout - ALL routes inherit from this
├── index.tsx              # URL: /
├── explore.tsx            # URL: /explore
├── _marketing/            # Layout group (doesn't add URL segment)
│   ├── _layout.tsx        # Shared layout for marketing pages
│   ├── index.tsx          # URL: /
│   └── about.tsx          # URL: /about
└── products/
    ├── index.tsx          # URL: /products
    └── $id.tsx            # URL: /products/:id
```

## Common Routing Issues & Solutions

### 1. Route Collisions 

**Problem**: Multiple routes claiming the same URL path.
```
⚠️ Route Path Collision: "/"
The following routes all define the same URL, only the first one will be used
🟢 routes/_landing._index.tsx
⭕️️ routes/_index.tsx
```

**Solution**:
- Remove the duplicate route (e.g., delete `routes/_index.tsx` if not needed)
- Make one route reference another (redirect)
- Restructure to avoid collisions

### 2. Layout Collisions

**Problem**: Multiple layouts with same name.
```
⚠️ Route ID Collision: "routes/_common"
The following routes all define the same Route ID, only the first one will be used
🟢 routes/_common/index.tsx
⭕️️ routes/_common.tsx
```

**Solution**:
- Rename one of the conflicting layouts (e.g., `_common.tsx` → `_main-layout.tsx`)
- Reorganize route hierarchy

## Proper CSS Loading in Hydrogen/Remix

### Method 1: Global CSS in Root Layout

Best for styles used across the entire app:

```tsx
// app/root.tsx
import stylesUrl from '~/styles/app.css?url';

export function links() {
  return [{ rel: 'stylesheet', href: stylesUrl }];
}
```

### Method 2: Layout-specific CSS

For styles shared within specific sections:

```tsx
// app/routes/_marketing.tsx
import marketingStyles from '~/styles/marketing.css?url';

export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }];
}
```

### Method 3: Route-specific CSS

For styles only needed in specific routes:

```tsx
// app/routes/explore.tsx
import exploreStyles from '~/styles/explore.css?url';

export function links() {
  return [{ rel: 'stylesheet', href: exploreStyles }];
}
```

## CSS Loading Troubleshooting

### CSS Not Loading in Specific Routes

1. **Check Route Hierarchy**:
   - Is the route in a layout that imports the necessary styles?
   - Does the layout properly render the CSS?

2. **Verify Import Method**:
   - Use `?url` for CSS files imported via `links()` function
   - Without `?url` for CSS imported directly (rare in Remix)

3. **CSS Import Priority**:
   - CSS from parent routes loads before child routes
   - Child route CSS can override parent styles

## Fixing ModaMosaic Explore Route

### Current Issues:
1. Route and CSS styling issues on `/explore`
2. Layout route collisions affecting CSS inheritance

### Solution Steps:

1. **Organize routes properly**:
   - Keep standalone routes at the top level
   - Ensure routes that need shared layouts are in proper folders/naming

2. **Fix explore page**:
   - Make sure it's at `app/routes/explore.tsx` (for `/explore` URL)
   - Add direct CSS imports with proper `links()` export
   - Ensure it's not in a layout folder if you want direct URL access

3. **Fix layout conflicts**:
   - Rename any conflicting layout files
   - Ensure your primary layout (`_layout.tsx`) properly includes CSS

## Complete Example Solution

```tsx
// app/routes/explore.tsx
import React from 'react';
import { type MetaFunction } from '@remix-run/react';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import { MacWorkspace } from '~/components/MacWorkspace';

export const meta: MetaFunction = () => {
  return [
    { title: 'ModaMosaic | Explore' },
    { name: 'description', content: 'Explore ModaMosaic content' },
  ];
};

// CRITICAL: Export links function to load CSS
export function links() {
  return [
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: appStyles },
  ];
}

// Component code...
```

## Best Practices

1. **Route Simplification**:
   - Keep route structure as flat as possible
   - Only use nested folders/layouts when you need shared UI

2. **Clear Naming**:
   - Use descriptive names for layout routes (e.g., `_marketing`, `_shop`)
   - Avoid generic names that might cause conflicts (`_layout`, `_common`)

3. **Testing**:
   - Test routes in development with CSS disabled to verify HTML structure
   - Check network tab to ensure CSS files are loading correctly

4. **Clear Route Organization**:
   - Group related routes in folders
   - Use README.md files in route folders to document purpose

5. **Import Management**:
   - Keep CSS imports consistent across similar route types
   - Document CSS dependency structure

## Route Structure Sanity Checks

When routing/CSS issues occur:

1. Check the terminal for route collision warnings
2. Verify each route is in the correct location for its URL
3. Confirm CSS is imported correctly in relevant layout/route files
4. Test the route directly by typing the URL
5. Check the network tab to verify CSS file loading
6. Clear the browser cache if needed

## Hydrogen-Specific Notes

Hydrogen (Shopify's framework built on Remix) may have additional routing conventions:

1. Some special routes like `/collections/$handle` have Shopify-specific behaviors
2. The `app/routes.ts` file can define additional route configuration
3. Always check for Hydrogen-specific documentation when standard Remix solutions don't work 