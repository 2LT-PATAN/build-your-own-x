import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AfghanNames = [
  { name: "Afghan Aesthetic", activity: "booked VIP training session" },
  { name: "Rajesh Khanna", activity: "joined CrossFit program" },
  { name: "Emily Carter", activity: "purchased annual membership" },
  { name: "Aarav Patel", activity: "started MMA training" },
  { name: "Olivia Smith", activity: "achieved 200lb deadlift" },
  { name: "Mohammad Khan", activity: "renewed platinum package" },
  { name: "Priya Sharma", activity: "completed 50th session" },
  { name: "Liam Johnson", activity: "bought protein supplements" },
  { name: "Fatima Alizai", activity: "joined yoga classes" },
  { name: "Ethan Williams", activity: "upgraded to premium" }
];

const Notification = ({ notifications = AfghanNames }) => {
  const [index, setIndex] = useState(0);
  const [loadedNotifications, setLoadedNotifications] = useState([]);

  // Firestore integration setup (uncomment when ready)
  /*
  useEffect(() => {
    const fetchNotifications = async () => {
      const db = getFirestore();
      const notiCollection = collection(db, 'notifications');
      const snapshot = await getDocs(notiCollection);
      const items = snapshot.docs.map(doc => doc.data());
      if(items.length > 0) setLoadedNotifications(items);
    };
    
    fetchNotifications();
  }, []);
  */

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % (loadedNotifications.length || notifications.length));
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [loadedNotifications]);

  const currentNotifications = loadedNotifications.length > 0 ? loadedNotifications : notifications;

  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute w-full"
        >
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden">
            {/* Optimized glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              
              <p className="text-xs font-medium text-white/90 flex items-center truncate">
                <span className="bg-white text-black px-1.5 py-[3px] font-bold uppercase tracking-wide mr-1.5 relative overflow-hidden transform-gpu">
                  {currentNotifications[index]?.name.split(' ')[0]}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </span>
                
                <span className="bg-black text-white px-1.5 py-[3px] font-bold uppercase tracking-wide ml-1 relative overflow-hidden transform-gpu">
                  {currentNotifications[index]?.name.split(' ').slice(1).join(' ')}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.2
                    }}
                  />
                </span>
                
                <span className="mx-1.5 text-white/30">|</span>
                <span className="text-white/70 truncate">{currentNotifications[index]?.activity}</span>
              </p>
            </div>
            
            <div className="absolute bottom-0 right-0 text-[7px] text-white/40 font-mono pr-1.5 pb-[1px]">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Notification; 