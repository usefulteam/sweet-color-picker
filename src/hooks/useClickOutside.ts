import { useEffect } from "react";

/**
 * Thank you:
 * - https://codesandbox.io/s/opmco?file=/src/useClickOutside.js:0-1192
 * - https://usehooks.com/useOnClickOutside/
 */
const useClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    let startedWhenMounted: boolean = false;
    let startedInside: boolean = false;

    const listener = (event: Event) => {
      // Do nothing if `mousedown` or `touchstart` started either inside inputRef or ref element
      if (!startedWhenMounted || startedInside) return;

      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler();
    };

    const validateEventStart = (event: Event) => {
      startedWhenMounted = ref.current ? true : false;
      startedInside = ref.current && ref.current.contains(event.target as Node);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
