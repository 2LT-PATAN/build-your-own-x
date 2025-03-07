import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

export default function About() {
  // Customer testimonials
  const testimonials = [
    {
      name: "Kiran Kaur",
      image: "/images/testimonials/testimonial-1.jpg", // Placeholder image
      text: "The spacious and most comfortable Gym in this vicinity. They have variety of equipments and good ambience plus very spacious area. The trainers and staff are all very friendly and humble, they all are professional and very knowledgeable about their work. This place is best for people who want their money's worth!",
      stars: 5
    },
    {
      name: "Govind Bindra",
      image: "/images/testimonials/testimonial-2.jpg", // Placeholder image
      text: "An amazing gym providing holistic equipments to cater all the needs. Great ambiance, decor and being strong machines provide relishing and delightful workout. A top notch quality gym. From basic to advanced, everything is covered. Highly recommended in tricity. 10/10",
      stars: 5
    },
    {
      name: "Arkhis Thor",
      image: "/images/testimonials/testimonial-3.jpg", // Placeholder image
      text: "Amazing superb gym! Vibe matches excellent machines and personal trainers. My first favorite is shubham. Very intelligent and smart. Tagging him in the photos enhance it more nicer and better remeber keep 7 star gym aesthetics",
      stars: 5
    }
  ];

  // Facility features
  const features = [
    {
      title: "45,000 sq. ft. Space",
      description: "The largest fitness facility in the Tricity area with ample space for all your workout needs.",
      icon: "ri-building-line"
    },
    {
      title: "Premium Equipment",
      description: "State-of-the-art machines and equipment for every type of training regimen.",
      icon: "ri-fitness-line"
    },
    {
      title: "Expert Trainers",
      description: "Professional and knowledgeable staff to guide you through your fitness journey.",
      icon: "ri-user-star-line"
    },
    {
      title: "Specialized Programs",
      description: "From Boxing to MMA, we offer specialized training programs for enthusiasts of all levels.",
      icon: "ri-boxing-line"
    }
  ];

  return (
    <Layout title="About Us">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/gym-interior.jpg" 
            alt="Space Seven Gym" 
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
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Our Story</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              About <Logo size="large" light={true} withTagline={false} />
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Tricity's premier fitness destination, offering an unparalleled workout experience in a luxury environment.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-tight">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At <span className="font-semibold">Space Seven</span>, we believe fitness is more than just physical training—it's a lifestyle that encompasses mental wellbeing, nutrition, and community. Our mission is to provide the Tricity area with a premium fitness experience that transforms lives.
              </p>
              <p className="text-gray-700 mb-6">
                Founded with the vision of creating a fitness space without limitations, <span className="font-semibold">Space Seven</span> has grown to become the largest and most comprehensive training facility in the region, spanning an impressive 45,000 square feet.
              </p>
              <p className="text-gray-700">
                We pride ourselves on combining luxury amenities with practical, results-driven training methodologies, creating an environment where anyone—from beginners to professional athletes—can achieve their fitness goals.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/gym-hero.jpg" 
                  alt="Space Seven Interior" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">What Sets Us Apart</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our unique blend of premium facilities, expert guidance, and exclusive amenities makes Space Seven the ultimate fitness destination.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 border border-white/10 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}
              >
                <div className="text-3xl mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">What Our Members Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Hear from our community of fitness enthusiasts who've transformed their lives at Space Seven.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg p-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  {/* Star rating */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-6">"{testimonial.text}"</blockquote>
                  
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                        {/* This could be updated with actual member photos if available */}
                        <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">Space Seven Member</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Space Seven Today</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join us and discover why we're rated as the best gym in Tricity. Your fitness journey begins here.
            </p>
            <button className="bg-white text-black py-3 px-8 uppercase tracking-wider text-sm font-medium transition-all duration-300 hover:bg-white/90">
              Become a Member
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 