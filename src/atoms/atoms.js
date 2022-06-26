import { atom } from "recoil";

export const tabState = atom({
  key: "tabstate",
  default: "all",
});

export const poolState = atom({
  key: "poolState",
  default: {
    selectedRoute: null,
    pools: [],
    isSelected: false,
  },
});

export const routesState = atom({
  key: "routesState",
  default: [null],
});

export const modalState = atom({
  key: "modalState",
  default: {
    modal: false,
    button: false,
  },
});
