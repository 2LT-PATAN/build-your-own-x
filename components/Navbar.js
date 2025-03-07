import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation links with proper routes
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gym', path: '/gym' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Programs', path: '/programs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-black/60 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo without glow effect */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Logo size="small" light={true} className="cursor-pointer" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                  router.pathname === link.path 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Call to action */}
          <div className="hidden md:block">
            <Link
              href="/membership"
              className="bg-white/10 border border-white/20 backdrop-blur-sm py-2 px-4 text-white text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/20"
            >
              Join Now
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white block md:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation - Always dark background */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              className="md:hidden mt-4 py-4 border-t border-white/10 bg-black/95 backdrop-blur-lg rounded-b-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <div className="flex flex-col space-y-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                      router.pathname === link.path 
                        ? 'text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/membership"
                  className="bg-white/15 border border-white/20 py-2 px-4 text-white text-center text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/25"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      
      {/* Only keep the cursor removal styles */}
      <style jsx global>{`
        /* Remove cursor blinking across website */
        * {
          caret-color: transparent;
        }
        
        /* Only enable cursor in input fields, textareas and contenteditable elements */
        input, textarea, [contenteditable="true"] {
          caret-color: auto;
        }
      `}</style>
    </header>
  );
} 