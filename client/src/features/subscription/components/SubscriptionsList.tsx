import { useUser } from "@shared/hooks";
import { UserInfo } from "@features/user/types/user.types";
import SubscriptionCard from "./SubscriptionCard";

interface SubscriptionInfo {
  _id: string;
  channel: string;
  subscriber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subscribedTo: UserInfo;
}

const data: SubscriptionInfo[] = [
  {
    _id: "6769af4b096ef9763e892620",
    channel: "66a11425f7311167ee925102",
    subscriber: "66a114b4f7311167ee925107",
    createdAt: "2024-12-23T18:43:23.649Z",
    updatedAt: "2024-12-23T18:43:23.649Z",
    __v: 0,
    subscribedTo: {
      _id: "66a11425f7311167ee925102",
      username: "one",
      fullName: "Hiro",
      avatar:
        "http://res.cloudinary.com/dupwv0jas/image/upload/v1721832480/zhgvgkvl4yjdoj6db7pl.jpg",
    },
  },
  {
    _id: "6769af7d096ef9763e892626",
    channel: "6769abd8096ef9763e8925fb",
    subscriber: "66a114b4f7311167ee925107",
    createdAt: "2024-12-23T18:44:13.780Z",
    updatedAt: "2024-12-23T18:44:13.780Z",
    __v: 0,
    subscribedTo: {
      _id: "6769abd8096ef9763e8925fb",
      username: "three",
      fullName: "three",
      avatar:
        "http://res.cloudinary.com/dupwv0jas/image/upload/v1734978517/ixdy6uhhwmeuubdp9onq.jpg",
    },
  },
];

const SubscriptionList = () => {
  const { user } = useUser();

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
        Subscription List
      </h2>
      <p className="text-gray-300">Channels subscribed by the user</p>
      <div className="card-container flex gap-2 no-scrollbar overflow-x-scroll ">
        {data.map((subInfo) => (
          <SubscriptionCard
            // channel={user}
            subscriptionInfo={subInfo}
            key={`sub-card-${subInfo.channel}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;
