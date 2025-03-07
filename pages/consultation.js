import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function Consultation() {
  const router = useRouter();
  const { user } = useAuth();
  const formSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: formSectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effect for background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.6, 0.5]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    dietaryRestrictions: [],
    fitnessLevel: '',
    medicalConditions: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);
  
  // For dynamic popup text
  const [currentPopupText, setCurrentPopupText] = useState(0);
  const popupTexts = [
    "Weight Loss & Management",
    "Muscle Building & Recovery",
    "Sports Performance Nutrition",
    "Plant-Based Diet Planning",
    "Holistic Wellness Approach"
  ];
  
  // Change popup text periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPopupText((prev) => (prev + 1) % popupTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, dietaryRestrictions: [...prev.dietaryRestrictions, value] };
      } else {
        return { ...prev, dietaryRestrictions: prev.dietaryRestrictions.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would:
      // 1. Save the consultation request to your database
      // 2. Generate a PDF based on the form data
      // 3. Send the PDF to the user's email

      // Simulating an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      formRef.current.reset();
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        weight: '',
        height: '',
        gender: '',
        goal: '',
        dietaryRestrictions: [],
        fitnessLevel: '',
        medicalConditions: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this at the beginning of the component
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  // Function to handle direct navigation
  const goToMembership = () => {
    // Try multiple approaches
    try {
      // Method 1: Direct window location change
      window.location.replace('/membership');
    } catch (e) {
      console.error("Navigation failed:", e);
      // Method 2: Try opening in new tab as fallback
      window.open('/membership', '_blank');
    }
  };

  // Add this useEffect to setup the membership button functionality
  useEffect(() => {
    // Setup direct handler for membership button after component mounts
    const membershipBtn = document.getElementById('membershipBtn');
    if (membershipBtn) {
      membershipBtn.addEventListener('click', function() {
        console.log("Direct click handler fired");
        window.open('/membership', '_self');
      });
    }

    // Cleanup event listener
    return () => {
      const membershipBtn = document.getElementById('membershipBtn');
      if (membershipBtn) {
        membershipBtn.removeEventListener('click', function() {
          window.open('/membership', '_self');
        });
      }
    };
  }, []);

  return (
    <Layout title="Nutrition Consultation">
      {/* Hero Section with Team Photo */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        {/* Background gradient & overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/80">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("/images/pattern-dark.png")', backgroundSize: '100px' }}></div>
        </div>
        
        {/* Hero content */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4 block">Personalized Guidance</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Nutrition <span className="bg-white text-black px-2">Consultation</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Work with our expert nutritionists to develop a customized meal plan 
              tailored to your specific goals, preferences, and dietary requirements.
            </p>
            <div className="h-px w-24 bg-white/20 mx-auto mb-12"></div>
          </motion.div>
          
          {/* Team photo and Programs Reference Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Team Photo */}
            <motion.div 
              className="relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/images/trainers.png" 
                alt="Our Nutrition Experts" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Our Expert Nutrition Team</h3>
                <p className="text-white/80 max-w-xl text-sm">
                  Our certified nutritionists bring years of experience helping clients achieve their wellness goals through personalized nutrition planning.
                </p>
              </div>
            </motion.div>
            
            {/* Programs Reference with Dynamic Popup */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#111827] border border-white/10 p-8 h-full relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-4">Nutrition Programs</h3>
                
                {/* Dynamic Popup Text */}
                <div className="relative h-16 mb-6 overflow-hidden">
                  {popupTexts.map((text, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 flex items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: currentPopupText === index ? 1 : 0,
                        y: currentPopupText === index ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-white/10 px-4 py-2 rounded-md text-white/90 text-lg font-medium">
                        {text}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-white/70 mb-6">
                  We offer specialized nutrition programs for various goals and lifestyles. 
                  Our approach combines science-backed nutrition principles with practical, 
                  sustainable meal planning.
                </p>
                
                <ul className="text-white/80 mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Personalized meal plans
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Nutrient timing strategies
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Dietary adjustments based on progress
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Expert guidance and accountability
                  </li>
                </ul>
                
                <Link href="/programs" className="inline-block bg-white/10 hover:bg-white/20 border border-white/20 py-3 px-6 text-white text-sm uppercase tracking-wider transition-all duration-300">
                  View All Programs
                </Link>
                
                {/* Background accent */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Consultation Form Section */}
      <section ref={formSectionRef} className="py-20 relative overflow-hidden">
        {/* Nutrition background image with scroll effect - no filters or overlays */}
        <motion.div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ 
            y: backgroundY,
            opacity: backgroundOpacity
          }}
        >
          <img 
            src="/images/nutrition.jpg" 
            alt="Nutrition Background" 
            className="absolute w-full h-full object-cover object-center"
          />
        </motion.div>
        
        {/* Make sure form elements are visible against raw background */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-md">Complete Your Consultation Request</h2>
              <p className="text-white/90 max-w-xl mx-auto drop-shadow-md">
                Fill out the form below with your details and requirements. 
                After submission, you'll receive a preliminary meal plan PDF via email.
              </p>
              
              {/* Nutrition info callout - more opaque background to ensure readability */}
              <div className="mt-8 p-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg inline-block">
                <div className="flex items-center justify-center space-x-2 text-white/90 text-sm mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Science-Backed Nutrition Planning</span>
                </div>
                <p className="text-white/80 text-xs max-w-md">
                  Our approach combines the latest nutritional science with practical meal planning 
                  that fits your lifestyle. Each plan is designed to optimize your health metrics
                  while being sustainable and enjoyable.
                </p>
              </div>
            </motion.div>
            
            {/* Success Message */}
            {showSuccess && (
              <motion.div 
                className="bg-green-900/30 border border-green-500/30 text-green-100 rounded-md p-4 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Your consultation request has been submitted successfully! Check your email within 24 hours for your personalized nutrition plan.</p>
                </div>
              </motion.div>
            )}
            
            {/* Form */}
            <motion.form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-black/75 backdrop-blur-md border border-white/10 p-8 rounded-md shadow-xl"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Personal Information */}
                <div>
                  <label className="block text-white/90 text-sm mb-2" htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2" htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2" htmlFor="gender">Gender</label>
                  <select 
                    id="gender" 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2" htmlFor="age">Age *</label>
                  <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    required
                    min="1" 
                    max="120"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2" htmlFor="weight">Weight (kg) *</label>
                  <input 
                    type="number" 
                    id="weight" 
                    name="weight" 
                    required
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2" htmlFor="height">Height (cm) *</label>
                  <input 
                    type="number" 
                    id="height" 
                    name="height" 
                    required
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2" htmlFor="fitnessLevel">Fitness Level *</label>
                  <select 
                    id="fitnessLevel" 
                    name="fitnessLevel" 
                    required
                    value={formData.fitnessLevel}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                  >
                    <option value="">Select Fitness Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2" htmlFor="goal">Primary Goal *</label>
                <select 
                  id="goal" 
                  name="goal" 
                  required
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                >
                  <option value="">Select Your Primary Goal</option>
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="performance">Athletic Performance</option>
                  <option value="health">General Health</option>
                </select>
              </div>
              
              {/* Dietary Restrictions */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2">Dietary Restrictions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergies', 'Low Carb'].map((restriction) => (
                    <div key={restriction} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={restriction.toLowerCase().replace(' ', '_')} 
                        name="dietaryRestrictions" 
                        value={restriction}
                        checked={formData.dietaryRestrictions.includes(restriction)}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4"
                      />
                      <label 
                        htmlFor={restriction.toLowerCase().replace(' ', '_')} 
                        className="text-white/80 text-sm"
                      >
                        {restriction}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2" htmlFor="medicalConditions">Medical Conditions (if any)</label>
                <textarea 
                  id="medicalConditions" 
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30 h-24"
                  placeholder="Please list any medical conditions or medications that might impact your nutrition plan..."
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label className="block text-white/80 text-sm mb-2" htmlFor="message">Additional Information</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30 h-24"
                  placeholder="Tell us more about your lifestyle, food preferences, or specific goals..."
                ></textarea>
              </div>
              
              {/* Submission */}
              <div className="text-center">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`inline-block py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-white/20 text-white/50 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-white/90'
                    }`}
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Consultation Request'}
                  </button>
                  
                  {/* Direct scriptless anchor with absolute positioning for maximum reliability */}
                  <div className="relative inline-block" style={{ verticalAlign: 'top' }}>
                    <a 
                      href="/membership"
                      className="bg-white text-black py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/90 inline-flex items-center justify-center"
                      style={{ textDecoration: 'none' }}
                    >
                      Become a Member
                    </a>
                    {/* Backup clickable region with high z-index */}
                    <div 
                      className="absolute inset-0 z-30 cursor-pointer"
                      onClick={goToMembership}
                      onKeyDown={(e) => e.key === 'Enter' && goToMembership()}
                      role="button"
                      tabIndex={0}
                      aria-label="Become a Member"
                    />
                    
                    {/* Hidden iframe to preload membership page */}
                    <iframe 
                      src="/membership" 
                      style={{ 
                        position: 'absolute', 
                        width: '1px', 
                        height: '1px', 
                        opacity: 0,
                        pointerEvents: 'none'
                      }}
                      title="Membership page preload"
                      onLoad={() => setIframeLoaded(true)}
                    />
                  </div>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
              <div className="h-px w-24 bg-white/20 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How long does it take to receive my meal plan?",
                  answer: "You'll receive a preliminary meal plan PDF within 24 hours of your consultation request. After your first session with the nutritionist, you'll receive a comprehensive personalized plan within 3-5 business days."
                },
                {
                  question: "Can I update my meal plan if it's not working for me?",
                  answer: "Absolutely! Your consultation includes one free revision of your meal plan. Additional revisions can be requested during follow-up sessions with your nutritionist."
                },
                {
                  question: "Do I need to purchase specific supplements?",
                  answer: "No, our meal plans focus primarily on whole foods. While we may recommend supplements based on your specific needs, they are always optional and not required for the plan to be effective."
                },
                {
                  question: "How detailed is the personalized meal plan?",
                  answer: "Your meal plan includes daily meal breakdowns, portion sizes, macronutrient distributions, grocery shopping lists, and simple recipes. It's designed to be practical and easy to follow."
                },
                {
                  question: "Can I schedule a follow-up after receiving my plan?",
                  answer: "Yes, we recommend a follow-up session 2-3 weeks after implementing your plan. This allows us to make adjustments based on your progress and feedback."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="border border-white/10 p-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-medium mb-3 text-white">{faq.question}</h3>
                  <p className="text-white/70">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 