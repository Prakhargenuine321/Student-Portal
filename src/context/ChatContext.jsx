import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getMessages, sendMessage } from '../services/chatService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student-student'); // or 'student-teacher'
  const [error, setError] = useState(null);

  // Load initial messages
  useEffect(() => {
    if (!user) return;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const messagesData = await getMessages(activeTab);
        setMessages(messagesData);
      } catch (err) {
        setError('Failed to load messages. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [user, activeTab]);

  // Send a new message
  const sendNewMessage = async (content) => {
    if (!user || !content.trim()) return;

    try {
      setLoading(true);
      const newMessage = await sendMessage({
        content,
        sender: user.id,
        senderName: user.name,
        senderRole: user.role,
        chatType: activeTab,
        timestamp: new Date().toISOString(),
      });

      setMessages(prev => [...prev, newMessage]);
      return { success: true, message: newMessage };
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Change active tab
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      loading,
      error,
      activeTab,
      sendMessage: sendNewMessage,
      switchTab,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;