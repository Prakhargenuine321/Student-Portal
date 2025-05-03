import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4 dark:from-primary-950 dark:to-secondary-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        <h1 className="mb-2 text-6xl font-bold text-primary-600 dark:text-primary-400">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-flex"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;