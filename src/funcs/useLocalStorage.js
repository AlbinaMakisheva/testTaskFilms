import { useState, useRef, useEffect } from "react";

function useLocalStorage(
  key,
  defVal = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    const valInStorage = window.localStorage.getItem(key);
    if (valInStorage) {
      try {
        return deserialize(valInStorage);
      } catch (err) {
        window.localStorage.removeItem(key);
      }
    }
    return typeof defVal === "function" ? defVal() : defVal;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

export default useLocalStorage;
