import { create } from 'zustand';

interface ItemInfo {
  ownerAddress: string;
  itemName: string;
  setOwnerAddress: (address: string) => void;
  setItemName: (itemName: string) => void;
}

export const useItemInfoStore = create<ItemInfo>((set) => ({
  ownerAddress: "supermayu.converse.xyz",
  itemName: "Sample Item",
  setOwnerAddress: (address) => {
    set({ ownerAddress: address });
  },
  setItemName: (itemName) => {
    set({ itemName: itemName });
  },
}));