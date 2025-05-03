// Mock authentication service
// In a real application, these functions would make API calls to a backend server

// Simulated user database
const users = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    phone: '1234567890',
    password: 'password123',
    role: 'student',
    rollNo: 'CS2001',
    branch: 'Computer Science',
    createdAt: '2023-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Teacher',
    email: 'teacher@example.com',
    phone: '0987654321',
    password: 'password123',
    role: 'teacher',
    department: 'Computer Science',
    createdAt: '2023-01-10T08:30:00Z',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '5555555555',
    password: 'password123',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00Z',
  },
];

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Login user
export const loginUser = async (credentials) => {
  await delay(800); // Simulate network delay
  
  // Check for required fields
  if (!credentials.identifier || !credentials.password) {
    throw new Error('Email/Phone/Roll No and password are required');
  }
  
  // Find user by email, phone, or roll number
  const user = users.find(u => 
    u.email === credentials.identifier || 
    u.phone === credentials.identifier || 
    (u.rollNo && u.rollNo === credentials.identifier)
  );
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.password !== credentials.password) {
    throw new Error('Invalid password');
  }
  
  // Don't return password in response
  const { password, ...userWithoutPassword } = user;
  
  // Store in localStorage to persist session
  localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

// Register a new user
export const registerUser = async (userData) => {
  await delay(1000); // Simulate network delay
  
  // Validate required fields
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error('Name, email, and password are required');
  }
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email already registered');
  }
  
  // Create new user (always as student role for registration)
  const newUser = {
    id: `${users.length + 1}`,
    name: userData.name,
    email: userData.email,
    phone: userData.phone || '',
    password: userData.password,
    role: 'student',
    rollNo: userData.rollNo || '',
    branch: userData.branch || '',
    createdAt: new Date().toISOString(),
  };
  
  // In a real app, we would save this to the database
  users.push(newUser);
  
  // Don't return password in response
  const { password, ...userWithoutPassword } = newUser;
  
  // Store in localStorage to persist session
  localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

// Logout user
export const logoutUser = async () => {
  await delay(300); // Simulate network delay
  localStorage.removeItem('user');
  return { success: true };
};

// Get current user from localStorage
export const getCurrentUser = async () => {
  await delay(300); // Simulate network delay
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};