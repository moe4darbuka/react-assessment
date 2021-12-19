import { useState, useEffect, useRef } from "react";

const useStateWithRef = (initialState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);

  useEffect(() => {
    ref.current = state; // sync ref with state
  });

  return [state, setState, ref];
};

export default useStateWithRef;
