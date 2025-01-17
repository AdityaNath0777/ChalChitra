import UserAvatar from "@features/user/components/UserAvatar";
import { UserInfo } from "@features/user/types/user.types";
import { Button } from "@shared/components";
// import { User } from "@shared/types/user.types";
import React from "react";
import { toggleSubscription } from "../services/subscription.services";

interface SubscriberInfo {
  _id: string;
  channel: string;
  subscriber: UserInfo;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SubscriberCard: React.FC<{
  // channel: UserInfo;
  subscriptionInfo: SubscriberInfo;
}> = ({ subscriptionInfo }) => {
  const { subscriber } = subscriptionInfo;

  const handleToggleSubscription = async ()=> {
    const hehe = await toggleSubscription(subscriber._id);
    console.log(hehe);
  }

  return (
    <div className="flex gap-2">
      <UserAvatar src={subscriber.avatar} username={subscriber.username} />
      <div className="side-container">
        <span>

        {subscriber.username}
        </span>
        <Button className={`bg-red-600 text-gray-300`} onClick={handleToggleSubscription}>Subscribe</Button>
      </div>
    </div>
  );
};

export default SubscriberCard;
