import UserAvatar from "@features/user/components/UserAvatar";
import { UserInfo } from "@features/user/types/user.types";
import { Button } from "@shared/components";
// import { User } from "@shared/types/user.types";
import React from "react";
import { toggleSubscription } from "../services/subscription.services";

interface SubscriptionInfo {
  _id: string;
  channel: string;
  subscriber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subscribedTo: UserInfo;
}

const SubscriptionCard: React.FC<{
  subscriptionInfo: SubscriptionInfo;
}> = ({ subscriptionInfo }) => {
  const { subscribedTo } = subscriptionInfo;

  const handleToggleSubscription = async () => {
    const hehe = await toggleSubscription(subscribedTo._id);
    console.log(hehe);
  };

  return (
    <div className="flex gap-2">
      <UserAvatar src={subscribedTo.avatar} username={subscribedTo.username} />
      <div className="side-container">
        <span>{subscribedTo.username}</span>
        <Button className={`bg-gray-600 text-gray-300`} onClick={handleToggleSubscription}>
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
