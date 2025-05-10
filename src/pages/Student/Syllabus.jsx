import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import FilterBar from '../../components/common/FilterBar';
import ContentCard from '../../components/common/ContentCard';
import EmptyState from '../../components/common/EmptyState';
import { getResources } from '../../services/resourceService';

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [filteredSyllabus, setFilteredSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    branch: 'All',
    year: 'All',
    semester: 'All',
    subject: 'All',
    search: '',
  });
  
  // Fetch syllabus on component mount
  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        const data = await getResources('syllabus');
        setSyllabus(data);
        setFilteredSyllabus(data);
      } catch (error) {
        console.error('Error fetching syllabus:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSyllabus();
  }, []);
  
  // Apply filters when filter state changes
  useEffect(() => {
    if (syllabus.length === 0) return;
    
    let filtered = [...syllabus];
    
    // Apply branch filter
    if (filters.branch && filters.branch !== 'All') {
      filtered = filtered.filter(item => item.branch === filters.branch);
    }
    
    // Apply year filter
    if (filters.year && filters.year !== 'All') {
      filtered = filtered.filter(item => item.year === filters.year || item.year === 'All');
    }
    
    // Apply semester filter
    if (filters.semester && filters.semester !== 'All') {
      filtered = filtered.filter(item => item.semester === filters.semester || item.semester === 'All');
    }
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredSyllabus(filtered);
  }, [filters, syllabus]);
  
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
    <div className='ml-64 mt-16'>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Syllabus</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Access curriculum syllabus for all courses
        </p>
      </div>
      
      <FilterBar onFilterChange={handleFilterChange} />
      
      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500"></div>
        </div>
      ) : filteredSyllabus.length === 0 ? (
        <EmptyState 
          title="No syllabus found" 
          description="We couldn't find any syllabus matching your filters. Try adjusting your search criteria."
          icon={FiFileText}
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
          {filteredSyllabus.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <ContentCard
                id={item.id}
                type="syllabus"
                title={item.title}
                description={item.description}
                thumbnailUrl={item.thumbnailUrl}
                uploadedBy={item.uploadedBy}
                uploadDate={item.uploadDate}
                branch={item.branch}
                subject={item.year === 'All' ? 'All Years' : `Year ${item.year}`}
                stats={item.stats}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Syllabus;