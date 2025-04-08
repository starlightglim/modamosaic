# Creator Management System

## Overview
The ModaMosaic platform hosts multiple creators, each with their own collections, branding, and customization options. This document outlines the implementation strategy for the creator management system.

## Creator Data Model

### Creator Profile
```typescript
interface CreatorProfile {
  handle: string;                 // Unique identifier/URL slug
  name: string;                   // Display name
  bio: string;                    // Creator biography
  logo?: string;                  // Creator logo URL
  contactEmail: string;           // Contact email
  socialLinks: {                  // Social media links
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
  };
  profileImage?: string;          // Profile image URL
  bannerImage?: string;           // Banner image URL
  featured: boolean;              // Whether to feature on homepage
  joinedDate: string;             // When creator joined platform
  status: 'active' | 'inactive' | 'pending';
}
```

### Creator Theme
```typescript
interface CreatorTheme {
  creatorHandle: string;          // Reference to creator
  primaryColor: string;           // Primary brand color
  secondaryColor: string;         // Secondary brand color
  accentColor: string;            // Accent color
  textColor: string;              // Main text color
  backgroundColor: string;        // Background color
  fontFamily: string;             // Primary font family
  buttonStyle: 'rounded' | 'square' | 'pill';
  customCSS?: string;             // Optional custom CSS
}
```

### Creator Collection Mapping
```typescript
interface CreatorCollectionMapping {
  creatorHandle: string;          // Reference to creator
  collectionIds: string[];        // Shopify collection IDs owned by creator
  featuredCollectionId?: string;  // Featured collection ID
}
```

## Storage Strategy

1. **Shopify Metafields**
   - Store creator profile information as metafields on custom objects
   - Use metafields for theme configuration

2. **Custom App Storage**
   - Consider a headless CMS for more complex creator data
   - Options: Contentful, Sanity, or custom database

3. **Collection-Based Approach**
   - Create a collection per creator
   - Use product tags or metafields to associate products with creators

## Implementation Plan

### 1. Creator Registration & Onboarding
- Build creator application form
- Admin approval workflow
- Creator onboarding process (profile setup, theme configuration)

### 2. Creator Dashboard
- Profile management
- Collection and product management
- Sales and analytics dashboard
- Theme customization interface

### 3. Frontend Integration
- Creator profile pages
- Creator-specific collection pages
- Dynamic theming based on creator settings
- Navigation and discovery of creators

### 4. Product Attribution
- Link products to creators in Shopify
- Implement revenue sharing model (if applicable)
- Track creator-specific metrics

## Technical Implementation

### Creator Configuration File
Create a central configuration file `app/lib/creatorConfig.ts` that exports creator data:

```typescript
export const creators = [
  {
    handle: 'creator1',
    name: 'Studio Name',
    // other profile fields
    theme: {
      primaryColor: '#ff0000',
      // other theme fields
    },
    collections: ['gid://shopify/Collection/123456789'],
  },
  // additional creators
];

export function getCreatorByHandle(handle: string) {
  return creators.find(creator => creator.handle === handle);
}

export function getAllCreators() {
  return creators.filter(creator => creator.status === 'active');
}
```

### Dynamic Creator Routes
Implement dynamic routes in `app/routes/creators/[handle].tsx` and related sub-routes to handle creator-specific pages.

### Creator Component Overrides
Create a mechanism for creators to override global components with custom versions when needed. 