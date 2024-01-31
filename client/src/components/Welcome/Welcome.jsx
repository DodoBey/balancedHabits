import { Link, useNavigate } from 'react-router-dom';
import BGTop from '../Common/BGTop';
import { useUserContext } from '../../context/userContext';
import { useEffect } from 'react';
import SuspenseFallback from '../Common/SuspenseFallback';

const Welcome = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

  useEffect(() => {
    if (currentUser?.user !== undefined) {
      navigate('/dailyintake');
    }
  }, []);

  return currentUser?.user === undefined ? (
    <div className='bg-white min-h-screen'>
      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <BGTop />
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Keep your day balanced
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Keep the records of your intakes, stay on the positive side and
              build healthy habits
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to={'register'}
                className='rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
              >
                Register
              </Link>
            </div>
            <p className='mt-10 text-center text-sm text-gray-500'>
              Already have an account?{' '}
              <Link
                to={'login'}
                className='font-semibold leading-6 text-green-600 hover:text-green-500'
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <SuspenseFallback />
  );
};
export default Welcome;
