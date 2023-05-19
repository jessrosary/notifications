import { useState } from 'react';
import feedData from './feed.json';
import './App.css';

const ACTIVITIES = feedData.map((x) => {
  return {
    ...x,
    isRead: false,
  } as Activity;
});

type ActivityType =
  | 'postReaction'
  | 'follow'
  | 'privateMessage'
  | 'pictureComment'
  | 'groupJoin'
  | 'groupLeave';

interface Activity {
  user: string;
  activityType: ActivityType;
  isRead: boolean;
  timestamp: string;
  groupName?: string;
  message?: string;
  pictureUrl?: string;
  postTitle?: string;
  userImageUrl: string;
}

const exhaustiveMatchGuard = (_: never): never => {
  throw new Error('Impossible!');
};

const ActivityMessage: React.FC<{ activity: Activity }> = ({ activity: a }) => {
  console.log(a.activityType);

  switch (a.activityType) {
    case 'postReaction':
      return (
        <>
          reacted to your recent post <a>{a.postTitle}</a>
        </>
      );
    case 'follow':
      return <>followed you</>;
    case 'pictureComment':
      return (
        <>
          commented on your picture{' '}
          <img className='activity-photo' src={a.pictureUrl} />
        </>
      );
    case 'groupLeave':
      return (
        <>
          left the group <a>{a.groupName}</a>
        </>
      );
    case 'groupJoin':
      return (
        <>
          has joined your group <a>{a.groupName}</a>
        </>
      );
    case 'privateMessage':
      return <>sent you a private message</>;
    default:
      return exhaustiveMatchGuard(a.activityType);
  }
};

const unreadCount = (notifications: Activity[]) =>
  notifications.reduce((sum, a) => sum + (a.isRead ? 0 : 1), 0);

type NotificationProps = {
  notification: Activity;
  onClick: () => void;
};

const Notification: React.FC<NotificationProps> = ({
  notification: n,
  onClick,
}) => {
  return (
    <div className='Notification' onClick={onClick}>
      <img className='profile-photo' src={n.userImageUrl} />
      <strong>{n.user}</strong>&nbsp;
      <span>
        <ActivityMessage activity={n} />
        &nbsp;
        {!n.isRead && <button className='active-flag'></button>}
      </span>
      <br></br>
      {n.timestamp}
      {n.message && <div className='message'>{n.message}</div>}
    </div>
  );
};

function App() {
  const [notifications, setNotifications] = useState(ACTIVITIES);
  const [count, setCount] = useState(unreadCount(notifications));

  const markRead = (i: number) => {
    console.log(`marking ${i} as read`);
    notifications[i].isRead = true;
    setNotifications(notifications);
    setCount(unreadCount(notifications));
  };

  const markAllRead = () => {
    notifications.forEach((n) => (n.isRead = true));
    setNotifications(notifications);
    setCount(unreadCount(notifications));
  };

  console.log('render', { count });

  return (
    <div className='App'>
      <div className='header'>
        <span>
          <strong>Notifications</strong>
          {count !== 0 && <button className='count'>{count}</button>}
        </span>
        <div onClick={markAllRead}>Mark all as read</div>
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
