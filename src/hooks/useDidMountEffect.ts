import { useRef, useEffect, DependencyList } from 'react';

export const useDidMountEffect = (callback: () => void, deps: DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
    } else {
      didMount.current = true;
    }
  }, deps);
};
