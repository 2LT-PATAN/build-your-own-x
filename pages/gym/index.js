import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

export default function GymHome() {
  const { user, loading } = useAuth();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <Layout title="Space Seven Gym">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[600px] mb-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <motion.div 
          className="absolute inset-0 bg-[url('/images/gym-hero.jpg')] bg-cover bg-center grayscale"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-black tracking-tight mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            SPACE <span className="bg-white text-black px-2">SEVEN</span> GYM
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8 max-w-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The ultimate fitness experience in a sleek, minimalist environment.
            Focus on what matters: your transformation.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-5"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/gym/membership" 
                className="border-2 border-white py-3 px-6 uppercase tracking-wider font-medium inline-block hover:bg-white hover:text-black transition-all duration-300"
              >
                Join Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/gym/workout-plans" 
                className="border-2 border-white bg-white text-black py-3 px-6 uppercase tracking-wider font-medium inline-block hover:bg-transparent hover:text-white transition-all duration-300"
              >
                AI Workout Plans
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Elite Fitness Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Space Seven Gym offers state-of-the-art equipment and personalized 
            AI-powered workout plans in a distraction-free environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="border border-white p-8 hover:bg-white hover:text-black transition-all duration-500"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="w-14 h-14 border border-white flex items-center justify-center mb-6 group-hover:border-black transition-all duration-500">
              <i className="ri-robot-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">AI Workout Planner</h3>
            <p className="text-gray-400 mb-6 group-hover:text-gray-800">
              Get personalized workout routines based on your fitness goals, experience level, and available time.
            </p>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link href="/gym/workout-plans" className="flex items-center uppercase text-sm tracking-wider">
                Create Your Plan <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="border border-white p-8 hover:bg-white hover:text-black transition-all duration-500"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="w-14 h-14 border border-white flex items-center justify-center mb-6 group-hover:border-black transition-all duration-500">
              <i className="ri-calendar-check-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Class Booking</h3>
            <p className="text-gray-400 mb-6 group-hover:text-gray-800">
              Browse and book a wide variety of fitness classes, from HIIT to yoga, with our expert instructors.
            </p>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link href="/gym/classes" className="flex items-center uppercase text-sm tracking-wider">
                View Schedule <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="border border-white p-8 hover:bg-white hover:text-black transition-all duration-500"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="w-14 h-14 border border-white flex items-center justify-center mb-6 group-hover:border-black transition-all duration-500">
              <i className="ri-restaurant-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Nutrition Planning</h3>
            <p className="text-gray-400 mb-6 group-hover:text-gray-800">
              Complement your workouts with personalized nutrition plans designed to maximize your results.
            </p>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link href="/create-plan" className="flex items-center uppercase text-sm tracking-wider">
                Get Nutrition Plan <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Membership Section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Membership Plans</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect membership plan that suits your fitness journey and goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="border border-white overflow-hidden"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="p-8 border-b border-white">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Basic Plan</h3>
              <div className="text-3xl font-black">$49<span className="text-base font-normal text-gray-400">/month</span></div>
            </div>
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Access to gym equipment
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> 2 group classes per week
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Basic AI workout plans
                </li>
                <li className="flex items-center text-gray-500">
                  <i className="ri-close-line mr-3"></i> Personal training sessions
                </li>
                <li className="flex items-center text-gray-500">
                  <i className="ri-close-line mr-3"></i> Nutrition consultation
                </li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/gym/membership?plan=basic" className="block w-full py-3 text-center border-2 border-white hover:bg-white hover:text-black uppercase tracking-wider font-medium transition-all duration-300">
                  Choose Plan
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="border-2 border-white relative transform md:scale-105"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="absolute top-0 right-0 bg-white text-black px-3 py-1 text-sm font-bold uppercase">
              Popular
            </div>
            <div className="p-8 border-b border-white">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Premium Plan</h3>
              <div className="text-3xl font-black">$89<span className="text-base font-normal text-gray-400">/month</span></div>
            </div>
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Unlimited gym access
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Unlimited group classes
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Advanced AI workout plans
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> 2 personal training sessions/month
                </li>
                <li className="flex items-center text-gray-500">
                  <i className="ri-close-line mr-3"></i> Nutrition consultation
                </li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/gym/membership?plan=premium" className="block w-full py-3 text-center bg-white text-black border-2 border-white hover:bg-transparent hover:text-white uppercase tracking-wider font-medium transition-all duration-300">
                  Choose Plan
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="border border-white overflow-hidden"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="p-8 border-b border-white">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Elite Plan</h3>
              <div className="text-3xl font-black">$129<span className="text-base font-normal text-gray-400">/month</span></div>
            </div>
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> 24/7 gym access
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Unlimited group classes
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Premium AI workout plans
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> 4 personal training sessions/month
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-3"></i> Monthly nutrition consultation
                </li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/gym/membership?plan=elite" className="block w-full py-3 text-center border-2 border-white hover:bg-white hover:text-black uppercase tracking-wider font-medium transition-all duration-300">
                  Choose Plan
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Member Success Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from our members who have transformed their lives with Space Seven Gym.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="border border-white p-8 hover:bg-white hover:text-black transition-all duration-500"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 border border-white flex items-center justify-center mr-6 group-hover:border-black rounded-full">
                <i className="ri-user-line text-2xl"></i>
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase">Sarah Johnson</h4>
                <p className="text-gray-400">Premium Member - 8 months</p>
              </div>
            </div>
            <p className="mb-6 italic">
              "The AI workout planner at Space Seven has completely transformed my fitness journey. I've lost 15kg and gained more strength than ever before. The minimalist environment keeps me focused."
            </p>
            <div className="flex">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
          </motion.div>

          <motion.div 
            className="border border-white p-8 hover:bg-white hover:text-black transition-all duration-500"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 border border-white flex items-center justify-center mr-6 group-hover:border-black rounded-full">
                <i className="ri-user-line text-2xl"></i>
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase">Michael Chen</h4>
                <p className="text-gray-400">Elite Member - 1 year</p>
              </div>
            </div>
            <p className="mb-6 italic">
              "As a busy professional, the class booking system and personalized nutrition plans have been a game changer. The clean, distraction-free design helps me focus only on my workout."
            </p>
            <div className="flex">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="border border-white p-16 mb-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase">Ready to Transform?</h2>
        <p className="mb-10 max-w-2xl mx-auto text-gray-300">
          Join Space Seven Gym today and experience fitness in its purest form.
          No distractions, just results.
        </p>
        <motion.div 
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="/gym/membership" 
            className="border-2 border-white py-3 px-8 uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </motion.div>
    </Layout>
  );
} 