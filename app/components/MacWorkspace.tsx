import React, { useState } from 'react';
import { MacWindow } from './MacWindow';
import { MacWindowContent, type WindowContent } from './MacWindowContent';

interface MacWorkspaceProps {
  windows: Array<{
    id: string;
    title: string;
    content: WindowContent;
    defaultPosition?: { x: number; y: number };
    defaultSize?: { width: number; height: number };
  }>;
}

export function MacWorkspace({ windows }: MacWorkspaceProps) {
  // Track the z-index for each window to handle focus
  const [windowOrder, setWindowOrder] = useState<string[]>(windows.map(w => w.id));

  const bringToFront = (id: string) => {
    setWindowOrder(prev => [
      id,
      ...prev.filter(windowId => windowId !== id),
    ]);
  };

  // Get z-index for a window (higher value = more in front)
  const getZIndex = (id: string) => {
    const index = windowOrder.indexOf(id);
    return 1000 - index; // Higher z-index for windows at the front of the array
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-[#f0f0f0] rounded-lg border-2 border-black overflow-hidden">
      {/* Desktop background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-50 grid grid-cols-12 grid-rows-12">
        {Array.from({ length: 144 }).map((_, i) => (
          <div 
            key={i} 
            className="border-[0.5px] border-gray-300 opacity-30"
          />
        ))}
      </div>
      
      {/* Windows */}
      {windows.map((window) => (
        <MacWindow
          key={window.id}
          id={window.id}
          title={window.title}
          defaultPosition={window.defaultPosition}
          defaultSize={window.defaultSize}
          onFocus={() => bringToFront(window.id)}
          zIndex={getZIndex(window.id)}
        >
          <MacWindowContent content={window.content} />
        </MacWindow>
      ))}
    </div>
  );
} 