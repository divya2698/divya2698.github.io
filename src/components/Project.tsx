import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  darkMode: boolean;
  index: number;
}

const Project: React.FC<ProjectProps> = ({ 
  title, 
  description, 
  technologies, 
  image,
  darkMode,
  index
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white text-xl font-bold p-4">{title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className={`flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            <Github size={16} />
            <span>Code</span>
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className={`flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;