'use client'
import { formatEther } from "viem";
import { ChatBubbleOvalLeftIcon, CurrencyDollarIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { getIpfsUrl } from "~~/utils/ipfs";
import { useItemInfoStore } from "~~/services/store/ownerAddress";
import { useEffect } from "react";

const Timeline = ({
  combinedEvents
}: {
  combinedEvents: any[];
}) => {

  const { setItemName } = useItemInfoStore();

  useEffect(() => {
    if (combinedEvents.length > 0) {
      const event = combinedEvents[0];
      if (event.decodedData.brand && event.decodedData.model) {
        setItemName(event.decodedData.brand + " " + event.decodedData.model);
      }
    }
  }, [combinedEvents, setItemName]);

  const formatTimestamp = (timestamp: number | bigint) => {
    const timestampNum = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
    const date = new Date(timestampNum);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getEventIcon = (type: string) => {
    const iconClasses = {
      transfer: "w-5 h-5 sm:w-6 sm:h-6 text-blue-500",
      manufacture: "w-5 h-5 sm:w-6 sm:h-6 text-green-500",
      record: "w-5 h-5 sm:w-6 sm:h-6 text-purple-500"
    };

    const iconBgClasses = {
      transfer: "bg-blue-50",
      manufacture: "bg-green-50",
      record: "bg-purple-50"
    };

    return {
      icon: type === "record" ? (
        <ChatBubbleOvalLeftIcon className={iconClasses[type as keyof typeof iconClasses]} />
      ) : type === "manufacture" ? (
        <WrenchScrewdriverIcon className={iconClasses[type as keyof typeof iconClasses]} />
      ) : (
        <CurrencyDollarIcon className={iconClasses[type as keyof typeof iconClasses]} />
      ),
      bgClass: iconBgClasses[type as keyof typeof iconBgClasses] || "bg-gray-50"
    };
  };

  const renderEventContent = (eventData: any) => {
    const { type, decodedData } = eventData;
    const { icon, bgClass } = getEventIcon(type);

    const event = {
      ...decodedData,
      type,
      imageUrl: decodedData.cid ? getIpfsUrl(decodedData.cid) : null
    };

    return (
      <div className="w-full bg-white rounded-xl p-3 sm:p-4 mb-3 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className={`rounded-full p-1.5 sm:p-2 flex-shrink-0 ${bgClass}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <span className="font-medium text-sm sm:text-[15px] truncate">
                {formatAddress(event.ownerAddress || event.toAddress)}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                {formatTimestamp(event.timestamp)}
              </span>
            </div>
            {(type === "transfer") && (
              <div className="mt-0.5 sm:mt-1">
                <span className="text-base sm:text-lg font-bold text-blue-600">
                  ${formatEther(event.price)}
                </span>
              </div>
            )}
            {event.textRecord && (
              <p className="text-sm sm:text-[15px] text-gray-700 mt-1 whitespace-pre-wrap break-words">
                {event.textRecord}
              </p>
            )}
            {type === "manufacture" && (
              <p className="text-sm sm:text-[15px] text-gray-700 mt-1 whitespace-pre-wrap break-words">
                {event.brand} {event.model} has created!✨
              </p>
            )}
            {event.imageUrl && (
              <div className="relative w-full mt-2 rounded-lg overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={event.imageUrl}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="px-3 sm:px-4">
        {combinedEvents.map((event) => (
          <div key={event.id}>
            {renderEventContent(event)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
