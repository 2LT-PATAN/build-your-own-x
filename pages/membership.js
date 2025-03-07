import { motion } from 'framer-motion';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Membership() {
  // State for selected plan
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  
  // Membership plans
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '₹1,999',
      period: 'per month',
      features: [
        'Full access to all facilities',
        'Basic fitness assessment',
        'Access to group classes',
        'Free Wi-Fi & locker use',
        'No long-term commitment'
      ],
      cta: 'Join Now',
      popular: false
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: '₹5,499',
      period: 'per quarter',
      features: [
        'All Monthly plan benefits',
        'One personal training session/month',
        'Nutrition consultation',
        'Guest passes (1 per month)',
        'Save ₹1,500 compared to monthly'
      ],
      cta: 'Choose Plan',
      popular: true
    },
    {
      id: 'annual',
      name: 'Annual',
      price: '₹19,999',
      period: 'per year',
      features: [
        'All Quarterly plan benefits',
        'Two personal training sessions/month',
        'Quarterly body composition analysis',
        'Premium app features',
        'Save ₹4,000 compared to monthly'
      ],
      cta: 'Best Value',
      popular: false
    }
  ];
  
  // Additional membership benefits
  const benefits = [
    {
      title: 'Premium Facilities',
      description: 'Access to 45,000 sq. ft. of premium fitness space with the latest equipment',
      icon: 'ri-building-4-line'
    },
    {
      title: 'Expert Trainers',
      description: 'Guidance from certified professionals specializing in various fitness domains',
      icon: 'ri-user-star-line'
    },
    {
      title: 'Flexible Timings',
      description: '24/7 access to accommodate your schedule with convenient booking options',
      icon: 'ri-time-line'
    },
    {
      title: 'Specialized Programs',
      description: 'Access to Boxing, MMA, HIIT, Strength Training and more specialized programs',
      icon: 'ri-boxing-line'
    }
  ];

  return (
    <Layout title="Membership Plans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/gym-interior.jpg" 
            alt="Membership" 
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
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Unlock Your Potential</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Membership Plans</h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Join Tricity's premier fitness destination and experience a new level of training excellence with our flexible membership options.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Plans */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Choose Your Plan</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select the membership that fits your fitness goals and lifestyle. All plans include access to our premium facilities and basic amenities.
            </p>
          </div>
          
          {/* Pricing Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex border border-white/30 rounded-lg p-1">
              {['monthly', 'quarterly', 'annual'].map((period) => (
                <button
                  key={period}
                  className={`py-2 px-5 rounded-md text-sm font-medium ${
                    selectedPlan === period 
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => setSelectedPlan(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className={`relative border ${
                  plan.popular ? 'border-white' : 'border-white/20'
                } p-8 rounded-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-white mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className={`w-full py-3 px-6 text-sm font-medium tracking-wider uppercase ${
                    plan.popular 
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'border border-white/70 text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Membership Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Membership Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every Space Seven membership includes premium features designed to enhance your fitness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="p-6 border border-black/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                    <i className={benefit.icon}></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Form */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-gray-400 mb-8">
                Fill out the form and one of our membership advisors will contact you to finalize your membership and schedule your first session.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "No processing fees for new members",
                  "Free fitness assessment with every new membership",
                  "Flexible payment options available",
                  "Corporate membership discounts available",
                  "30-day satisfaction guarantee"
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
              <form className="border border-white/20 rounded-lg p-8">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="Your email"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="plan" className="block text-white mb-2">Preferred Plan</label>
                  <select
                    id="plan"
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-300 text-sm">I agree to the terms and conditions</span>
                  </label>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-white text-black py-3 uppercase tracking-wider text-sm font-medium"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Application
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions about joining Space Seven? Find answers to the most common questions below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "Can I cancel my membership at any time?",
                a: "Monthly memberships can be cancelled with 7 days notice. Quarterly and annual plans have a minimum commitment period, after which you can cancel anytime."
              },
              {
                q: "Are there any additional fees?",
                a: "Your membership covers all basic amenities. Some specialized services like personalized training or nutrition plans may have additional costs."
              },
              {
                q: "Do you offer student discounts?",
                a: "Yes, we offer special rates for students with valid ID. Please inquire at our front desk for current student pricing."
              },
              {
                q: "Can I freeze my membership?",
                a: "Members can freeze their membership for up to 30 days per year for medical reasons or extended travel at no extra cost."
              },
              {
                q: "What are your operating hours?",
                a: "We're open Monday to Saturday from 5 AM to 11 PM, and Sundays from 7 AM to 1 PM."
              },
              {
                q: "Do you provide workout gear or towels?",
                a: "We provide complimentary towels. Workout gear and specialized equipment is available for rent or purchase."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-200 pb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a href="/contact" className="inline-block border-2 border-black py-2 px-6 text-sm uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
} 