import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

// Mock data for demonstration
const mockClasses = [
  {
    id: '1',
    name: 'HIIT Challenge',
    description: 'High-intensity interval training for maximum calorie burn and cardiovascular conditioning.',
    instructor: 'Alex Johnson',
    duration: 45,
    location: 'Studio A',
    capacity: 20,
    enrolled: 14,
    difficulty: 'Advanced',
    schedule: [
      { day: 'Monday', time: '06:30', available: true },
      { day: 'Wednesday', time: '06:30', available: true },
      { day: 'Friday', time: '06:30', available: true }
    ],
    category: 'cardio',
    image: 'hiit.jpg'
  },
  {
    id: '2',
    name: 'Yoga Flow',
    description: 'A vinyasa-style yoga class linking breath with movement for improved flexibility and mindfulness.',
    instructor: 'Sarah Chen',
    duration: 60,
    location: 'Studio B',
    capacity: 25,
    enrolled: 18,
    difficulty: 'All Levels',
    schedule: [
      { day: 'Tuesday', time: '18:00', available: true },
      { day: 'Thursday', time: '18:00', available: true },
      { day: 'Saturday', time: '10:00', available: true }
    ],
    category: 'mind-body',
    image: 'yoga.jpg'
  },
  {
    id: '3',
    name: 'Power Lifting',
    description: 'Build strength and muscle mass with coached barbell movements and proper form instruction.',
    instructor: 'Mike Strong',
    duration: 50,
    location: 'Weight Room',
    capacity: 12,
    enrolled: 10,
    difficulty: 'Intermediate',
    schedule: [
      { day: 'Monday', time: '18:00', available: true },
      { day: 'Wednesday', time: '18:00', available: true },
      { day: 'Saturday', time: '12:00', available: true }
    ],
    category: 'strength',
    image: 'powerlifting.jpg'
  },
  {
    id: '4',
    name: 'Spin Class',
    description: 'Indoor cycling workout with high-energy music and motivational coaching.',
    instructor: 'Jessica Wheels',
    duration: 45,
    location: 'Spin Studio',
    capacity: 20,
    enrolled: 19,
    difficulty: 'All Levels',
    schedule: [
      { day: 'Tuesday', time: '06:30', available: true },
      { day: 'Thursday', time: '06:30', available: true },
      { day: 'Sunday', time: '09:00', available: true }
    ],
    category: 'cardio',
    image: 'spin.jpg'
  },
  {
    id: '5',
    name: 'BoxFit',
    description: 'Boxing-inspired fitness class focusing on cardio, strength, and agility.',
    instructor: 'Tony Punch',
    duration: 50,
    location: 'Studio A',
    capacity: 15,
    enrolled: 12,
    difficulty: 'Intermediate',
    schedule: [
      { day: 'Monday', time: '19:30', available: true },
      { day: 'Thursday', time: '19:30', available: true }
    ],
    category: 'cardio',
    image: 'boxing.jpg'
  },
  {
    id: '6',
    name: 'Pilates Core',
    description: 'Core-focused Pilates class to strengthen your center and improve posture.',
    instructor: 'Lisa Core',
    duration: 50,
    location: 'Studio B',
    capacity: 15,
    enrolled: 8,
    difficulty: 'All Levels',
    schedule: [
      { day: 'Wednesday', time: '12:00', available: true },
      { day: 'Friday', time: '12:00', available: true }
    ],
    category: 'mind-body',
    image: 'pilates.jpg'
  }
];

const mockBookings = [
  {
    id: 'booking-1',
    classId: '1',
    className: 'HIIT Challenge',
    instructor: 'Alex Johnson',
    date: '2023-06-28',
    day: 'Wednesday',
    time: '06:30',
    location: 'Studio A',
    status: 'confirmed'
  },
  {
    id: 'booking-2',
    classId: '2',
    className: 'Yoga Flow',
    instructor: 'Sarah Chen',
    date: '2023-06-29',
    day: 'Thursday',
    time: '18:00',
    location: 'Studio B',
    status: 'confirmed'
  }
];

