import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

export default function Contact() {
  // Hours of operation
  const hours = [
    { day: 'Monday', time: '5 AM – 11 PM' },
    { day: 'Tuesday', time: '5 AM – 11 PM' },
    { day: 'Wednesday', time: '5 AM – 11 PM' },
    { day: 'Thursday', time: '5 AM – 11 PM' },
    { day: 'Friday', time: '5 AM – 11 PM' },
    { day: 'Saturday', time: '5 AM – 11 PM' },
    { day: 'Sunday', time: '7 AM – 1 PM' },
  ];

  return (
    <Layout title="Contact Us">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/gym-hero.jpg" 
            alt="Contact Space Seven" 
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
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white flex items-center">
              Contact <div className="ml-3"><Logo size="large" light={true} withTagline={false} /></div>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              We're here to answer any questions you may have about our facilities, programs, or membership options.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-tight text-black">Get In Touch</h2>
              
              <div className="space-y-8">
                {/* Location */}
                <div className="flex">
                  <div className="mr-6 mt-1">
                    <div className="p-3 bg-black rounded-full text-white">
                      <i className="ri-map-pin-line text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Visit Us</h3>
                    <p className="text-gray-700 mb-1">C-124, Phase-8, Industrial Area, Sector 73</p>
                    <p className="text-gray-700 mb-1">Sahibzada Ajit Singh Nagar, Punjab 160059</p>
                    <p className="text-gray-700">Plus Code: PP75+JC Sahibzada Ajit Singh Nagar, Punjab</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex">
                  <div className="mr-6 mt-1">
                    <div className="p-3 bg-black rounded-full text-white">
                      <i className="ri-phone-line text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Call Us</h3>
                    <p className="text-gray-700">
                      <a href="tel:+919056811172" className="hover:text-black/70 transition-colors">
                        +91 90568 11172
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Email - using a placeholder since no email was provided */}
                <div className="flex">
                  <div className="mr-6 mt-1">
                    <div className="p-3 bg-black rounded-full text-white">
                      <i className="ri-mail-line text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Email Us</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@spaceseven.in" className="hover:text-black/70 transition-colors">
                        info@spaceseven.in
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Hours */}
                <div className="flex">
                  <div className="mr-6 mt-1">
                    <div className="p-3 bg-black rounded-full text-white">
                      <i className="ri-time-line text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Hours of Operation</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {hours.map((schedule, index) => (
                        <div key={index} className={index === 6 ? "col-span-2" : ""}>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">{schedule.day}</span>
                            <span className="text-gray-600">{schedule.time}</span>
                          </div>
                          {index < 6 && <div className="h-px bg-gray-200 my-2"></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Social Media - placeholders since none were provided */}
                <div className="flex">
                  <div className="mr-6 mt-1">
                    <div className="p-3 bg-black rounded-full text-white">
                      <i className="ri-global-line text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-600 hover:text-black transition-colors">
                        <i className="ri-instagram-line text-2xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-black transition-colors">
                        <i className="ri-facebook-fill text-2xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-black transition-colors">
                        <i className="ri-youtube-line text-2xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-tight text-black">Send Us a Message</h2>
              
              {/* Simple Contact Form */}
              <form className="mb-10">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-800 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-800 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Your email address"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-800 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-black text-white py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-black/80"
                >
                  Send Message
                </button>
              </form>
              
              {/* Map (Placeholder - would be replaced with actual Google Maps embed in production) */}
              <div className="h-80 bg-gray-200 relative overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.144532562227!2d76.69040427534092!3d30.726383674579862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee8e98116015%3A0xe19bb91dfaea7e23!2sSpace%20Seven%20Fitness!5e0!3m2!1sen!2sin!4v1690623422293!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Visit Space Seven today and see why we're the best gym in Tricity for Boxing, MMA, and comprehensive fitness training.
            </p>
            <button className="bg-white text-black py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/90">
              Schedule a Tour
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 