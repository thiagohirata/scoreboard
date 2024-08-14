export const setItem = (a: string, b: string) => {
  try {
    localStorage.setItem(a, b);
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (a: string) => {
  try {
    localStorage.removeItem(a);
  } catch (error) {}
};

export const getItem = (a: string) => {
  try {
    const value = localStorage.getItem(a);
    if (value) {
      return value;
    }
  } catch (error) {}
  return null;
};

export type Storage = {
  setItem: typeof setItem;
  removeItem: typeof removeItem;
  getItem: typeof getItem;
};
