"use client";

import React from "react";
import { useItemInfoStore } from "~~/services/store/ownerAddress";

/**
 * Site header
 */
export const Header = () => {

  const { itemName } = useItemInfoStore();
  
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start flex-grow" />
      <div className="navbar-center">
        <div className="text-sm text-center py-2 px-2 rounded-lg font-bold">
          {itemName}
        </div>
      </div>
      <div className="navbar-end flex-grow" />
    </div>
  );
};
