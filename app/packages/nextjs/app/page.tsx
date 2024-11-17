'use client'
import ItemDetails from "../components/ItemDetails";
import Timeline from "../components/Timeline";
import { useEffect, useState } from "react";
import { useAttestation } from "~~/hooks/scaffold-eth/useAttestation";
import { useItemInfoStore } from "~~/services/store/ownerAddress";

const Home = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { setOwnerAddress, setItemName } = useItemInfoStore();

  const [productTransferData, setProductTransferData] = useState<any[] | null>(null);
  const [productRecordData, setProductRecordData] = useState<any[] | null>(null);
  const [productManufactureData, setProductManufactureData] = useState<any | null>(null)
  const { getProductTransferAttestation, getProductRecordAttestation, getProductManufactureAttestation } = useAttestation();

  const chainId = searchParams.chainId as string;
  const chipId = searchParams.chipId as string;
  const address = searchParams.address as string;

  const pbtAddressWithChainId = `${chainId}:${address}`;

  const [combinedEvents, setCombinedEvents] = useState<any[]>([]);

  const indexingValue = `${chainId}:${address}:${chipId}`;
  console.log("indexingValue", indexingValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transferData, recordData, manufactureData] = await Promise.all([
          getProductTransferAttestation(indexingValue),
          getProductRecordAttestation(indexingValue),
          getProductManufactureAttestation(indexingValue)
        ]);

        setProductTransferData(transferData || null);
        setProductRecordData(recordData || null);
        setProductManufactureData(manufactureData || null);

        if (productTransferData || productRecordData) {
          const combined = [
            ...(productTransferData || []),
            ...(productRecordData || []),
            ...(productManufactureData || []),
          ].sort((a, b) => {
            const timestampA = Number(a.decodedData.timestamp);
            const timestampB = Number(b.decodedData.timestamp);
            return timestampB - timestampA;
          });
          setCombinedEvents(combined);

          const latestSaleEvent = combined.find(event => (event as any).type === 'transfer');
          if (latestSaleEvent) {
            setOwnerAddress(latestSaleEvent.schema.extra.toAddress);
          }
        }

        /*if (productManufactureData) {
          setItemName(productManufactureData.schema.extra.itemName);
        }*/

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pbtAddressWithChainId, setOwnerAddress, productTransferData, productRecordData]);

  return (
    <div className="pb-20">
      <div className="space-y-4">
        <Timeline combinedEvents={combinedEvents} />

        <div className="h-px bg-gray-200" />
      </div>
    </div>
  )
};

export default Home;

/*
 <ItemDetails
          productManufactureData={productManufactureData}
          productTransferData={productTransferData} />*/