export default function ClassesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchData = async () => {
      setLoadingData(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 500));
        setClasses(mockClasses);
        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleBookClass = (classItem, schedule) => {
    if (!user) return;
    
    setSelectedClass(classItem);
    setSelectedSchedule(schedule);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!user || !selectedClass || !selectedSchedule) return;
    
    // This would be replaced with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new booking
      const newBooking = {
        id: `booking-${Date.now()}`,
        classId: selectedClass.id,
        className: selectedClass.name,
        instructor: selectedClass.instructor,
        date: '2023-07-01', // This would be calculated based on the selected schedule
        day: selectedSchedule.day,
        time: selectedSchedule.time,
        location: selectedClass.location,
        status: 'confirmed'
      };
      
      // Add to bookings
      setBookings(prev => [...prev, newBooking]);
      
      // Show success message
      setBookingSuccess(true);
      
      // Close modal after delay
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error booking class:', error);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!user) return;
    
    // This would be replaced with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove booking from state
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const filteredClasses = classes.filter(classItem => {
    if (selectedCategory !== 'all' && classItem.category !== selectedCategory) {
      return false;
    }
    if (selectedDifficulty !== 'all' && classItem.difficulty.toLowerCase() !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  return (
    <Layout title="Fitness Classes">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/gym" className="mr-2 text-gray-400 hover:text-white">
            <i className="ri-arrow-left-line"></i> Back to Gym Homepage
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Fitness Classes</h1>
        <p className="text-gray-400">
          Browse and book our wide range of fitness classes led by expert instructors
        </p>
      </div>
      
      {loading || loadingData ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : !user ? (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="ri-lock-line text-3xl text-primary"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
          <p className="mb-6 text-gray-400">Please sign in to view and book fitness classes</p>
          <Link href="/" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
              <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Available Classes</h2>
                <div className="flex flex-wrap gap-2">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary p-2"
                  >
                    <option value="all">All Categories</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="mind-body">Mind & Body</option>
                  </select>
                  <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary p-2"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              {filteredClasses.length === 0 ? (
                <div className="bg-gray-700/50 rounded-lg p-8 text-center">
                  <p className="text-gray-300">No classes match your filter criteria. Please try different filters.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredClasses.map(classItem => (
                    <div key={classItem.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="flex flex-wrap md:flex-nowrap gap-4">
                        <div className="w-full md:w-1/4 flex-shrink-0">
                          <div className="bg-gray-600 rounded-lg h-36 flex items-center justify-center text-gray-400">
                            <i className="ri-image-line text-4xl"></i>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-medium text-white">{classItem.name}</h3>
                              <p className="text-sm text-gray-400">
                                <span className="font-medium text-gray-300">Instructor:</span> {classItem.instructor} | 
                                <span className="font-medium text-gray-300"> Duration:</span> {classItem.duration} min | 
                                <span className="font-medium text-gray-300"> Location:</span> {classItem.location}
                              </p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                              classItem.difficulty.toLowerCase() === 'advanced' 
                                ? 'bg-red-500/20 text-red-500' 
                                : classItem.difficulty.toLowerCase() === 'intermediate'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-green-500/20 text-green-500'
                            }`}>
                              {classItem.difficulty}
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{classItem.description}</p>
                          <div className="mb-3">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Available Times</div>
                            <div className="flex flex-wrap gap-2">
                              {classItem.schedule.map((schedule, idx) => (
                                <button 
                                  key={idx}
                                  onClick={() => handleBookClass(classItem, schedule)}
                                  className="px-3 py-1 bg-gray-600 hover:bg-primary/20 border border-gray-500 hover:border-primary text-gray-300 hover:text-primary rounded-full text-xs transition"
                                >
                                  {schedule.day} {schedule.time}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="text-gray-400">Availability: </span>
                              <span className="text-gray-300 font-medium">{classItem.enrolled}/{classItem.capacity} enrolled</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                              classItem.category === 'cardio' 
                                ? 'bg-blue-500/20 text-blue-500' 
                                : classItem.category === 'strength'
                                ? 'bg-primary/20 text-primary'
                                : 'bg-purple-500/20 text-purple-500'
                            }`}>
                              {classItem.category.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Your Bookings</h2>
              {bookings.length === 0 ? (
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-gray-300 mb-3">You haven't booked any classes yet.</p>
                  <p className="text-gray-400 text-sm">Browse our available classes and book your spots.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{booking.className}</h3>
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        <p><span className="text-gray-300">Instructor:</span> {booking.instructor}</p>
                        <p><span className="text-gray-300">When:</span> {booking.day} at {booking.time}</p>
                        <p><span className="text-gray-300">Where:</span> {booking.location}</p>
                      </div>
                      <button 
                        onClick={() => cancelBooking(booking.id)}
                        className="text-red-400 hover:text-red-300 text-sm flex items-center transition"
                      >
                        <i className="ri-close-circle-line mr-1"></i> Cancel booking
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full border border-gray-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">Book Class</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            {bookingSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-3">
                  <i className="ri-check-line text-3xl text-green-500"></i>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Booking Confirmed!</h4>
                <p className="text-gray-300">Your spot has been reserved.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-300 mb-4">
                    You are about to book a spot in <span className="font-medium text-white">{selectedClass?.name}</span> with {selectedClass?.instructor}.
                  </p>
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Class:</span>
                      <span className="text-white">{selectedClass?.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white">{selectedSchedule?.day} at {selectedSchedule?.time}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{selectedClass?.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{selectedClass?.duration} minutes</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-button hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-button"
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
} 