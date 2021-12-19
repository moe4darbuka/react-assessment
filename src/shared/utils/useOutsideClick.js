import { useEffect } from "react";

const useOutsideClick = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!ref.current.contains(e.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;
