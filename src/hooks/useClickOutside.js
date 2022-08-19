// useClickOutside 會回傳一個 domNode
// 當情況符合時
// 執行 callback: () => {setShowModal(false);}

import { useEffect, useRef } from "react";

export default function useClickOutside(func) {
  const domNode = useRef();
  useEffect(() => {
    const handler = (event) => {
      console.log(domNode.current.contains(event.target));
      if (!domNode.current.contains(event.target)) {
        func();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [func]);

  return domNode;
}
