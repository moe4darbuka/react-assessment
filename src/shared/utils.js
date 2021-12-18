import { useState, useEffect, useRef } from "react";

export const useStateWithRef = (initialState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);

  useEffect(() => {
    ref.current = state; // sync ref with state
  });

  return [state, setState, ref];
};

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
