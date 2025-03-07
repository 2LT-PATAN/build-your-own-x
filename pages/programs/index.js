import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Programs() {
  // Programs array
  const programs = [
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
  ];

  return (
    <Layout title="Programs | Space Seven">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/images/custom.jpg" 
            alt="Programs" 
            className="w-full h-full object-cover brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Training Excellence</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Our Programs</h1>
            <p className="text-lg text-white/80 mb-8">
              Comprehensive training programs designed to help you achieve your fitness goals, whatever they may be.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Programs Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white">
            {programs.map((program, index) => (
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
    </Layout>
  );
} 