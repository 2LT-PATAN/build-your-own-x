import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

export default function Layout({ children, title = 'Space Seven Fitness' }) {
  const { user, userProfile, logout, signInWithGoogle } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  
  const pageTitle = `${title} | Space Seven`;

  // Handle scroll effect for navbar
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

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };

  const navVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const pageTransition = {
    hidden: { opacity: 0, y: 10 },
    enter: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Calculate theme styles
  const theme = isDarkMode 
    ? { bg: 'bg-black', text: 'text-white', border: 'border-white' }
    : { bg: 'bg-white', text: 'text-black', border: 'border-black' };
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Premium fitness and wellness center in Tricity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      {/* Footer would go here if you have one */}
    </>
  );
} 