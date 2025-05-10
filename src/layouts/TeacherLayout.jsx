import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../hooks/useAuth';

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);
  
  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  // Teacher sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', href: '/teacher/dashboard', icon: 'Home' },
    { name: 'Community', href: '/teacher/community', icon: 'MessageSquare' },
  ];
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
          onMenuClick={() => setSidebarOpen(true)}
          userRole="teacher"
        />
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sidebar for larger screens */}
        <Sidebar 
        navigationItems={navigationItems}
        userRole="teacher"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;