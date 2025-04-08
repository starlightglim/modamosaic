import React from 'react';
import { Link } from '@remix-run/react';

export type WindowContentType = 'image' | 'video' | 'gif' | 'link' | 'text';

interface BaseWindowContent {
  type: WindowContentType;
  title: string;
}

interface ImageWindowContent extends BaseWindowContent {
  type: 'image';
  src: string;
  alt: string;
}

interface VideoWindowContent extends BaseWindowContent {
  type: 'video';
  src: string;
  poster?: string;
}

interface GifWindowContent extends BaseWindowContent {
  type: 'gif';
  src: string;
}

interface LinkWindowContent extends BaseWindowContent {
  type: 'link';
  path: string;
  description: string;
}

interface TextWindowContent extends BaseWindowContent {
  type: 'text';
  content: string;
}

export type WindowContent =
  | ImageWindowContent
  | VideoWindowContent
  | GifWindowContent
  | LinkWindowContent
  | TextWindowContent;

interface WindowContentProps {
  content: WindowContent;
}

export const MacWindowContent: React.FC<WindowContentProps> = ({ content }) => {
  switch (content.type) {
    case 'image':
      return (
        <div className="flex flex-col items-center">
          <img 
            src={content.src} 
            alt={content.alt}
            className="max-w-full max-h-full object-contain"
          />
          <p className="text-sm mt-2 text-center">{content.alt}</p>
        </div>
      );
    
    case 'video':
      return (
        <div className="flex flex-col items-center">
          <video 
            src={content.src} 
            poster={content.poster}
            controls
            className="max-w-full max-h-full"
          />
          <p className="text-sm mt-2 text-center">{content.title}</p>
        </div>
      );
    
    case 'gif':
      return (
        <div className="flex flex-col items-center">
          <img 
            src={content.src}
            alt={content.title}
            className="max-w-full max-h-full object-contain"
          />
          <p className="text-sm mt-2 text-center">{content.title}</p>
        </div>
      );
    
    case 'link':
      return (
        <div className="flex flex-col items-center">
          <Link 
            to={content.path}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {content.title}
          </Link>
          <p className="text-sm mt-2 text-center">{content.description}</p>
        </div>
      );
    
    case 'text':
      return (
        <div className="font-mono text-sm whitespace-pre-wrap">
          {content.content}
        </div>
      );
    
    default:
      return <div>Unsupported content type</div>;
  }
}; 