import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {fetchCreatorData, fetchCreatorCollectionProducts} from '~/lib/creators/api';
import {getCreatorByHandle} from '~/lib/creators/config';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  if (!data?.creator) {
    return [{title: 'Creator Not Found'}];
  }
  
  return [{
    title: `ModaMosaic | ${data.creator.profile.name}`,
    description: data.creator.profile.bio,
  }];
};

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {handle} = params;
  
  if (!handle) {
    return redirect('/creators');
  }
  
  // Start with local creator data
  const creator = getCreatorByHandle(handle);
  
  if (!creator) {
    throw new Response('Creator not found', {status: 404});
  }
  
  // Fetch enhanced data and featured products
  const enhancedCreator = await fetchCreatorData(context, handle);
  
  let featuredProducts = [];
  if (enhancedCreator?.featuredCollection?.id) {
    featuredProducts = await fetchCreatorCollectionProducts(
      context,
      enhancedCreator.featuredCollection.id,
      8
    );
  }
  
  return json({
    creator: enhancedCreator,
    featuredProducts,
  });
}

export default function CreatorPage() {
  const {creator, featuredProducts} = useLoaderData<typeof loader>();
  
  if (!creator) return null;
  
  const {profile, theme} = creator;
  
  // Apply creator theme using inline styles
  const creatorStyles = {
    '--creator-primary-color': theme.primaryColor,
    '--creator-secondary-color': theme.secondaryColor,
    '--creator-accent-color': theme.accentColor,
    '--creator-text-color': theme.textColor,
    '--creator-background-color': theme.backgroundColor,
    '--creator-font-family': theme.fontFamily,
  } as React.CSSProperties;
  
  return (
    <div className="creator-page" style={creatorStyles}>
      <div className="creator-header">
        {profile.bannerImage && (
          <div className="creator-banner">
            <img 
              src={profile.bannerImage} 
              alt={`${profile.name} banner`} 
              width={1200} 
              height={400}
            />
          </div>
        )}
        
        <div className="creator-profile">
          <div className="creator-profile-image">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                width={150}
                height={150}
              />
            ) : (
              <div className="creator-profile-placeholder">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="creator-profile-info">
            <h1>{profile.name}</h1>
            <p className="creator-bio">{profile.bio}</p>
            
            <div className="creator-social-links">
              {profile.socialLinks.instagram && (
                <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
              {profile.socialLinks.website && (
                <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="creator-collections">
        <h2>Featured Products</h2>
        
        {featuredProducts.length > 0 ? (
          <div className="creator-products-grid">
            {featuredProducts.map((product: any) => (
              <Link
                key={product.id}
                className="product-card"
                to={`/products/${product.handle}`}
              >
                {product.featuredImage && (
                  <div className="product-image">
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      width={300}
                      height={300}
                    />
                  </div>
                )}
                
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-price">
                    {product.priceRange?.minVariantPrice && (
                      <Money data={product.priceRange.minVariantPrice} />
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No products available at this time.</p>
        )}
        
        <div className="creator-cta">
          <Link to={`/collections/${creator.featuredCollection?.handle || 'all'}`} className="button">
            View All {profile.name} Products
          </Link>
        </div>
      </div>
    </div>
  );
}

