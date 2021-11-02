import './App.css';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import React, { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')

  if(!localStorage.getItem('username')) return <LoginForm />

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='search a user' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Start
				</button>
			</div>
		)
	}

  
  return (
    <ChatEngine
      height = "100vh"
      projectID = "d6659289-7bdd-4e9f-811e-3a55227c4d5c"
      userName = {localStorage.getItem('username')}
      userSecret = {localStorage.getItem('password')}

      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      renderNewChatForm={(creds) => renderChatForm(creds)}

    />
  );
}

export default App;
