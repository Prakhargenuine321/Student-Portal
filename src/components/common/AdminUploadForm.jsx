import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiLink, FiFile } from 'react-icons/fi';
import { addResource } from '../../services/resourceService';

const AdminUploadForm = ({ resourceType, onUploadComplete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    branch: 'Computer Science',
    year: '1',
    semester: '1',
    subject: '',
    fileUrl: '',
    videoUrl: '',
    thumbnailUrl: '',
    uploadedBy: 'Admin',
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Options for selects
  const branchOptions = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'];
  const yearOptions = ['1', '2', '3', '4', 'All'];
  const semesterOptions = ['1', '2', 'All'];
  const subjectOptions = ['Data Structures', 'DBMS', 'Networks', 'Operating Systems', 'Machine Learning'];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };
  
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    
    if (resourceType === 'videos' && !formData.videoUrl.trim()) {
      setError('Video URL is required');
      return false;
    }
    
    if (resourceType !== 'videos' && !formData.fileUrl.trim()) {
      setError('File URL is required');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Prepare data for upload
      const dataToUpload = {
        ...formData,
        // For non-video resources, we don't need videoUrl
        ...(resourceType !== 'videos' && { videoUrl: undefined }),
        // For videos, we don't need fileUrl
        ...(resourceType === 'videos' && { fileUrl: undefined }),
        // Use placeholder thumbnail if not provided
        thumbnailUrl: formData.thumbnailUrl || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        uploadDate: new Date().toISOString(),
      };
      
      const result = await addResource(resourceType, dataToUpload);
      
      // Reset form on success
      setFormData({
        title: '',
        description: '',
        branch: 'Computer Science',
        year: '1',
        semester: '1',
        subject: '',
        fileUrl: '',
        videoUrl: '',
        thumbnailUrl: '',
        uploadedBy: 'Admin',
      });
      
      setSuccess(true);
      
      if (onUploadComplete) {
        onUploadComplete(result);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message || 'An error occurred while uploading');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Upload {resourceType === 'pyqs' ? 'PYQs' : resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
      </h2>
      
      {success && (
        <div className="mb-4 rounded-lg bg-success-100 p-3 text-success-800 dark:bg-success-900/30 dark:text-success-300">
          Upload successful!
        </div>
      )}
      
      {error && (
        <div className="mb-4 rounded-lg bg-error-100 p-3 text-error-800 dark:bg-error-900/30 dark:text-error-300">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              placeholder="Enter title"
              required
            />
          </div>
          
          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input min-h-[100px]"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          
          {/* Branch */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Branch*
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="input"
              required
            >
              {branchOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          {/* Subject */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          {/* Year */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="input"
            >
              {yearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          {/* Semester */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="input"
            >
              {semesterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          {/* File or Video URL */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {resourceType === 'videos' ? 'Video URL*' : 'File URL*'}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {resourceType === 'videos' ? (
                  <FiLink className="text-gray-500 dark:text-gray-400" />
                ) : (
                  <FiFile className="text-gray-500 dark:text-gray-400" />
                )}
              </div>
              <input
                type="text"
                name={resourceType === 'videos' ? 'videoUrl' : 'fileUrl'}
                value={resourceType === 'videos' ? formData.videoUrl : formData.fileUrl}
                onChange={handleChange}
                className="input pl-10"
                placeholder={resourceType === 'videos' ? 'Enter YouTube URL' : 'Enter file URL'}
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {resourceType === 'videos' 
                ? 'Paste a valid YouTube video URL' 
                : 'Enter a valid URL to the PDF file'}
            </p>
          </div>
          
          {/* Thumbnail URL */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail URL
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLink className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                className="input pl-10"
                placeholder="Enter thumbnail URL (optional)"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If not provided, a default thumbnail will be used.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isUploading}
            className="btn btn-primary"
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="mr-2 h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center">
                <FiUpload className="mr-2" />
                Upload
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminUploadForm;