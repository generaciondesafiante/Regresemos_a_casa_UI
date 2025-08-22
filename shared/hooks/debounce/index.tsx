import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId); 
  }, [value, delay]);

  return debouncedValue;
};
export default useDebounce;