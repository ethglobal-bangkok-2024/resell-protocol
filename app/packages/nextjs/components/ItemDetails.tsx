'use client'
import Collapse from "./common/Collapse";

const ItemDetails = ({
  productManufactureData,
  productTransferData
}: {
  productManufactureData: any | null;
  productTransferData: any | null;
}) => {

  console.log("productManufactureData", productManufactureData);
  console.log("productTransferData", productTransferData);

  const currentPrice = productTransferData?.decoded.price || 100;
  const productInfo = productManufactureData?.decoded || {};

  return (
    <Collapse title="Item Details">
      <div className="flex flex-col space-y-1.5">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Current Price</p>
          <p className="font-medium text-lg text-primary">
            ${currentPrice || "Loading..."}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Brand</p>
          <p className="font-medium">{productInfo.brand || "Loading..."}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Model</p>
          <p className="font-medium">{productInfo.model || "Loading..."}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Chip ID</p>
          <p className="font-medium">{productInfo.model || "ABC123XYZ"}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Model</p>
          <p className="font-medium">{productInfo.model || "Loading..."}</p>
        </div>
      </div>
    </Collapse>
  );
};

export default ItemDetails;
