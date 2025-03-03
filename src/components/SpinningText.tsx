import React from 'react';
import { motion } from 'framer-motion';

interface SpinningTextProps {
  text: string;
}

const SpinningText: React.FC<SpinningTextProps> = ({ text }) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-blue-500"></div>
      </div>
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full absolute top-0 left-0"
      >
        {text.split('').map((char, i) => {
          const rotation = (i * 360) / text.length;
          
          return (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center',
              }}
            >
              <span
                className="absolute font-bold text-sm"
                style={{
                  left: '50%',
                  top: 0,
                  transform: 'translateX(-50%)',
                }}
              >
                {char}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SpinningText;