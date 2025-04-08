# Shopify Integration for ModaMosaic

This document outlines how to structure your Shopify backend to support the ModaMosaic multi-creator marketplace platform.

## Shopify Configuration

### Collections Structure

#### 1. Creator Collections
Create a top-level collection for each creator. This allows easy filtering and navigation by creator.

Example collection structure:
- "Creator Name" (top-level collection)
  - Sub-collections specific to the creator's product categories

#### 2. Collection Organization
Use Shopify's collection hierarchy:
- Creator-level collections (e.g., "Studio ABC")
- Category collections within creators (e.g., "Studio ABC - Dresses")
- Special collections (e.g., "Featured Creators", "New Arrivals")

### Product Configuration

#### 1. Product Attribution
Associate products with creators using:
- Tags (e.g., `creator:studio-abc`)
- Metafields for structured data
- Collection membership

#### 2. Product Metafields
Set up the following metafields for products:

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `creator` | `handle` | Single line text | Creator's handle |
| `creator` | `name` | Single line text | Creator's display name |
| `creator` | `commission` | Decimal | Creator's commission percentage |
| `creator` | `exclusive` | Boolean | Whether product is creator-exclusive |

### Shopify Apps

Consider the following Shopify apps to enhance multi-creator functionality:

1. **Metafields Guru** or **Custom Fields**
   - Manage complex metafield structures for creators

2. **Multi-Vendor Marketplace**
   - If using a marketplace model with commissions

3. **Advanced Product Options**
   - For creator-specific product customization

## Data Fetching Strategy

### GraphQL Queries

#### 1. Fetching Creator Information
```graphql
query GetCreator($handle: String!) {
  collection(handle: $handle) {
    id
    title
    description
    image {
      url
      altText
    }
    metafields(first: 10, namespace: "creator") {
      edges {
        node {
          key
          value
        }
      }
    }
  }
}
```

#### 2. Fetching Creator Products
```graphql
query GetCreatorProducts($collectionId: ID!, $first: Int!) {
  collection(id: $collectionId) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          metafields(first: 5, namespace: "creator") {
            edges {
              node {
                key
                value
              }
            }
          }
        }
      }
    }
  }
}
```

### Storefront API Implementation

In your Hydrogen app, create a dedicated storefront API client for creator-specific queries:

```typescript
// app/lib/creators/api.ts
import {createStorefrontClient} from '@shopify/hydrogen';

export function getCreatorClient() {
  return createStorefrontClient({
    privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
    storeDomain: process.env.PUBLIC_STORE_DOMAIN,
    storefrontApiVersion: '2023-07',
  });
}

export async function getCreatorByHandle(handle: string) {
  const client = getCreatorClient();
  
  // Query creator collection and metafields
  const {collection} = await client.query({
    query: GET_CREATOR_QUERY,
    variables: {handle},
  });
  
  // Transform collection data to creator format
  return transformCollectionToCreator(collection);
}

// Helper to transform collection data to creator model
function transformCollectionToCreator(collection) {
  // Transform collection and metafields to creator format
  // ...
}
```

## Extending Hydrogen's Default Functionality

### 1. Custom Route Handlers

Implement custom route handlers for creator pages:

```typescript
// app/routes/creators/[handle].tsx
import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {getCreatorByHandle} from '~/lib/creators/api';

export async function loader({params}: LoaderFunctionArgs) {
  const {handle} = params;
  const creator = await getCreatorByHandle(handle as string);
  
  if (!creator) {
    throw new Response('Creator not found', {status: 404});
  }
  
  return {creator};
}

export default function CreatorPage() {
  const {creator} = useLoaderData<typeof loader>();
  
  return (
    <div>
      <h1>{creator.name}</h1>
      {/* Creator page content */}
    </div>
  );
}
```

### 2. Custom Cart Implementation

Extend the default cart to track creator attribution:

```typescript
// Example cart line item with creator data
interface CreatorCartLineItem extends CartLineItem {
  creatorHandle: string;
  creatorName: string;
  creatorCommission: number;
}

// Add creator info to cart items
function addToCartWithCreator(variantId: string, quantity: number, creatorInfo: {
  handle: string;
  name: string;
  commission: number;
}) {
  // Add item to cart with custom attributes for creator
  return cartAdd({
    lines: [{
      merchandiseId: variantId,
      quantity,
      attributes: [
        { key: 'creator_handle', value: creatorInfo.handle },
        { key: 'creator_name', value: creatorInfo.name }
      ]
    }]
  });
}
```

## Admin and Creator Dashboard

For creator management, consider:

1. **Admin Dashboard**
   - A separate Shopify app or section for managing creators
   - Creator approval workflows
   - Commission management

2. **Creator Portal**
   - Custom app or password-protected section
   - Product management interface
   - Analytics dashboard
   - Commission reporting

## SEO Considerations

1. **Creator-Specific SEO**
   - Implement proper meta tags for each creator's products
   - Set canonical URLs for creator products
   - Schema.org markup for creator attribution

2. **Sitemaps**
   - Include creator pages in sitemap
   - Configure proper priorities for creator content

3. **URL Structure**
   - Use clean URLs for creator pages: `/creators/[handle]`
   - Consistent URL patterns for all creator products

## Analytics & Tracking

Set up tracking to differentiate between creators:

1. **Google Analytics**
   - Custom dimensions for creators
   - Event tracking for creator-specific actions

2. **Shopify Analytics**
   - Segment sales by creator tag/collection
   - Track creator-specific conversions 