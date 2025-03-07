import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function OfflineAlert() {
  const { isOffline, error, clearError } = useAuth();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isOffline || error) {
      setVisible(true);
    }
  }, [isOffline, error]);
  
  const alertVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed bottom-3 left-0 right-0 mx-auto max-w-sm p-3 bg-black border-l border-t border-r border-b border-yellow-400/30 shadow-md shadow-yellow-400/5 z-50 text-white backdrop-blur-sm premium-card"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={alertVariants}
        >
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 premium-btn"
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <div className="ml-2 flex-1">
              <p className="text-xs text-white/90 tracking-wide">
                {isOffline ? "You are currently offline. Some features may be limited." : error}
              </p>
            </div>
            <motion.button 
              className="ml-2 text-white/70 hover:text-white focus:outline-none premium-btn"
              onClick={() => {
                setVisible(false);
                clearError && clearError();
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          <motion.div 
            className="absolute inset-0 border border-yellow-400/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 