import './App.css'
import { users } from './userData.js'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export default function App() {
  return (
    <section className='App'>
      <h2>Who to follow</h2>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}