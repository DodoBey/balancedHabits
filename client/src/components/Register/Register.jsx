import {
  Form,
  Link,
  redirect,
  useNavigation,
  useNavigate,
} from 'react-router-dom';
import MainLogo from '../../assets/logo.png';
import fetchUtil from '../../utils/request';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/UserContext';
import { useEffect } from 'react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.password !== data.confirmPassword) {
    toast.warning('Passwords do not match');
    return null;
  }

  try {
    await fetchUtil.post('/auth/register', data);
    toast.success('User Successfully Created');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
    return error;
  }
};

const Register = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

  useEffect(() => {
    if (currentUser?.user !== undefined) {
      navigate('/dailyintake');
    }
  }, []);

  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Link to={'/'}>
            <img
              className='mx-auto h-20 w-auto'
              src={MainLogo}
              alt='Logo of the web app'
            />
          </Link>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create an account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Form
            className='space-y-6'
            action='#'
            method='post'
          >
            <div>
              <label
                htmlFor='userName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Username
              </label>
              <div className='mt-2'>
                <input
                  id='userName'
                  name='userName'
                  type='text'
                  autoComplete='userName'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email Address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='confirmPassword'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={submitting}
                className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
              >
                {submitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </Form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <Link
              to={'/login'}
              className='font-semibold leading-6 text-green-600 hover:text-green-500'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Register;
