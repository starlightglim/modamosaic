import {useMatches} from '@remix-run/react';
import {useMemo} from 'react';
import {Creator, CreatorHandle} from './types';
import {getCreatorByHandle} from './config';

interface RouteDataWithCreator {
  creator: Creator;
  [key: string]: unknown;
}

/**
 * Use creator data from the current route (if available)
 */
export function useCreator(): Creator | undefined {
  const matches = useMatches();
  
  return useMemo(() => {
    // Find a route that includes creator data
    const match = matches.find(
      (match) => match.data && typeof match.data === 'object' && 'creator' in match.data
    );
    
    if (match?.data && typeof match.data === 'object' && 'creator' in match.data) {
      const routeData = match.data as RouteDataWithCreator;
      return routeData.creator;
    }
    
    return undefined;
  }, [matches]);
}

/**
 * Use creator handle from the current route params
 */
export function useCreatorHandle(): CreatorHandle | undefined {
  const matches = useMatches();
  
  return useMemo(() => {
    // Find a route with params that include a handle
    for (const match of matches) {
      if (match.params && match.params.handle) {
        return match.params.handle;
      }
    }
    
    return undefined;
  }, [matches]);
}

/**
 * Use creator theme
 */
export function useCreatorTheme() {
  const creator = useCreator();
  
  return creator?.theme;
}

/**
 * Hook to check if we're in a creator context
 */
export function useIsCreatorContext(): boolean {
  const handle = useCreatorHandle();
  return handle !== undefined;
}

/**
 * Hook to get creator by handle
 */
export function useCreatorByHandle(handle: CreatorHandle): Creator | undefined {
  return useMemo(() => {
    if (!handle) return undefined;
    return getCreatorByHandle(handle);
  }, [handle]);
}

