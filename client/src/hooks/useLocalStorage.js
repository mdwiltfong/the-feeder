import { useState, useEffect } from "react";

// A custom hook for handling state data synced with localStorage

// Creates `item` as state and looks in localStorage for current value; and utilizes
// default value, if not found.


function useLocalStorage(key, defaultValue = null) {
  const initialValue = localStorage.getItem(key) || defaultValue;

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    // Removes from localStorage, if new state is null
    if (item === null) {
      localStorage.removeItem(key);
    // Updates localStorage
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);
  return [item, setItem];
}

export default useLocalStorage;