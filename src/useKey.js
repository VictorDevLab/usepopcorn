import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      //as soon as the movieDetails unmounts or re-renders we remove the event listener
      //to avoid many event listener in our DOM that might cause memory issues
      return function () {
        //the function  to be removed must be the same as the one added event listener on
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
