const IPFS_GATEWAY_URL = "https://ipfs.io/ipfs/";

export const getIpfsUrl = (cid: string) => {
    if (!cid) return null;
    return `${IPFS_GATEWAY_URL}${cid}`;
};

