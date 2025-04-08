import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';

interface MacWindowProps {
  id: string;
  title: string;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  children: React.ReactNode;
  onFocus?: () => void;
  zIndex: number;
}

export function MacWindow({
  id,
  title,
  defaultPosition = { x: 20, y: 20 },
  defaultSize = { width: 350, height: 300 },
  minWidth = 200,
  minHeight = 150,
  children,
  onFocus,
  zIndex
}: MacWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  return (
    <Rnd
      default={{
        ...defaultPosition,
        ...defaultSize,
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      style={{
        zIndex,
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      }}
      bounds="parent"
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={() => setIsResizing(false)}
      onClick={onFocus}
      dragHandleClassName="mac-window-title-bar"
    >
      <div
        id={id}
        className={`flex flex-col bg-white border-2 border-black h-full rounded-lg overflow-hidden ${
          isDragging || isResizing ? 'cursor-grabbing' : ''
        }`}
      >
        <div className="mac-window-title-bar flex items-center bg-gradient-to-r from-gray-700 to-gray-900 px-2 py-1 cursor-grab">
          <div className="flex space-x-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer" />
          </div>
          <div className="text-white text-sm font-medium truncate flex-1 text-center">
            {title}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-white">
          {children}
        </div>
      </div>
    </Rnd>
  );
} 