import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';
import AdminUploadForm from '../../components/common/AdminUploadForm';

const ManageSyllabus = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  const handleUploadComplete = (newSyllabus) => {
    console.log('New syllabus uploaded:', newSyllabus);
    setShowUploadForm(false);
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Manage Syllabus</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage course syllabi
          </p>
        </div>
        
        <button
          onClick={() => setShowUploadForm(prev => !prev)}
          className="btn btn-primary"
        >
          {showUploadForm ? <FiX className="mr-2" /> : <FiPlus className="mr-2" />}
          {showUploadForm ? 'Cancel' : 'Upload Syllabus'}
        </button>
      </div>
      
      {showUploadForm && (
        <div className="mb-6">
          <AdminUploadForm 
            resourceType="syllabus"
            onUploadComplete={handleUploadComplete}
          />
        </div>
      )}
      
      {/* Syllabus content will be displayed here using the same structure as ManageNotes */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Use the upload button to add new syllabus documents.
        </p>
      </div>
    </div>
  );
};

export default ManageSyllabus;