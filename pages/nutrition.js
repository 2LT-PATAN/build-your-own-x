import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

export default function Nutrition() {
  const router = useRouter();

  return (
    <Layout title="Nutrition Planning | Space Seven">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/nutrition.jpg" 
            alt="Nutrition Planning" 
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
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Our Expertise</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white flex items-center">
              <Logo size="medium" light={true} withTagline={false} />
              <span className="ml-3">Nutrition Planning</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Personalized nutrition plans crafted by our experts to complement your fitness goals and maximize your results.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-tight">Personalized Nutrition</h2>
              <p className="text-gray-400 mb-6">
                Our nutritionists work with you to create a personalized meal plan that fits your lifestyle, preferences, and fitness goals. Whether you're looking to lose weight, build muscle, or optimize your performance, we'll create a sustainable plan that works for you.
              </p>
              
              <div className="space-y-4 mt-8">
                {[
                  "Personalized macronutrient calculations",
                  "Meal timing recommendations",
                  "Food preparation guidelines",
                  "Supplement recommendations when necessary",
                  "Regular adjustments based on progress"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-white">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/images/nutrition.jpg" 
                  alt="Nutrition Consultation" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3 text-white">Consultation</h3>
                  <p className="text-gray-400 text-sm">Initial assessment and goal setting with our nutrition experts.</p>
                </div>
                <div className="border border-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3 text-white">Meal Plans</h3>
                  <p className="text-gray-400 text-sm">Custom meal plans designed specifically for your body and goals.</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Call to Action */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Nutrition?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Schedule a consultation with our nutrition experts and start your journey to optimal health and performance.
            </p>
            <button className="bg-white text-black py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/90">
              Book a Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Nutrition Planning?</h2>
            <p className="text-gray-400">
              Our nutrition approach is comprehensive and personalized to ensure you reach your goals efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-user-settings-line',
                title: 'PERSONALIZED',
                description: 'Meal plans tailored specifically to your body type, goals, and preferences.'
              },
              {
                icon: 'ri-scales-3-line',
                title: 'BALANCED',
                description: 'Perfect macronutrient ratios for optimal performance and recovery.'
              },
              {
                icon: 'ri-plant-line',
                title: 'WHOLESOME',
                description: 'Focus on whole, nutrient-dense foods rather than restrictive dieting.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="border border-white/10 p-8 hover:bg-white/5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-6 w-12 h-12 border border-white/20 flex items-center justify-center">
                  <i className={`${benefit.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <motion.button
              className="inline-block border-2 border-white py-3 px-6 uppercase tracking-wider text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/consultation')}
            >
              Schedule Your Consultation
            </motion.button>
          </div>
        </div>
      </section>
    </Layout>
  );
} 