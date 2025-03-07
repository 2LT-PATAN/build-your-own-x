import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

export default function Gym() {
  // State for active tab in facilities section
  const [activeTab, setActiveTab] = useState('strength');
  
  // Gallery images
  const galleryImages = [
    { src: '/images/gym-interior.jpg', alt: 'Strength Training Area' },
    { src: '/images/gym-hero.jpg', alt: 'Main Gym Floor' },
    { src: '/images/strength.jpg', alt: 'Free Weights Section' },
    { src: '/images/cardio.jpg', alt: 'Cardio Equipment Zone' },
    { src: '/images/hiit.jpg', alt: 'HIIT Training Area' },
    { src: '/images/mind-body.jpg', alt: 'Recovery Zone' }
  ];
  
  // Training zones information
  const trainingZones = {
    strength: {
      title: 'Strength Training',
      description: 'Our comprehensive strength training area features top-of-the-line equipment including power racks, olympic platforms, free weights ranging from 2.5kg to 50kg, specialized machines, and dedicated areas for bodyweight exercises.',
      equipment: ['Power Racks', 'Olympic Platforms', 'Dumbbells (2.5kg-50kg)', 'Specialized Machines', 'Cable Systems'],
      image: '/images/strength.jpg'
    },
    cardio: {
      title: 'Cardio Zone',
      description: 'The cardio section offers a variety of state-of-the-art equipment designed to elevate your heart rate and improve cardiovascular health. Each machine features integrated performance tracking and entertainment options.',
      equipment: ['Treadmills', 'Ellipticals', 'Rowing Machines', 'Stationary Bikes', 'Stair Climbers', 'Air Bikes'],
      image: '/images/cardio.jpg'
    },
    functional: {
      title: 'Functional Training',
      description: 'Our functional training zone provides open space and versatile equipment for dynamic, multi-plane movements that enhance everyday performance and athletic ability.',
      equipment: ['Battle Ropes', 'Kettlebells', 'Medicine Balls', 'TRX Systems', 'Agility Ladders', 'Plyo Boxes'],
      image: '/images/hiit.jpg'
    },
    combat: {
      title: 'Combat Sports',
      description: 'Dedicated to boxing and MMA training, this zone features professional equipment for both beginners and advanced practitioners looking to enhance their combat skills or incorporate fight training into their fitness routine.',
      equipment: ['Boxing Rings', 'Heavy Bags', 'Speed Bags', 'MMA Cage', 'Grappling Mats', 'Focus Mitts'],
      image: '/images/strength.jpg'
    }
  };
  
  const router = useRouter();
  
  return (
    <Layout title="Gym | Space Seven">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[80vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          {/* Video background could be added here in production */}
          <img 
            src="/images/gym-interior.jpg" 
            alt="Gym Interior" 
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-white/70 mb-4">The Ultimate Fitness Experience</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white flex items-center">
              <Logo size="large" light={true} />
              <span className="ml-3 bg-white text-black px-3">GYM</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Spanning 45,000 sq. ft., our premium facility offers the latest equipment, specialized training zones, and luxury amenities for an unparalleled fitness experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-white text-black py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/90"
                onClick={() => router.push('/membership')}
              >
                Schedule a Tour
              </button>
              <button 
                className="border border-white py-3 px-8 text-white uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/10"
                onClick={() => router.push('/membership')}
              >
                View Membership
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[
              { value: '45,000', label: 'Square Feet' },
              { value: '200+', label: 'Premium Machines' },
              { value: '24/7', label: 'Access Available' },
              { value: '15+', label: 'Expert Trainers' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="border border-white/10 p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Facility Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Premium Facility</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our cutting-edge facility is designed to optimize your workout experience with specialized zones for every training style.
            </p>
          </motion.div>
          
          {/* Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden h-64 bg-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-white text-sm font-medium">{image.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Training Zones Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap border-b border-gray-200">
              {Object.keys(trainingZones).map((zone) => (
                <button
                  key={zone}
                  className={`py-3 px-6 font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative ${
                    activeTab === zone ? 'text-black' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab(zone)}
                >
                  {trainingZones[zone].title}
                  {activeTab === zone && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Active Zone Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{trainingZones[activeTab].title}</h3>
              <p className="text-gray-700 mb-6">{trainingZones[activeTab].description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Equipment Includes:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {trainingZones[activeTab].equipment.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-black mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
              <img 
                src={trainingZones[activeTab].image} 
                alt={trainingZones[activeTab].title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Premium Amenities */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Luxury Amenities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide premium amenities to enhance your training experience and support your recovery.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Locker Rooms',
                description: 'Premium locker rooms with private showers, digital locks, and grooming stations.',
                icon: 'ri-door-lock-line'
              },
              {
                title: 'Recovery Zone',
                description: 'Dedicated space for stretching, foam rolling, and mobility work to optimize recovery.',
                icon: 'ri-rest-time-line'
              },
              {
                title: 'Nutrition Bar',
                description: 'Protein shakes, supplements, and healthy snacks to fuel your workouts.',
                icon: 'ri-cup-line'
              },
              {
                title: 'Complimentary Towels',
                description: 'Fresh, clean towels provided for every workout session.',
                icon: 'ri-shirt-line'
              },
              {
                title: 'Personal Training',
                description: 'Expert trainers available for customized workout programs and guidance.',
                icon: 'ri-user-star-line'
              },
              {
                title: 'Mobile App',
                description: 'Track workouts, book classes, and manage your membership with our dedicated app.',
                icon: 'ri-smartphone-line'
              }
            ].map((amenity, index) => (
              <motion.div
                key={index}
                className="p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}
              >
                <div className="text-3xl mb-4">
                  <i className={amenity.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{amenity.title}</h3>
                <p className="text-gray-400">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Boxing & MMA Feature Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-tight">
                PREMIER BOXING & MMA FACILITIES
              </h2>
              <p className="text-gray-700 mb-6">
                Space Seven offers dedicated facilities for combat sports enthusiasts. Our boxing and MMA zone is equipped with professional-grade equipment and supervised by experienced trainers.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Professional boxing ring",
                  "MMA cage and grappling area",
                  "Olympic wrestling mats",
                  "Heavy bags of varying weights",
                  "Speed bags and reflex training equipment",
                  "Specialized conditioning tools"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-black">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <button className="bg-black text-white py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-black/90">
                Learn More About Combat Sports
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl h-96">
                <img 
                  src="/images/strength.jpg"
                  alt="Boxing and MMA" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Our Facility Today</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join the premier fitness destination in Tricity. Your first visit includes a personalized tour and consultation with our expert trainers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="bg-white text-black py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/90"
                onClick={() => router.push('/membership')}
              >
                Book a Free Trial
              </button>
              <button 
                className="border border-white py-3 px-8 text-white uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/10"
                onClick={() => router.push('/membership')}
              >
                View Membership Plans
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 