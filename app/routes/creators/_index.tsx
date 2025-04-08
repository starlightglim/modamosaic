import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {getAllActiveCreators} from '~/lib/creators/config';

export const meta: MetaFunction = () => {
  return [{title: 'ModaMosaic | All Creators'}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const creators = getAllActiveCreators();
  
  if (!creators.length) {
    throw new Response('No creators found', {status: 404});
  }
  
  return json({
    creators,
  });
}

export default function CreatorsIndex() {
  const {creators} = useLoaderData<typeof loader>();
  
  return (
    <div className="creators-page">
      <h1>Our Creators</h1>
      <p className="page-description">
        Discover unique collections from our talented ModaMosaic creators.
      </p>
      
      <div className="creators-grid">
        {creators.map((creator) => (
          <Link
            key={creator.profile.handle}
            className="creator-card"
            to={`/creators/${creator.profile.handle}`}
          >
            <div className="creator-image">
              {creator.profile.profileImage ? (
                <img 
                  src={creator.profile.profileImage} 
                  alt={creator.profile.name}
                  width={300}
                  height={300}
                />
              ) : (
                <div className="creator-image-placeholder">
                  {creator.profile.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="creator-info">
              <h2>{creator.profile.name}</h2>
              <p>{creator.profile.bio.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

