import { useState, useEffect } from "react";

export function useLocalStorage(initialState, keyName) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(keyName);
    return item ? JSON.parse(item) : initialState;
  });

  // Hook for local storage
  useEffect(
    function () {
      localStorage.setItem(keyName, JSON.stringify(value));
    },
    [value, keyName]
  );
  return [value, setValue];
}
