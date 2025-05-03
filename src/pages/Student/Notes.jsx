import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';
import FilterBar from '../../components/common/FilterBar';
import ContentCard from '../../components/common/ContentCard';
import EmptyState from '../../components/common/EmptyState';
import { getResources } from '../../services/resourceService';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    branch: 'All',
    year: 'All',
    semester: 'All',
    subject: 'All',
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
    
    // Apply year filter
    if (filters.year && filters.year !== 'All') {
      filtered = filtered.filter(note => note.year === filters.year);
    }
    
    // Apply semester filter
    if (filters.semester && filters.semester !== 'All') {
      filtered = filtered.filter(note => note.semester === filters.semester);
    }
    
    // Apply subject filter
    if (filters.subject && filters.subject !== 'All') {
      filtered = filtered.filter(note => note.subject === filters.subject);
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
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Notes</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Access study notes and materials
        </p>
      </div>
      
      <FilterBar onFilterChange={handleFilterChange} />
      
      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500"></div>
        </div>
      ) : filteredNotes.length === 0 ? (
        <EmptyState 
          title="No notes found" 
          description="We couldn't find any notes matching your filters. Try adjusting your search criteria."
          icon={FiBookOpen}
          action={{
            label: "Clear filters",
            onClick: () => handleFilterChange({
              branch: 'All',
              year: 'All',
              semester: 'All',
              subject: 'All',
              search: '',
            })
          }}
        />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredNotes.map((note) => (
            <motion.div key={note.id} variants={itemVariants}>
              <ContentCard
                id={note.id}
                type="notes"
                title={note.title}
                description={note.description}
                thumbnailUrl={note.thumbnailUrl}
                uploadedBy={note.uploadedBy}
                uploadDate={note.uploadDate}
                branch={note.branch}
                subject={note.subject}
                stats={note.stats}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Notes;