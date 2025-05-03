import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const AuthLayout = () => {
  const { user, loading } = useAuth();
  
  // If user is already logged in, redirect to appropriate dashboard
  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  if (user) {
    if (user.role === 'student') {
      return <Navigate to="/student/dashboard" />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    }
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-grow items-center justify-center px-4 py-8"
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-primary-800 dark:text-primary-300">
              Smart College Resource Platform
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access all your college resources in one place
            </p>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="glassmorphism overflow-hidden p-6"
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.div>
      
      <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Smart College Resource Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;