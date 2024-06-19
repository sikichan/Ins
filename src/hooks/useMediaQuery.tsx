import { useSyncExternalStore } from 'react';

const useMediaQuery = (query: string) => {
  function subscribe(cb: () => void) {
    const queryList = window.matchMedia(query);
    queryList.addEventListener('change', cb);
    return () => queryList.removeEventListener('change', cb);
  }

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  return useSyncExternalStore(subscribe, getSnapshot);
};
export default useMediaQuery;
