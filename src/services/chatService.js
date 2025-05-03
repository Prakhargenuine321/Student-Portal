// Mock chat service
// In a real application, these functions would make API calls to a backend server

// Sample messages
let messages = [
  // Student-Student messages
  {
    id: '1',
    content: 'Hi everyone! Does anyone have notes for today\'s lecture?',
    sender: '4',
    senderName: 'Alice Student',
    senderRole: 'student',
    chatType: 'student-student',
    timestamp: '2023-10-12T08:30:00Z',
  },
  {
    id: '2',
    content: 'Yes, I took detailed notes. I can share them after class.',
    sender: '5',
    senderName: 'Bob Student',
    senderRole: 'student',
    chatType: 'student-student',
    timestamp: '2023-10-12T08:32:00Z',
  },
  {
    id: '3',
    content: 'That would be great! Thanks Bob!',
    sender: '4',
    senderName: 'Alice Student',
    senderRole: 'student',
    chatType: 'student-student',
    timestamp: '2023-10-12T08:33:00Z',
  },
  
  // Student-Teacher messages
  {
    id: '4',
    content: 'Professor, I had a question about today\'s assignment deadline.',
    sender: '4',
    senderName: 'Alice Student',
    senderRole: 'student',
    chatType: 'student-teacher',
    timestamp: '2023-10-12T10:15:00Z',
  },
  {
    id: '5',
    content: 'Hi Alice, the deadline is Friday at 11:59 PM. Let me know if you need an extension.',
    sender: '2',
    senderName: 'Jane Teacher',
    senderRole: 'teacher',
    chatType: 'student-teacher',
    timestamp: '2023-10-12T10:18:00Z',
  },
  {
    id: '6',
    content: 'Thank you! That works for me.',
    sender: '4',
    senderName: 'Alice Student',
    senderRole: 'student',
    chatType: 'student-teacher',
    timestamp: '2023-10-12T10:20:00Z',
  },
];

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get messages for a specific chat type
export const getMessages = async (chatType) => {
  await delay(700); // Simulate network delay
  return messages.filter(message => message.chatType === chatType);
};

// Send a new message
export const sendMessage = async (messageData) => {
  await delay(500); // Simulate network delay
  
  // Validate message
  if (!messageData.content || !messageData.sender) {
    throw new Error('Message content and sender are required');
  }
  
  // Create new message
  const newMessage = {
    id: `${messages.length + 1}`,
    content: messageData.content,
    sender: messageData.sender,
    senderName: messageData.senderName,
    senderRole: messageData.senderRole,
    chatType: messageData.chatType,
    timestamp: messageData.timestamp || new Date().toISOString(),
  };
  
  // Add to messages array (in a real app, this would be saved to a database)
  messages.push(newMessage);
  
  return newMessage;
};

// Delete a message (admin functionality)
export const deleteMessage = async (messageId) => {
  await delay(500); // Simulate network delay
  
  const index = messages.findIndex(msg => msg.id === messageId);
  
  if (index === -1) {
    throw new Error('Message not found');
  }
  
  // Remove message
  messages = messages.filter(msg => msg.id !== messageId);
  
  return { success: true };
};