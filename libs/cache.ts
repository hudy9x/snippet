const localStore = window.localStorage;
export const setCache = (name: string, value: unknown) => {
  localStore.setItem(name, JSON.stringify(value));
};

export const getCache = (name: string) => {
  return localStore.getItem(name);
};
