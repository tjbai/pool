import { atom } from "recoil";

export const tabState = atom({
  key: "tabstate",
  default: "all",
});

export const poolState = atom({
  key: "poolState",
  default: {
    selectedPool: null,
    pools: [],
  },
});

export const routesState = atom({
  key: "routesState",
  default: {
    directions: [],
  },
});
