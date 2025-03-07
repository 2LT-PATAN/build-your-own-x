import Link from 'next/link';
import Layout from '../components/Layout';
import NutritionForm from '../components/NutritionForm';
import { useAuth } from '../context/AuthContext';

export default function CreatePlan() {
  const { user, loading } = useAuth();

  return (
    <Layout title="Create Nutrition Plan">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/" className="mr-2 text-gray-400 hover:text-white">
            <i className="ri-arrow-left-line"></i> Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Create Nutrition Plan</h1>
        <p className="text-gray-400">
          Fill in your details to generate a personalized nutrition plan
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : !user ? (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="ri-lock-line text-3xl text-primary"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
          <p className="mb-6 text-gray-400">Please sign in to create a nutrition plan</p>
          <Link href="/" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
            Go to Login
          </Link>
        </div>
      ) : (
        <NutritionForm />
      )}
    </Layout>
  );
} 