import { useUser } from "@shared/hooks";
import SubscriberCard from "./SubscriberCard";
import { UserInfo } from "@features/user/types/user.types";

interface SubscriberInfo {
  _id: string;
  channel: string;
  subscriber: UserInfo;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const data: SubscriberInfo[] = [
  {
    _id: "6769a8adda58d9bf2fb88c16",
    channel: "66a114b4f7311167ee925107",
    subscriber: {
      _id: "66a11425f7311167ee925102",
      username: "one",
      fullName: "Hiro",
      avatar:
        "http://res.cloudinary.com/dupwv0jas/image/upload/v1721832480/zhgvgkvl4yjdoj6db7pl.jpg",
    },
    createdAt: "2024-12-23T18:15:09.109Z",
    updatedAt: "2024-12-23T18:15:09.109Z",
    __v: 0,
  },
  {
    _id: "6769abfb096ef9763e892604",
    channel: "66a114b4f7311167ee925107",
    subscriber: {
      _id: "6769abd8096ef9763e8925fb",
      username: "three",
      fullName: "three",
      avatar:
        "http://res.cloudinary.com/dupwv0jas/image/upload/v1734978517/ixdy6uhhwmeuubdp9onq.jpg",
    },
    createdAt: "2024-12-23T18:29:15.128Z",
    updatedAt: "2024-12-23T18:29:15.128Z",
    __v: 0,
  },
];

const SubscriberList = () => {
  const { user } = useUser();

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h2 className="text-base sm:text-lg">Subscribers List</h2>
      <p className="text-gray-300">Your subsribers</p>
      <div className="card-container flex justify-start items-center gap-2 overflow-x-scroll  no-scrollbar">
        {data.map((subInfo) => (
          <SubscriberCard
            // channel={user}
            subscriptionInfo={subInfo}
            key={`sub-card-${subInfo.channel}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriberList;
