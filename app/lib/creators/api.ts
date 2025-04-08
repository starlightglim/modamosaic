import {createStorefrontClient, type I18nBase} from '@shopify/hydrogen';
import {Creator, CreatorHandle} from './types';
import {getCreatorByHandle} from './config';
import type {AppLoadContext} from '@shopify/remix-oxygen';

/**
 * GraphQL query to fetch a collection by handle
 */
const GET_COLLECTION_BY_HANDLE = `#graphql
  query GetCollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      image {
        url
        altText
      }
    }
  }
` as const;

/**
 * GraphQL query to fetch products from a collection
 */
const GET_COLLECTION_PRODUCTS = `#graphql
  query GetCollectionProducts($collectionId: ID!, $first: Int!) {
    collection(id: $collectionId) {
      products(first: $first) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
` as const;

/**
 * Create a Shopify storefront client for a specific creator
 */
export function getCreatorClient(i18n: I18nBase, creatorHandle?: CreatorHandle) {
  // For now, we'll use the same client options for all creators
  // In a more complex implementation, this could be customized per creator
  return createStorefrontClient({
    storefrontApiVersion: process.env.PUBLIC_STOREFRONT_API_VERSION || '2023-07',
    storeDomain: process.env.PUBLIC_STORE_DOMAIN || 'modamosaic.myshopify.com',
    publicStorefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN || '',
    privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN || '',
    storefrontId: process.env.PUBLIC_STOREFRONT_ID,
    i18n,
  });
}

/**
 * Fetch a creator's featured collection
 */
export async function fetchCreatorFeaturedCollection(
  context: AppLoadContext,
  creator: Creator,
) {
  if (!creator.collections.featuredCollectionId) {
    return null;
  }

  const {storefront} = context;
  
  // In this example, we assume the featuredCollectionId is actually a handle
  // In a real implementation, we would query by ID or handle as appropriate
  const collectionHandle = creator.collections.featuredCollectionId.split('/').pop();
  
  try {
    const {collection} = await storefront.query(GET_COLLECTION_BY_HANDLE, {
      variables: {
        handle: collectionHandle || '',
      },
    });
    
    return collection;
  } catch (error) {
    console.error(`Error fetching featured collection for creator ${creator.profile.handle}:`, error);
    return null;
  }
}

/**
 * Fetch a creator's collection products
 */
export async function fetchCreatorCollectionProducts(
  context: AppLoadContext,
  collectionId: string,
  first: number = 12,
) {
  const {storefront} = context;
  
  try {
    const {collection} = await storefront.query(GET_COLLECTION_PRODUCTS, {
      variables: {
        collectionId,
        first,
      },
    });
    
    return collection?.products?.nodes || [];
  } catch (error) {
    console.error(`Error fetching collection products for ${collectionId}:`, error);
    return [];
  }
}

/**
 * Fetch creator data from Shopify
 * This combines our local creator data with dynamic data from Shopify
 */
export async function fetchCreatorData(
  context: AppLoadContext,
  handle: CreatorHandle,
) {
  const creator = getCreatorByHandle(handle);
  
  if (!creator) {
    return null;
  }
  
  const featuredCollection = await fetchCreatorFeaturedCollection(context, creator);
  
  // Enhance the creator data with Shopify data
  return {
    ...creator,
    featuredCollection,
  };
}

