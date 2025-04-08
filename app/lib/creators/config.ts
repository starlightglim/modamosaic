import {Creator} from './types';

/**
 * Sample creator data for ModaMosaic
 * In a production environment, this would likely be fetched from a CMS or database
 */
export const creators: Creator[] = [
  {
    profile: {
      handle: 'studio-one',
      name: 'Studio One',
      bio: 'Contemporary fashion with sustainable practices. Studio One creates timeless pieces that blend modern aesthetics with ethical production.',
      contactEmail: 'hello@studio-one.example',
      socialLinks: {
        instagram: 'https://instagram.com/studio-one',
        website: 'https://studio-one.example',
      },
      profileImage: '/creators/studio-one/profile.jpg',
      bannerImage: '/creators/studio-one/banner.jpg',
      featured: true,
      joinedDate: '2023-01-15',
      status: 'active',
    },
    theme: {
      primaryColor: '#2E2E2E',
      secondaryColor: '#F5F5F5',
      accentColor: '#E63946',
      textColor: '#333333',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
      buttonStyle: 'rounded',
    },
    collections: {
      collectionIds: [
        'gid://shopify/Collection/111111111', // Replace with actual collection IDs
        'gid://shopify/Collection/222222222',
      ],
      featuredCollectionId: 'gid://shopify/Collection/111111111',
    },
  },
  {
    profile: {
      handle: 'artisan-collective',
      name: 'Artisan Collective',
      bio: 'A group of skilled artisans creating handcrafted accessories and home goods using traditional techniques and modern designs.',
      contactEmail: 'hello@artisan-collective.example',
      socialLinks: {
        instagram: 'https://instagram.com/artisan-collective',
        twitter: 'https://twitter.com/artisancoll',
        website: 'https://artisan-collective.example',
      },
      profileImage: '/creators/artisan-collective/profile.jpg',
      bannerImage: '/creators/artisan-collective/banner.jpg',
      featured: true,
      joinedDate: '2023-03-10',
      status: 'active',
    },
    theme: {
      primaryColor: '#3A5A40',
      secondaryColor: '#DAD7CD',
      accentColor: '#A3B18A',
      textColor: '#344E41',
      backgroundColor: '#FEFAE0',
      fontFamily: 'Montserrat, sans-serif',
      buttonStyle: 'square',
    },
    collections: {
      collectionIds: [
        'gid://shopify/Collection/333333333', // Replace with actual collection IDs
        'gid://shopify/Collection/444444444',
      ],
      featuredCollectionId: 'gid://shopify/Collection/333333333',
    },
  },
];

/**
 * Get a creator by their handle
 */
export function getCreatorByHandle(handle: string): Creator | undefined {
  return creators.find((creator) => creator.profile.handle === handle);
}

/**
 * Get all active creators
 */
export function getAllActiveCreators(): Creator[] {
  return creators.filter((creator) => creator.profile.status === 'active');
}

/**
 * Get featured creators
 */
export function getFeaturedCreators(): Creator[] {
  return creators.filter(
    (creator) => 
      creator.profile.status === 'active' && 
      creator.profile.featured
  );
}

/**
 * Check if a creator exists
 */
export function creatorExists(handle: string): boolean {
  return creators.some((creator) => creator.profile.handle === handle);
}

