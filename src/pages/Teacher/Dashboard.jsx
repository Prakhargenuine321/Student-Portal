import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiMessageSquare, FiActivity, FiClock, FiFileText, FiStar } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard stats
  const stats = [
    { title: 'Total Students', value: '120', icon: FiUsers, color: 'bg-primary-500' },
    { title: 'Active Chats', value: '8', icon: FiMessageSquare, color: 'bg-secondary-500' },
    { title: 'Engagement Rate', value: '78%', icon: FiActivity, color: 'bg-accent-500' },
    { title: 'Resources Shared', value: '35', icon: FiFileText, color: 'bg-success-500' },
  ];
  
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, student: 'Alice Student', activity: 'asked a question about Data Structures', time: '20 minutes ago' },
    { id: 2, student: 'Bob Student', activity: 'viewed your Operating Systems notes', time: '1 hour ago' },
    { id: 3, student: 'Charlie Student', activity: 'downloaded your Database quiz', time: '3 hours ago' },
    { id: 4, student: 'Dave Student', activity: 'bookmarked your Algorithm video', time: '5 hours ago' },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Teacher Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}!
        </p>
      </div>
      
      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            transition={{ delay: index * 0.05 }}
          >
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-white" style={{ backgroundColor: stat.color.split('-')[1] }}>
                <stat.icon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          
          <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <Link
                to="/teacher/community"
                className="flex items-center gap-3 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400">
                  <FiMessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Community Chat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Respond to student questions</p>
                </div>
              </Link>
              
              <div className="flex items-center gap-3 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400">
                  <FiFileText size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Share Resources</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upload notes or materials</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400">
                  <FiStar size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Student Performance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track engagement and progress</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <FiClock size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Schedule</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View your teaching schedule</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          
          <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
            {recentActivities.length === 0 ? (
              <div className="flex h-60 flex-col items-center justify-center p-6 text-center">
                <FiActivity className="mb-2 h-10 w-10 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No recent activity</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Student interactions will appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {activity.student.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-medium">{activity.student}</span> {activity.activity}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 text-center">
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                    View all activity
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;