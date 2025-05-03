import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash, FiEdit, FiFilter, FiPlus, FiSearch, FiX } from 'react-icons/fi';
import AdminUploadForm from '../../components/common/AdminUploadForm';
import { getResources, deleteResource } from '../../services/resourceService';

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filters, setFilters] = useState({
    branch: 'All',
    search: '',
  });
  
  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await getResources('notes');
        setNotes(data);
        setFilteredNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, []);
  
  // Apply filters when filter state changes
  useEffect(() => {
    if (notes.length === 0) return;
    
    let filtered = [...notes];
    
    // Apply branch filter
    if (filters.branch && filters.branch !== 'All') {
      filtered = filtered.filter(note => note.branch === filters.branch);
    }
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.description.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredNotes(filtered);
  }, [filters, notes]);
  
  // Handle upload complete
  const handleUploadComplete = (newNote) => {
    setNotes(prev => [newNote, ...prev]);
    setShowUploadForm(false);
  };
  
  // Handle note deletion
  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteResource('notes', id);
        setNotes(prev => prev.filter(note => note.id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
      }
    }
  };
  
  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Branch options
  const branchOptions = ['All', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'];
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Manage Notes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage study notes
          </p>
        </div>
        
        <button
          onClick={() => setShowUploadForm(prev => !prev)}
          className="btn btn-primary"
        >
          {showUploadForm ? <FiX className="mr-2" /> : <FiPlus className="mr-2" />}
          {showUploadForm ? 'Cancel' : 'Upload Notes'}
        </button>
      </div>
      
      {/* Upload Form */}
      {showUploadForm && (
        <div className="mb-6">
          <AdminUploadForm 
            resourceType="notes" 
            onUploadComplete={handleUploadComplete}
          />
        </div>
      )}
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filters:
          </span>
        </div>
        
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <div className="w-full sm:w-48">
            <select
              name="branch"
              value={filters.branch}
              onChange={handleFilterChange}
              className="input"
            >
              {branchOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search notes..."
                className="input pl-10"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes Table */}
      <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
        {loading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
              <FiFilter className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              No notes found
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Try adjusting your filters or upload new notes
            </p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="btn btn-primary"
            >
              <FiPlus className="mr-2" />
              Upload Notes
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredNotes.map((note) => (
                  <motion.tr
                    key={note.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-gray-800"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={note.thumbnailUrl}
                            alt={note.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{note.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {note.subject || 'No subject'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {note.branch}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {note.uploadedBy}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(note.uploadDate)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex gap-3">
                        <span title="Views" className="flex items-center gap-1">
                          <FiSearch className="h-3.5 w-3.5" />
                          {note.stats.views}
                        </span>
                        <span title="Downloads" className="flex items-center gap-1">
                          <FiPlus className="h-3.5 w-3.5" />
                          {note.stats.downloads}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                          title="Edit"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="rounded-full p-1.5 text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/30"
                          title="Delete"
                        >
                          <FiTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNotes;