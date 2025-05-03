import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiEye, FiThumbsUp, FiBookmark, FiClock } from 'react-icons/fi';
import { updateResourceStats } from '../../services/resourceService';

const ContentCard = ({ 
  id, 
  type, 
  title, 
  description, 
  thumbnailUrl, 
  uploadedBy, 
  uploadDate, 
  branch, 
  subject, 
  stats,
  additionalInfo
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [statData, setStatData] = useState(stats);
  
  // Format date
  const formattedDate = new Date(uploadDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Handle like
  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!liked) {
      setLiked(true);
      setStatData(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
      
      try {
        await updateResourceStats(type, id, 'like');
      } catch (error) {
        console.error('Error updating likes:', error);
        setLiked(false);
        setStatData(prev => ({
          ...prev,
          likes: prev.likes - 1
        }));
      }
    }
  };
  
  // Handle bookmark
  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setBookmarked(!bookmarked);
    setStatData(prev => ({
      ...prev,
      bookmarks: bookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1
    }));
    
    try {
      await updateResourceStats(type, id, 'bookmark');
    } catch (error) {
      console.error('Error updating bookmarks:', error);
      setBookmarked(!bookmarked);
      setStatData(prev => ({
        ...prev,
        bookmarks: bookmarked ? prev.bookmarks + 1 : prev.bookmarks - 1
      }));
    }
  };
  
  // Handle view
  const handleView = async () => {
    try {
      await updateResourceStats(type, id, 'view');
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };
  
  // Handle download
  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await updateResourceStats(type, id, 'download');
      // In a real app, trigger file download here
      alert('Download started');
    } catch (error) {
      console.error('Error updating downloads:', error);
    }
  };
  
  return (
    <Link to={`/student/preview/${type}/${id}`} onClick={handleView}>
      <motion.div
        whileHover={{ y: -5 }}
        className="h-full overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
      >
        <div className="relative h-40 overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 flex w-full justify-between p-3">
            <span className="badge badge-primary">{branch}</span>
            {subject && <span className="badge badge-secondary">{subject}</span>}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
          
          {/* Additional type-specific info */}
          {type === 'videos' && additionalInfo?.duration && (
            <div className="mb-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FiClock className="mr-1" />
              {additionalInfo.duration}
            </div>
          )}
          
          <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{uploadedBy}</span>
            <span className="flex items-center">
              <FiClock className="mr-1" />
              {formattedDate}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
            <div className="flex gap-3">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs ${
                  liked ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <FiThumbsUp />
                <span>{statData.likes}</span>
              </button>
              
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <FiEye />
                <span>{statData.views}</span>
              </div>
              
              {statData.downloads !== undefined && (
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <FiDownload />
                  <span>{statData.downloads}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleBookmark}
                className={`rounded-full p-1.5 ${
                  bookmarked 
                    ? 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label="Bookmark"
              >
                <FiBookmark size={14} />
              </button>
              
              {type !== 'videos' && (
                <button
                  onClick={handleDownload}
                  className="rounded-full bg-primary-100 p-1.5 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-800/50"
                  aria-label="Download"
                >
                  <FiDownload size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ContentCard;