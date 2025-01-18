import React from "react";
import SubscriptionList from "./SubscriptionsList";
import SubscriberList from "./SubscribersList";

const SubscriptionPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-4 mx-auto justify-center items-center">
      <div className="w-full">
        <SubscriptionsList />
      </div>
      <div className="w-full">
        <SubscribersList />
      </div>
    </div>
  );
};

export default SubscriptionPage;
