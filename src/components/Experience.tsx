import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  isLeft: boolean;
  darkMode: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ 
  title, 
  company, 
  period, 
  description, 
  isLeft,
  darkMode
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} mb-8 md:mb-0`}
      >
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className={`text-lg font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{company}</p>
          <p className="text-sm mb-4">{period}</p>
          <ul className={`space-y-2 ${isLeft ? 'md:ml-auto' : ''}`}>
            {description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className={`inline-block w-2 h-2 mt-1.5 mr-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      
      <div className="hidden md:block md:w-0">
        <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} mx-auto z-10 relative`}></div>
      </div>
      
      <div className="md:w-1/2"></div>
    </div>
  );
};

export default Experience;