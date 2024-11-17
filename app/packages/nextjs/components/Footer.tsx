import React, { useEffect } from "react";
import Link from "next/link";
import { useItemInfoStore } from "~~/services/store/ownerAddress";

/**
 * Site footer
 */
export const Footer = () => {
  const { ownerAddress } = useItemInfoStore();
  
  // デバッグ用（開発時のみ）
  useEffect(() => {
    console.log("Current ownerAddress:", ownerAddress);
  }, [ownerAddress]);

  const ownerMessageLink = `converse://dm?peer=${ownerAddress}`;
  const botMessageLink = "converse://dm?peer=resellbkk.converse.xyz";

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
      <div className="flex gap-4">
        <Link href={ownerMessageLink} className="flex-1">
          <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-medium">
            Contact Owner
          </button>
        </Link>
        <Link href={botMessageLink} className="flex-1">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
            Make an offer
          </button>
        </Link>
      </div>
    </div>
  );
};
