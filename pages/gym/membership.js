import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

// Mock data for demonstration
const membershipPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 49,
    features: [
      { text: 'Access to gym equipment', included: true },
      { text: '2 group classes per week', included: true },
      { text: 'Basic AI workout plans', included: true },
      { text: 'Personal training sessions', included: false },
      { text: 'Nutrition consultation', included: false }
    ],
    popular: false,
    color: 'primary'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 89,
    features: [
      { text: 'Unlimited gym access', included: true },
      { text: 'Unlimited group classes', included: true },
      { text: 'Advanced AI workout plans', included: true },
      { text: '2 personal training sessions/month', included: true },
      { text: 'Nutrition consultation', included: false }
    ],
    popular: true,
    color: 'primary'
  },
  {
    id: 'elite',
    name: 'Elite Plan',
    price: 129,
    features: [
      { text: '24/7 gym access', included: true },
      { text: 'Unlimited group classes', included: true },
      { text: 'Premium AI workout plans', included: true },
      { text: '4 personal training sessions/month', included: true },
      { text: 'Monthly nutrition consultation', included: true }
    ],
    popular: false,
    color: 'secondary'
  }
];

// Mock user subscription data
const mockUserSubscription = {
  planId: 'premium',
  status: 'active',
  startDate: '2023-05-15',
  nextBillingDate: '2023-07-15',
  paymentMethod: 'Visa ending in 4242'
};

