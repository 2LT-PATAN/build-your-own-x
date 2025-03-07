import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import Notification from '../components/Notifications';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showBanner, setShowBanner] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const [cursorHovered, setCursorHovered] = useState(false);
  
  // Enhanced parallax effects
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroImageScale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const heroOverlayOpacity = useTransform(scrollY, [0, 300], [0.3, 0.5]);
  const heroTextY = useTransform(scrollY, [0, 300], [0, -30]);
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const imageReveal = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const letterAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  // Added animated pattern for background effects
  const patternVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.4, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced transition for luxury feel
  const luxuryTransition = {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1.0]
  };
  
  // Slide transition variants
  const slideVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  // Removed redirection logic to /gym page
  useEffect(() => {
    // No redirection - gym page will be accessed directly
  }, [router]);
  
  // In the component body with other state declarations
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXTemplate = useMotionTemplate`${cursorX}px`;
  const cursorYTemplate = useMotionTemplate`${cursorY}px`;
  
  // Add this after your other state declarations and motion values
  const [particles, setParticles] = useState([]);

  // Replace the current particles useEffect with this more sophisticated version
  useEffect(() => {
    // Generate fitness equipment particles with SVG icons
    const generateEquipmentParticles = () => {
      const items = [];
      
      // Array of realistic fitness equipment SVG icons
      const equipmentIcons = [
        // Dumbbell
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 14H4C3.44772 14 3 13.5523 3 13V11C3 10.4477 3.44772 10 4 10H6.5V6.5H4C2.34315 6.5 1 7.84315 1 9.5V14.5C1 16.1569 2.34315 17.5 4 17.5H6.5V14Z"/><path d="M17.5 14H20C20.5523 14 21 13.5523 21 13V11C21 10.4477 20.5523 10 20 10H17.5V6.5H20C21.6569 6.5 23 7.84315 23 9.5V14.5C23 16.1569 21.6569 17.5 20 17.5H17.5V14Z"/><path d="M16 6.5H8V17.5H16V6.5Z"/></svg>',
        
        // Kettlebell
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C10.3431 4 9 5.34315 9 7C9 7.74138 9.29168 8.41766 9.76672 8.92104C8.10823 9.82118 7 11.507 7 13.5C7 16.5376 9.46243 19 12.5 19C15.5376 19 18 16.5376 18 13.5C18 11.507 16.8918 9.82118 15.2333 8.92104C15.7083 8.41766 16 7.74138 16 7C16 5.34315 14.6569 4 13 4H12Z"/><path d="M12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9Z" fill="currentColor"/></svg>',
        
        // Barbell plate
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3" fill="black"/></svg>',
        
        // Yoga mat
        '<svg width="28" height="22" viewBox="0 0 28 22" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="24" height="14" rx="2" /><path d="M2 10H26" stroke="rgba(0,0,0,0.2)" /></svg>',
        
        // Resistance band
        '<svg width="24" height="18" viewBox="0 0 24 18" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M3 3C6 9 18 9 21 3" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M3 15C6 9 18 9 21 15" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',
        
        // Barbell
        '<svg width="28" height="24" viewBox="0 0 28 24" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="11" width="20" height="2" rx="1" /><rect x="1" y="9" width="2" height="6" rx="1" /><rect x="25" y="9" width="2" height="6" rx="1" /></svg>',
        
        // Protein shake
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M7 2C6.44772 2 6 2.44772 6 3V4H18V3C18 2.44772 17.5523 2 17 2H7Z" /><path d="M18 6H6L8 22H16L18 6Z" /><path d="M9 9C9 8.44772 9.44772 8 10 8H14C14.5523 8 15 8.44772 15 9V9C15 9.55228 14.5523 10 14 10H10C9.44772 10 9 9.55228 9 9V9Z" fill="rgba(0,0,0,0.2)" /></svg>'
      ];
      
      for (let i = 0; i < 15; i++) {
        items.push({
          id: i,
          icon: equipmentIcons[Math.floor(Math.random() * equipmentIcons.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.6 + 0.4,
          rotate: Math.random() * 360,
          opacity: Math.random() * 0.4 + 0.2,
          speed: Math.random() * 1.5 + 0.8
        });
      }
      
      setParticles(items);
    };
    
    generateEquipmentParticles();
  }, []);
  
  // Find the logoParticles state and useEffect and replace with a simpler version
  const [logoParticles, setLogoParticles] = useState([]);

  // Add this useEffect to generate just a few light ray particles
  useEffect(() => {
    const generateLogoParticles = () => {
      const particles = [];
      // Just a few light rays for subtle effect
      for (let i = 0; i < 6; i++) {
        particles.push({
          id: i,
          x: 40 + (Math.random() * 20), // Mostly positioned around SEVEN
          y: Math.random() * 100,
          width: Math.random() * 30 + 20,
          height: 1,
          duration: Math.random() * 2 + 3,
          delay: Math.random() * 1.5,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
      setLogoParticles(particles);
    };
    
    generateLogoParticles();
  }, []);
  
  return (
    <Layout title="Home">
      {/* Ultra-Luxury Hotel-Inspired Hero Section */}
      <section 
        ref={heroRef} 
        className="relative flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-24"
      >
        {/* Background image or video - simplified */}
        <div className="absolute inset-0 w-full h-full z-10">
          <div className="absolute inset-0 overflow-hidden">
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              className="w-full h-full object-cover filter brightness-[0.6]"
            >
              <source src="/videos/main-video.webm" type="video/webm" />
              <source src="/videos/main-video.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Simplified gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        {/* Main content with larger logo and conversion-optimized elements */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center py-6 md:py-10">
            {/* Dramatically larger logo */}
            <div className="mb-6 w-full max-w-3xl mx-auto">
              {/* Replaced with simplified animated version */}
              <div className="flex flex-col items-center relative">
                {/* Light ray particles - just for SEVEN */}
                <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                  {logoParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute bg-white/30"
                      style={{
                        width: particle.width,
                        height: particle.height,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: 0,
                        transform: "rotate(30deg)",
                        filter: "blur(1px)"
                      }}
                      animate={{
                        opacity: [0, particle.opacity, 0],
                        width: [0, particle.width, 0],
                      }}
                      transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        repeatDelay: particle.delay,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center relative">
                  {/* SPACE with subtle shine effect */}
                  <motion.div
                    className="bg-black text-white text-5xl md:text-6xl px-6 py-3 font-bold relative z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    SPACE
                    {/* Shine effect across SPACE */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        repeatDelay: 4
                      }}
                    />
                  </motion.div>
                  
                  {/* SEVEN with light ray effect */}
                  <motion.div
                    className="bg-white text-black text-5xl md:text-6xl px-6 py-3 ml-3 font-bold relative z-20 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="relative z-10 inline-block" style={{ 
                      textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)",
                      WebkitTextStroke: "0.5px rgba(255,255,255,0.3)"
                    }}>
                      SEVEN
                    </span>
                    
                    {/* Shine effect for SEVEN - subtle silver color against white background */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/40 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        repeatDelay: 6,
                        delay: 2 // Offset timing from SPACE shine
                      }}
                    />
                    
                    {/* White glow effect around SEVEN */}
                    <motion.div
                      className="absolute inset-0 rounded-sm z-0"
                      animate={{ 
                        boxShadow: [
                          "0 0 5px 0px rgba(255,255,255,0.3)", 
                          "0 0 15px 2px rgba(255,255,255,0.6)", 
                          "0 0 5px 0px rgba(255,255,255,0.3)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Subtle radial glow behind SEVEN */}
                    <motion.div
                      className="absolute inset-0 z-0 opacity-0"
                      animate={{
                        opacity: [0, 0.2, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                      style={{
                        background: "radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)",
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* THE FITNESS CLUB tagline - simplified animation */}
                <motion.div 
                  className="text-xl tracking-widest mt-2 text-white/80 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  THE FITNESS CLUB
                </motion.div>
              </div>
            </div>
            
            {/* Clear value proposition */}
            <h2 className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto font-light">
              Your premier destination for strength, conditioning, and overall wellness.
            </h2>
            
            {/* Trust indicators - Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 max-w-xl mx-auto">
              <div className="text-center p-2 md:p-4">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">45k+</div>
                <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Sq.ft Space</div>
              </div>
              <div className="text-center p-2 md:p-4">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">2,500+</div>
                <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Active Members</div>
              </div>
              <div className="text-center p-2 md:p-4">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Access</div>
              </div>
            </div>
            
            {/* Special offer banner with urgency */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded mb-6 max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-center">
                <span className="animate-pulse bg-white h-2 w-2 rounded-full mr-2"></span>
                <p className="text-white text-sm md:text-base">
                  <span className="font-semibold">LIMITED TIME:</span> Join today and get <span className="font-bold">50% OFF</span> your first month + free personal training session
                </p>
              </div>
            </div>
            
            {/* Enhanced call-to-action buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              <button 
                onClick={() => router.push('/membership')}
                className="bg-white text-black px-6 py-3 text-base md:text-lg uppercase tracking-wider hover:bg-white/90 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10">Become a Member</span>
                <span className="absolute inset-0 bg-black/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </button>
              <button 
                onClick={() => router.push('/consultation')}
                className="bg-transparent border border-white text-white px-6 py-3 text-base md:text-lg uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                Free Consultation
              </button>
            </div>
            
            {/* Social proof */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="flex items-center justify-center mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="w-8 h-8 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`/images/avatar-${item}.jpg`} 
                        alt="Member" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-3 text-sm text-white/80">
                  <span className="font-bold text-white">300+</span> people joined this month
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex text-yellow-400 text-sm">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="ml-2 text-xs text-white/70">
                  4.9/5 from 500+ reviews
                </div>
              </div>
            </div>
            
            {/* Quick navigation to key information */}
            <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-wider text-white/60">
              <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
              <span>•</span>
              <a href="#facilities" className="hover:text-white transition-colors duration-200">Facilities</a>
              <span>•</span>
              <a href="#trainers" className="hover:text-white transition-colors duration-200">Trainers</a>
              <span>•</span>
              <a href="#classes" className="hover:text-white transition-colors duration-200">Classes</a>
            </div>
          </div>
        </div>
        
        {/* Floating badges for credibility */}
        <div className="absolute bottom-6 left-6 z-20 hidden md:block">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center">
            <img src="/images/award-badge.svg" alt="Award" className="w-6 h-6 mr-2" onError={(e) => e.target.style.display = 'none'} />
            <span className="text-xs text-white">Tricity's #1 Fitness Club 2023</span>
          </div>
        </div>
        
        {/* Browser notification-style engagement trigger - Baki Hanma themed */}
        <div className="absolute top-24 right-6 z-20 hidden lg:block w-72">
          <Notification />
        </div>
      </section>
      
      {/* Features Section - Enhanced with Better Colors */}
      <section className="py-24 bg-[#111827] border-t border-white/10 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/30 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="inline-block">
              <span className="text-sm uppercase tracking-[0.3em] text-white/50 mb-2 block">The Space Seven Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight luxury-title">
                Experience <span className="text-white">Perfection</span>
              </h2>
              <div className="w-24 h-0.5 bg-white/20 mx-auto mt-6 mb-6"></div>
            </div>
            <p className="max-w-2xl mx-auto text-gray-300 text-base font-light leading-relaxed">
              Our minimalist approach eliminates distractions, creating an environment where you can 
              <span className="text-white font-normal"> focus entirely on your transformation</span>. Every element of 
              Space Seven is designed with intentionality and purpose.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: 'ri-focus-3-line',
                title: 'PRECISION TRAINING',
                description: 'Scientifically designed workout routines that maximize efficiency and results. Our methodologies are backed by research and refined through experience.'
              },
              {
                icon: 'ri-mental-health-line',
                title: 'WELLNESS FOCUS',
                description: 'Comprehensive approaches to health that harmonize physical performance with mental wellbeing. True fitness transcends the merely physical.'
              },
              {
                icon: 'ri-line-chart-line',
                title: 'CONTINUOUS PROGRESS',
                description: 'Advanced tracking systems monitor your improvements with sophisticated metrics and analytics, ensuring your journey is always moving forward.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/30 backdrop-blur-sm border border-white/5 p-10 hover:bg-white hover:text-[#111827] transition-all duration-500 group flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                whileHover={{ 
                  y: -15,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
                }}
              >
                <motion.div 
                  className="mb-8 w-16 h-16 border border-white/20 group-hover:border-[#111827]/50 flex items-center justify-center transition-all duration-500"
                  whileHover={{ 
                    rotate: 90,
                    scale: 1.1,
                    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
                  }}
                >
                  <i className={`${feature.icon} text-2xl group-hover:text-[#111827] transition-colors duration-500`}></i>
                </motion.div>
                
                <div className="mb-4 h-px w-12 bg-white/30 group-hover:bg-[#111827]/30 transition-all duration-500"></div>
                
                <h3 className="text-xl font-bold mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-gray-300 group-hover:text-[#111827]/80 text-base leading-relaxed flex-grow">
                  {feature.description}
                </p>
                
                <div className="mt-6 pt-4 border-t border-white/10 group-hover:border-[#111827]/10 transition-all duration-500 flex items-center">
                  <span className="text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center">
                    Explore 
                    <motion.span 
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="ml-2"
                    >→</motion.span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Alternating Sections */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-tight luxury-title">
                <div className="inline-block">
                  <Logo size="medium" light={false} withTagline={false} />
                </div>
                <span className="bg-black text-white px-2 premium-btn ml-2">GYM</span>
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Premium facilities with cutting-edge equipment. Our gym spaces are designed
                for optimal performance with a clean, distraction-free environment.
              </p>
              <motion.div 
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }
                }} 
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/gym"
                  className="border-2 border-black py-2 px-5 uppercase tracking-wider text-sm font-medium inline-block hover:bg-black hover:text-white transition-all duration-200 premium-btn"
                >
                  Visit Gym
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <motion.div className="relative overflow-hidden zoom-image-container">
                <motion.img 
                src="/images/gym-interior.jpg" 
                alt="Space Seven Gym Interior" 
                  className="w-full h-auto transition-all duration-500 zoom-image"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  whileHover={{ 
                    filter: "contrast(110%)",
                    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }
                  }}
                />
                
                {/* Simple border */}
                <motion.div 
                  className="absolute inset-0 border border-black/40 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-tight luxury-title">
                <span className="bg-white text-black px-2 premium-btn">NUTRITION</span> PLANNING
              </h2>
              <p className="text-gray-400 mb-6 text-sm">
                Personalized meal plans crafted for your specific needs. Our nutrition
                experts create balanced diets that complement your workout routine.
              </p>
              <motion.div 
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }
                }} 
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/consultation"
                  className="border-2 border-white py-2 px-5 uppercase tracking-wider text-sm font-medium inline-block hover:bg-white hover:text-black transition-all duration-200 premium-btn"
                >
                  Get Your Plan
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <motion.div className="relative overflow-hidden zoom-image-container">
                <motion.img 
                src="/images/nutrition.jpg" 
                alt="Nutrition Planning" 
                  className="w-full h-auto transition-all duration-500 zoom-image"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  whileHover={{ 
                    filter: "contrast(110%)",
                    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }
                  }}
                />
                
                {/* Simple border */}
                <motion.div 
                  className="absolute inset-0 border border-white/40 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight luxury-title">Our Programs</h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Discover our comprehensive range of programs designed to transform your fitness experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white">
            {[
              {
                title: 'STRENGTH TRAINING',
                description: 'Build muscle and increase power with expert guidance.',
                image: '/images/strength.jpg',
                link: '/programs/strength'
              },
              {
                title: 'CARDIO FITNESS',
                description: 'Improve endurance and cardiovascular health.',
                image: '/images/cardio.jpg',
                link: '/programs/cardio'
              },
              {
                title: 'FLEXIBILITY',
                description: 'Enhance your range of motion and prevent injuries.',
                image: '/images/flexibility.jpg',
                link: '/programs/flexibility'
              },
              {
                title: 'HIIT WORKOUTS',
                description: 'High-intensity interval training for maximum results.',
                image: '/images/hiit.jpg',
                link: '/programs/hiit'
              },
              {
                title: 'MIND & BODY',
                description: 'Balance your mental and physical wellbeing.',
                image: '/images/mind-body.jpg',
                link: '/programs/mind-body'
              },
              {
                title: 'CUSTOM PLANS',
                description: 'Personalized programs tailored to your specific goals.',
                image: '/images/custom.jpg',
                link: '/programs/custom'
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden bg-black text-white h-80 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-black overflow-hidden">
                  {/* Simplified image with hover effect */}
                  <motion.img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover opacity-70 transition-all duration-700"
                    initial={{ scale: 1.2 }}
                    whileInView={{ 
                      scale: 1.1,
                      transition: { duration: 1.2 } 
                    }}
                    variants={{
                      hover: { 
                        scale: 1.05, 
                        opacity: 0.5,
                        transition: { duration: 0.8 }
                      }
                    }}
                  />
                  
                  {/* Simple gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                    variants={{
                      hover: { 
                        opacity: 0.8,
                        transition: { duration: 0.5 } 
                      }
                    }}
                  />
                </div>
                
                <motion.div 
                  className="relative z-10 h-full flex flex-col justify-end p-8"
                  variants={{
                    hover: { y: -8, transition: { duration: 0.4 } }
                  }}
                >
                  <motion.h3 
                    className="text-xl font-bold mb-3 luxury-title"
                    variants={{
                      hover: { scale: 1.05, transition: { duration: 0.3 } }
                    }}
                  >
                    {program.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 mb-6 group-hover:text-white transition-all duration-300"
                    variants={{
                      hover: { 
                        color: "#fff",
                        transition: { duration: 0.3 } 
                      }
                    }}
                  >
                    {program.description}
                  </motion.p>
                  
                  <motion.div 
                    className="overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div 
                      className="h-px bg-white w-full mb-4"
                      variants={{
                        hover: { 
                          height: "2px",
                          transition: { duration: 0.3 } 
                        }
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    variants={{
                      hover: { 
                        x: 10,
                        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } 
                      }
                    }}
                  >
                    <Link href={program.link} className="flex items-center text-sm uppercase tracking-wider">
                      EXPLORE <i className="ri-arrow-right-line ml-2"></i>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight uppercase">
              READY TO <span className="bg-black text-white px-2">TRANSFORM</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Join Space Seven today and experience fitness like never before.
              Our black and white approach eliminates distractions, focusing purely on results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="border-2 border-black py-4 px-8 text-lg uppercase tracking-wider font-medium hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/membership')}
              >
                BECOME A MEMBER
              </motion.button>
              <motion.button
                className="border-2 border-black bg-black text-white py-4 px-8 text-lg uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/consultation')}
              >
                GET NUTRITION PLAN
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

<style jsx>{`
  .hero-logo-container {
    position: relative;
    display: inline-block;
  }
  
  .hero-logo-container:after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 20px;
    z-index: -1;
    animation: heroGlow 4s ease-in-out infinite alternate;
  }
  
  @keyframes heroGlow {
    0% {
      box-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1);
    }
    100% {
      box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.2);
    }
  }
  
  /* New animation for floating notification */
  .animated-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes baki-pulse {
    0%, 100% {
      transform: translateY(0) scale(1) rotate(0deg);
    }
    25% {
      transform: translateY(-2px) scale(1.02) rotate(-1deg);
    }
    50% {
      transform: translateY(2px) scale(0.98) rotate(1deg);
    }
    75% {
      transform: translateY(-1px) scale(1.01) rotate(0.5deg);
    }
  }
  
  .baki-pulse {
    animation: baki-pulse 1.5s ease-in-out infinite;
  }

  .animate-pulse-fast {
    animation: pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}</style> 