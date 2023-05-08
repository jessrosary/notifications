import { useState } from 'react';
import feedData from './feed.json';
import './App.css';

const FEED = feedData.map((n) => {
  return {
    ...n,
    isRead: false,
  } as Data;
});

interface Data {
  user: string;
  img: string;
  action: string;
  timestamp: string;
  isRead: boolean;
  post?: string;
  group?: string;
  message?: string;
  picture?: string;
}

const unreadCount = (notifications: Data[]) =>
  notifications.reduce((sum, data) => sum + (data.isRead ? 0 : 1), 0);

type NotificationProps = {
  notification: Data;
  onClick: () => void;
};

// add type for props with notification field with Data type
// const Notification = (props: any) => {
const Notification: React.FC<NotificationProps> = ({
  notification: n,
  onClick,
}) => {
  return (
    <div className='notification' onClick={onClick}>
      <img src={n.img} />
      {n.user}&nbsp;{n.action}&nbsp;{n.group || n.post}
      <br></br>
      {n.timestamp}
      {n.message && <p>{n.message}</p>}
    </div>
  );
};

function App() {
  const [notifications, setNotifications] = useState(FEED);
  const [count, setCount] = useState(unreadCount(notifications));

  const markRead = (i: number) => {
    console.log(`marking ${i} as read`);
    notifications[i].isRead = true;
    setNotifications(notifications);
    setCount(unreadCount(notifications));
  };

  console.log('render', { count });

  return (
    <div className='App'>
      <div>
        Notifications <button>{count}</button>
      </div>
      <div onClick={() => console.log('marking all as read')}>
        Mark all as read
      </div>
      {notifications.map((notification, i) => (
        <Notification
          key={i}
          notification={notification}
          onClick={() => markRead(i)}
        />
      ))}
    </div>
  );
}

export default App;
