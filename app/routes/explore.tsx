import React from 'react';
import { type MetaFunction, Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { useNonce } from '@shopify/hydrogen';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import { MacWorkspace } from '~/components/MacWorkspace';
import { type WindowContent } from '~/components/MacWindowContent';

export const meta: MetaFunction = () => {
  return [
    { title: 'ModaMosaic | Explore' },
    { name: 'description', content: 'Explore ModaMosaic content' },
  ];
};

export function links() {
  return [
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: appStyles },
  ];
}

// Sample window content data
const sampleWindows = [
  {
    id: 'window1',
    title: 'Welcome to ModaMosaic',
    content: {
      type: 'text' as const,
      title: 'Welcome Message',
      content: 'Welcome to the Explore page of ModaMosaic.\nDrag windows around and resize them to explore our content!'
    },
    defaultPosition: { x: 50, y: 50 },
    defaultSize: { width: 350, height: 200 }
  },
  {
    id: 'window2',
    title: 'Featured Collection',
    content: {
      type: 'image' as const,
      title: 'Featured Collection',
      src: '/images/sample/collection.jpg',
      alt: 'Featured clothing collection'
    },
    defaultPosition: { x: 150, y: 120 },
    defaultSize: { width: 400, height: 350 }
  },
  {
    id: 'window3',
    title: 'Latest Release',
    content: {
      type: 'gif' as const,
      title: 'Latest Release Preview',
      src: '/images/sample/release.gif'
    },
    defaultPosition: { x: 450, y: 80 },
    defaultSize: { width: 320, height: 320 }
  },
  {
    id: 'window4',
    title: 'Shop Now',
    content: {
      type: 'link' as const,
      title: 'Visit Store',
      path: '/collections/all',
      description: 'Check out our latest products and collections'
    },
    defaultPosition: { x: 250, y: 250 },
    defaultSize: { width: 300, height: 200 }
  }
];

// This is a standalone page with its own layout
export default function ExplorePage() {
  const nonce = useNonce();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container mx-auto py-12 px-4">
          <header className="mb-8">
            <nav className="flex justify-between items-center">
              <a href="/" className="text-xl font-bold">ModaMosaic</a>
              <div className="flex space-x-6">
                <a href="/collections/all" className="hover:underline">Shop</a>
                <a href="/explore" className="hover:underline font-bold">Explore</a>
              </div>
            </nav>
          </header>

          {/* Section 1: Mac-styled Workspace */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8 font-jacquard">Interactive Workspace</h2>
            <div className="rounded-lg overflow-hidden border-2 border-black">
              <MacWorkspace windows={sampleWindows} />
            </div>
            <p className="text-sm mt-4 text-gray-600">
              Drag windows around, resize them, and click on them to bring them to the front
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8 font-jacquard">Featured Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Content cards for section 2 */}
              <div className="p-6 border-2 border-black rounded-lg">
                <h3 className="text-xl font-bold mb-4">Vintage Collections</h3>
                <div className="aspect-video bg-gray-200 mb-4 rounded"></div>
                <p>Explore our curated selection of vintage fashion pieces from the archives.</p>
              </div>
              <div className="p-6 border-2 border-black rounded-lg">
                <h3 className="text-xl font-bold mb-4">Creator Spotlight</h3>
                <div className="aspect-video bg-gray-200 mb-4 rounded"></div>
                <p>Meet the talented designers behind ModaMosaic's latest collections.</p>
              </div>
              <div className="p-6 border-2 border-black rounded-lg">
                <h3 className="text-xl font-bold mb-4">Behind the Scenes</h3>
                <div className="aspect-video bg-gray-200 mb-4 rounded"></div>
                <p>Gain insights into our creative process and production techniques.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8 font-jacquard">Coming Soon</h2>
            <div className="bg-gray-100 p-10 border-2 border-black rounded-lg">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Limited Edition Releases</h3>
                <p className="mb-6">Subscribe to our newsletter to get notified about upcoming exclusive drops and collaborations.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-2 border-2 border-black rounded-lg"
                  />
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
} 