export default function MembershipPage() {
  const router = useRouter();
  const { plan: selectedPlanFromQuery } = router.query;
  const { user, loading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Mock payment form state
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    postalCode: ''
  });

  // Effect to set the selected plan from URL query parameter
  useEffect(() => {
    if (selectedPlanFromQuery) {
      const plan = membershipPlans.find(p => p.id === selectedPlanFromQuery);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, [selectedPlanFromQuery]);

  // Effect to load user subscription data
  useEffect(() => {
    const fetchSubscription = async () => {
      setLoadingSubscription(true);
      try {
        // This would be replaced with actual API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Use mock data for demo
        setSubscription(mockUserSubscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoadingSubscription(false);
      }
    };

    if (user) {
      fetchSubscription();
    } else {
      setLoadingSubscription(false);
    }
  }, [user]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    window.scrollTo({
      top: document.getElementById('signup-section').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const handleStartFreeTrial = () => {
    if (!user) {
      router.push('/');
      return;
    }
    
    setShowPaymentModal(true);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    setPaymentLoading(true);
    
    try {
      // This would be replaced with actual payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPaymentSuccess(true);
      
      // After success, redirect or update UI
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        // Update subscription data
        setSubscription({
          planId: selectedPlan.id,
          status: 'active',
          startDate: new Date().toISOString().split('T')[0],
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          paymentMethod: 'Visa ending in 4242'
        });
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Get the current subscription plan object
  const currentPlan = subscription ? membershipPlans.find(p => p.id === subscription.planId) : null;

  return (
    <Layout title="Gym Membership">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/gym" className="mr-2 text-gray-400 hover:text-white">
            <i className="ri-arrow-left-line"></i> Back to Gym Homepage
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Membership Plans</h1>
        <p className="text-gray-400">
          Choose the perfect membership plan that suits your fitness journey and goals
        </p>
      </div>
      
      {/* Current Subscription Section (if logged in and has subscription) */}
      {user && subscription && !loading && !loadingSubscription && (
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-6 mb-12 border border-primary/40">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div>
              <div className="text-sm text-gray-400 mb-1">Current Plan</div>
              <h2 className="text-2xl font-bold text-white">{currentPlan?.name}</h2>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</div>
                <div className="text-sm">
                  <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                    {subscription.status}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Start Date</div>
                <div className="text-sm text-gray-300">{formatDate(subscription.startDate)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Next Billing</div>
                <div className="text-sm text-gray-300">{formatDate(subscription.nextBillingDate)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Payment Method</div>
                <div className="text-sm text-gray-300">{subscription.paymentMethod}</div>
              </div>
            </div>
            <div>
              <button 
                onClick={() => router.push('/gym/account')}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-button text-sm transition"
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {membershipPlans.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg border ${
              plan.popular ? `border-${plan.color}` : 'border-gray-700'
            } ${plan.popular ? 'relative transform md:scale-105' : ''}`}
          >
            {plan.popular && (
              <div className={`absolute top-0 right-0 bg-${plan.color} text-white px-3 py-1 text-sm font-semibold`}>
                Popular
              </div>
            )}
            <div className={`bg-${plan.popular ? plan.color : 'gray-700'} p-6`}>
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-white">${plan.price}<span className="text-base font-normal text-gray-300">/month</span></div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    {feature.included ? (
                      <i className="ri-check-line text-green-500 mr-2"></i>
                    ) : (
                      <i className="ri-close-line text-red-500 mr-2"></i>
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePlanSelect(plan)}
                className={`block w-full py-2 text-center ${
                  plan.popular 
                    ? 'bg-white hover:bg-gray-100 text-primary' 
                    : `bg-${plan.color} hover:bg-${plan.color}/90 text-white`
                } rounded-button transition font-medium`}
              >
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Sign-up Section */}
      <div id="signup-section" className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedPlan 
                ? `Get Started with ${selectedPlan.name}` 
                : 'Choose a plan above to get started'}
            </h2>
            {selectedPlan && (
              <p className="text-gray-400">
                {selectedPlan.id === 'basic' && 'Perfect for beginners looking to start their fitness journey'}
                {selectedPlan.id === 'premium' && 'Our most popular plan with the perfect balance of features and value'}
                {selectedPlan.id === 'elite' && 'The ultimate fitness experience with all premium features included'}
              </p>
            )}
          </div>
          
          {selectedPlan && (
            <div className="text-center">
              <div className="bg-gray-700/50 rounded-lg p-6 inline-block mb-6">
                <div className="text-gray-400 mb-2">Selected Plan</div>
                <div className="text-2xl font-bold text-white mb-1">{selectedPlan.name}</div>
                <div className="text-xl text-primary">${selectedPlan.price}/month</div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">What's included:</h3>
                <ul className="space-y-2 mb-6 inline-block text-left">
                  {selectedPlan.features
                    .filter(feature => feature.included)
                    .map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <i className="ri-check-line text-green-500 mr-2"></i>
                        {feature.text}
                      </li>
                    ))}
                </ul>
              </div>
              
              <button 
                onClick={handleStartFreeTrial}
                className={`px-8 py-3 bg-${selectedPlan.color} hover:bg-${selectedPlan.color}/90 text-white rounded-button font-medium text-lg transition inline-flex items-center`}
              >
                <i className="ri-bank-card-line mr-2"></i>
                {user ? 'Subscribe Now' : 'Sign In to Subscribe'}
              </button>
              <p className="text-gray-500 mt-4 text-sm">
                No commitment. Cancel anytime. First 7 days free.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Members Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied members who have transformed their lives with Space Seven Gym
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <i className="ri-user-line text-xl text-gray-400"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">David Chen</h4>
                <p className="text-gray-400">Elite Member - 2 years</p>
              </div>
            </div>
            <p className="text-gray-300 italic mb-4">
              "The personal training sessions in the Elite plan are absolutely worth it. My trainer has helped me achieve goals I never thought possible. The 24/7 access fits perfectly with my busy schedule."
            </p>
            <div className="flex text-yellow-400">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <i className="ri-user-line text-xl text-gray-400"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Sarah Thompson</h4>
                <p className="text-gray-400">Premium Member - 1 year</p>
              </div>
            </div>
            <p className="text-gray-300 italic mb-4">
              "I was hesitant about the Premium plan but it's been the best investment in myself. Unlimited classes and the AI workout planner keep me motivated. I've lost 20kg and gained so much confidence!"
            </p>
            <div className="flex text-yellow-400">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <i className="ri-user-line text-xl text-gray-400"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Mike Johnson</h4>
                <p className="text-gray-400">Basic Member - 6 months</p>
              </div>
            </div>
            <p className="text-gray-300 italic mb-4">
              "The Basic plan gives me everything I need as a beginner. The equipment is top-notch and the class instructors are motivating. I'm planning to upgrade to Premium soon for the advanced features."
            </p>
            <div className="flex text-yellow-400">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-line"></i>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to commonly asked questions about our membership plans
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Can I change my plan later?</h3>
            <p className="text-gray-300">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Is there a joining fee?</h3>
            <p className="text-gray-300">
              No, there are no joining fees or hidden costs. The price you see is the price you pay, and you can cancel anytime.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">How do I book classes?</h3>
            <p className="text-gray-300">
              Once you're a member, you can book classes through our website or mobile app. Premium and Elite members get priority booking.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">What is the cancellation policy?</h3>
            <p className="text-gray-300">
              You can cancel your membership anytime through your account settings. There are no cancellation fees, and you'll continue to have access until the end of your current billing period.
            </p>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full border border-gray-700 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">Complete Your Subscription</h3>
                <p className="text-gray-400 text-sm">{selectedPlan?.name} - ${selectedPlan?.price}/month</p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            {paymentSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-3">
                  <i className="ri-check-line text-3xl text-green-500"></i>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Payment Successful!</h4>
                <p className="text-gray-300 mb-6">Your subscription has been activated.</p>
                <p className="text-green-500 text-sm">Your 7-day free trial has started.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitPayment}>
                <div className="flex border-b border-gray-700 mb-6">
                  <button
                    type="button"
                    className={`py-2 px-4 ${paymentMethod === 'card' ? 'text-white border-b-2 border-primary' : 'text-gray-400'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-4 ${paymentMethod === 'paypal' ? 'text-white border-b-2 border-primary' : 'text-gray-400'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    PayPal
                  </button>
                </div>
                
                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Name on Card</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                        value={paymentForm.name}
                        onChange={e => setPaymentForm({...paymentForm, name: e.target.value})}
                        placeholder="John Smith"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                        value={paymentForm.cardNumber}
                        onChange={e => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                          value={paymentForm.expiry}
                          onChange={e => setPaymentForm({...paymentForm, expiry: e.target.value})}
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                          value={paymentForm.cvc}
                          onChange={e => setPaymentForm({...paymentForm, cvc: e.target.value})}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-primary focus:ring-primary"
                        value={paymentForm.postalCode}
                        onChange={e => setPaymentForm({...paymentForm, postalCode: e.target.value})}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
                      <i className="ri-paypal-fill text-3xl text-blue-500"></i>
                    </div>
                    <p className="text-gray-300 mb-4">You will be redirected to PayPal to complete your payment.</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-button font-medium transition flex items-center justify-center"
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? (
                      <>
                        <i className="ri-loader-2-line animate-spin mr-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'card' ? 'Pay Now' : 'Continue to PayPal'}
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>Your card will not be charged until after your 7-day free trial.</p>
                  <p className="mt-1">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
} 