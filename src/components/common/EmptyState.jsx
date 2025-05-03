import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const EmptyState = ({ title, description, icon, action }) => {
  const Icon = icon || FiSearch;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-8 text-center dark:bg-gray-800"
    >
      <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-700">
        <Icon size={36} className="text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {title || 'No results found'}
      </h3>
      <p className="mb-6 max-w-sm text-gray-600 dark:text-gray-400">
        {description || 'We couldn\'t find what you\'re looking for. Try adjusting your search or filters.'}
      </p>
      {action && (
        <button 
          onClick={action.onClick} 
          className="btn btn-primary"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;