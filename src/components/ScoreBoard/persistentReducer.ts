import * as storage from "./storage";

export const persistentReducer = function <R extends { (a, b): any }>(
  reducer: R,
  key: string
): R {
  return ((s, a) => {
    const newState = reducer(s, a);
    storage.setItem(key, JSON.stringify(newState));
    return newState;
  }) as R;
};

export const loadState = <V>(key: string, defaultvalue: V): V => {
  try {
    const serializedState = storage.getItem(key);
    if (serializedState === null) {
      return defaultvalue;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultvalue;
  }
};
