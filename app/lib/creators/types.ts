/**
 * Creator-related type definitions for ModaMosaic
 */

export interface CreatorProfile {
  handle: string;
  name: string;
  bio: string;
  logo?: string;
  contactEmail: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
  };
  profileImage?: string;
  bannerImage?: string;
  featured: boolean;
  joinedDate: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface CreatorTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  customCSS?: string;
}

export interface CreatorCollectionMapping {
  collectionIds: string[];
  featuredCollectionId?: string;
}

export interface Creator {
  profile: CreatorProfile;
  theme: CreatorTheme;
  collections: CreatorCollectionMapping;
}

export type CreatorHandle = string;

