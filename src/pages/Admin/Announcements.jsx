import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash, FiEdit, FiBell } from 'react-icons/fi';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'End Semester Examination Schedule',
      content: 'The end semester examinations will commence from December 1st, 2023. The detailed schedule has been uploaded to the portal.',
      target: ['all'],
      priority: 'high',
      createdAt: '2023-10-15T08:00:00Z',
    },
    {
      id: '2',
      title: 'Workshop on Machine Learning',
      content: 'A workshop on Machine Learning basics will be conducted on October 25th, 2023. All interested students can register through the portal.',
      target: ['Computer Science'],
      priority: 'medium',
      createdAt: '2023-10-14T10:30:00Z',
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    target: ['all'],
    priority: 'medium'
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAnnouncement = {
      id: String(announcements.length + 1),
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    setShowForm(false);
    setFormData({
      title: '',
      content: '',
      target: ['all'],
      priority: 'medium'
    });
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Announcements</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and post announcements for students and teachers
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="btn btn-primary"
        >
          {showForm ? <FiPlus className="mr-2" /> : <FiBell className="mr-2" />}
          {showForm ? 'Cancel' : 'New Announcement'}
        </button>
      </div>
      
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
        >
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Create New Announcement
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="input"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="input min-h-[100px]"
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Audience
              </label>
              <select
                value={formData.target}
                onChange={e => setFormData(prev => ({ ...prev, target: [e.target.value] }))}
                className="input"
              >
                <option value="all">All Users</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Post Announcement
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {announcement.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className={`badge ${
                    announcement.priority === 'high' ? 'badge-error' :
                    announcement.priority === 'medium' ? 'badge-warning' :
                    'badge-success'
                  }`}>
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                  </span>
                  <span className="badge badge-secondary">
                    {announcement.target[0]}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Posted on {formatDate(announcement.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  title="Edit"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="rounded-full p-1.5 text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/30"
                  title="Delete"
                >
                  <FiTrash size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400">
              {announcement.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;