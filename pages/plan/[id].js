import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PlanDetails from '../../components/PlanDetails';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';

export default function PlanPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading } = useAuth();
  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !user) return;

    const fetchPlan = async () => {
      try {
        setPlanLoading(true);
        const planRef = doc(db, 'nutrition_plans', id);
        const planSnap = await getDoc(planRef);

        if (!planSnap.exists()) {
          setError('Plan not found');
          return;
        }

        if (planSnap.data().userId !== user.uid) {
          setError('You do not have permission to view this plan');
          return;
        }

        setPlan({
          id: planSnap.id,
          ...planSnap.data()
        });
      } catch (err) {
        console.error('Error fetching plan:', err);
        setError('Failed to load plan');
      } finally {
        setPlanLoading(false);
      }
    };

    fetchPlan();
  }, [id, user]);

  return (
    <Layout title={plan ? 'Nutrition Plan' : 'Loading Plan'}>
      <div className="mb-6">
        <Link href="/" className="text-gray-400 hover:text-white inline-flex items-center">
          <i className="ri-arrow-left-line mr-1"></i> Back to Dashboard
        </Link>
      </div>

      {loading || planLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <i className="ri-error-warning-line text-3xl text-red-500"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Error Loading Plan</h3>
          <p className="mb-6 text-gray-400">{error}</p>
          <Link href="/" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
            Back to Dashboard
          </Link>
        </div>
      ) : !user ? (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="ri-lock-line text-3xl text-primary"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
          <p className="mb-6 text-gray-400">Please sign in to view this nutrition plan</p>
          <Link href="/" className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 inline-block">
            Go to Login
          </Link>
        </div>
      ) : (
        <PlanDetails plan={plan} />
      )}
    </Layout>
  );
} 