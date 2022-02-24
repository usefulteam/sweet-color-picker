import { useEffect } from "react";

const useFocusOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (e: Event) => {
      // Do nothing if the component hasn't been mounted.
      if (!ref.current) return;

      // Do nothing if the focused element is inside the ref or the ref it self.
      if (ref.current.contains(e.target as Node)) return;

      handler();
    };

    document.addEventListener("focus", listener, true);

    return () => {
      document.removeEventListener("focus", listener, true);
    };
  }, [ref, handler]);
};

export default useFocusOutside;
