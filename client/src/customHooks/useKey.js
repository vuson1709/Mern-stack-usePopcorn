import { useEffect } from "react";

export function useKey(keyName, action) {
  useEffect(
    function () {
      const callback = function (e) {
        if (e.key.toLowerCase() === keyName.toLowerCase()) {
          action();
        }
      };

      document.addEventListener("keydown", callback);

      return () => document.removeEventListener("keydown", callback);
    },
    [keyName, action]
  );
}
