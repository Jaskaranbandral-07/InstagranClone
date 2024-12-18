import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Messages.css';

function Messages() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/conversations/${user._id}`);
                setConversations(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchConversations();
    }, [user._id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (currentChat) {
                    const res = await axios.get(`http://localhost:5000/api/messages/${currentChat._id}`);
                    setMessages(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post('http://localhost:5000/api/messages', {
                conversationId: currentChat._id,
                sender: user._id,
                text: newMessage
            });
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="messages">
            <div className="messages__sidebar">
                <div className="messages__header">
                    <h3>{user.username}</h3>
                </div>
                {conversations.map((conv) => (
                    <div
                        key={conv._id}
                        className={`conversation ${currentChat?._id === conv._id ? 'active' : ''}`}
                        onClick={() => setCurrentChat(conv)}
                    >
                        <img src={conv.profilePic} alt="" />
                        <span>{conv.username}</span>
                    </div>
                ))}
            </div>

            <div className="messages__chatBox">
                {currentChat ? (
                    <>
                        <div className="messages__chatHeader">
                            <img src={currentChat.profilePic} alt="" />
                            <span>{currentChat.username}</span>
                        </div>
                        <div className="messages__chatMessages">
                            {messages.map((message) => (
                                <div
                                    ref={scrollRef}
                                    key={message._id}
                                    className={`message ${message.sender === user._id ? 'own' : ''}`}
                                >
                                    <p>{message.text}</p>
                                    <div className="message__timestamp">
                                        {new Date(message.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form className="messages__chatInput" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Write a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </>
                ) : (
                    <div className="messages__noChat">
                        <p>Open a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages; 