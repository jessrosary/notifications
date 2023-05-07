import { useState, useEffect } from 'react'
import { notifications } from './feed.json'
import './App.css'

interface Data{
  user: string;
  img: string;
  action: string;
  timestamp: string;
  isActive: boolean;
  post?: string;
  group?: string;
  message?: string;
  picture?: string;
}

const Notification = (props: any) => {
  return (
    <div className='notification' onClick={props.onClick} style={props.style}>
      <img src={props.img} />
      {props.user}&nbsp;{props.action}&nbsp;{props.group || props.post}<br>
          </br>{props.timestamp}
          {props.message && <p>{props.message}</p>}
    </div>
  )
}


function App() {
  const [isActive, setActive] = useState()

  const newFeed = notifications.map((n) => {
    return {
      ...n,
      isActive: true
    } as Data
  }) 

  const [feed, setFeed] = useState(newFeed)


  return (
    <div className="App">
      <div onClick={() => console.log('marking all as read')}>Mark all as read</div>
      {feed.map((n, i) => (
        <Notification 
          key={i} 
          {...n}
          onClick={() => console.log(`setting state for ${n.user}`)}
          />
      ))}
    </div>
  )
}

export default App
