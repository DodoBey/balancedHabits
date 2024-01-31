import { useUserContext } from '../../context/userContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Profile.css';
import { useMemo, useState } from 'react';
import IntakeCard from '../Common/IntakeCard';
import fetchUtil from '../../utils/request';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Profile = () => {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [editUser, setEditUser] = useState(false);
  const { currentUser, setCurrentUser, userIntakes } = useUserContext();
  const userName = currentUser?.user.userName;
  const email = currentUser?.user.email;
  const [userEmail, setUserEmail] = useState(email);
  const [username, setUsername] = useState(userName);
  const formattedDate = selectedDate.toLocaleDateString();

  const intakesOnSelectedDays = useMemo(() => {
    return userIntakes?.filter((intake) => intake.date === formattedDate);
  }, [formattedDate, userIntakes]);

  const highQuality = useMemo(() => {
    return intakesOnSelectedDays?.filter((intake) => intake.pill === 'blue');
  }, [intakesOnSelectedDays]);
  const lowQuality = useMemo(() => {
    return intakesOnSelectedDays?.filter((intake) => intake.pill === 'red');
  }, [intakesOnSelectedDays]);

  const uniqueDates = useMemo(() => {
    return [...new Set(userIntakes?.map((entry) => entry.date))];
  });
  const allBlueData = useMemo(() => {
    return userIntakes?.filter((intake) => intake.pill === 'blue');
  }, [userIntakes]);

  const healthyPercentage = useMemo(() => {
    return ((allBlueData?.length * 100) / userIntakes?.length).toFixed();
  }, [userIntakes]);

  const updateUserHandler = async () => {
    try {
      await fetchUtil.patch('/users/updateUser', {
        email: userEmail,
        userName: username,
      });
      const { data } = await fetchUtil.get('/users/getCurrentUser');
      setEditUser(!editUser);
      setCurrentUser(data);
      toast.success('User successfully updated');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const userEditHandler = () => {
    setEditUser(!editUser);
  };

  const userProfileProps = useMemo(() => {
    if (!editUser) {
      return (
        <>
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {userName}
          </p>
          <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
            {email}
          </p>
        </>
      );
    } else {
      return (
        <>
          <input
            id='username'
            type='text'
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            className='block leading-6 text-sm font-semibold text-gray-900 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-full pl-1'
            required
          />
          <input
            id='email'
            type='email'
            defaultValue={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className='block leading-5 mt-1 text-xs text-gray-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-full pl-1'
            required
          />
        </>
      );
    }
  }, [userName, email, editUser]);

  const userButtonProps = useMemo(() => {
    if (editUser) {
      return (
        <button
          className='text-sm text-gray-900 hover:text-gray-500 disabled:text-red-600 disabled:cursor-not-allowed'
          onClick={updateUserHandler}
          disabled={!username || !email}
        >
          Save
        </button>
      );
    } else {
      return (
        <button
          className='text-sm text-gray-900 hover:text-gray-500'
          onClick={userEditHandler}
        >
          Update user
        </button>
      );
    }
  }, [editUser, username, userEmail]);

  return (
    <>
      <>
        <div className='container mx-auto'>
          <main className='grid gap-6 mb-6 md:grid-cols-2'>
            <div className='mx-auto py-6 px-6 lg:px-8'>
              <div className='flex min-w-0 gap-x-4'>
                <UserCircleIcon className='h-12 w-12 flex-none rounded-full bg-gray-50' />
                <div className='min-w-0 flex-auto'>{userProfileProps}</div>
                <div className=' shrink-0 sm:flex sm:flex-col sm:items-end my-auto'>
                  {userButtonProps}
                </div>
              </div>
              <div className='mt-10'>
                <p className='text-sm'>
                  {uniqueDates?.length > 0
                    ? `You have recorded your intake for ${uniqueDates?.length} days, and you are staying ${healthyPercentage}% on the healthy side.`
                    : `You haven't record anything yet, start keeping your daily intakes and come back later`}
                </p>
              </div>
            </div>
            <div className='flex flex-col'>
              <Calendar
                className='border-gray-200 rounded-lg shadow sm:p-8 mt-4 m-auto w-96 mb-6'
                activeStartDate={selectedDate}
                defaultValue={selectedDate}
                onChange={setselectedDate}
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
              />
              <div className='grid gap-6 mb-6 px-2 grid-cols-2 mx-auto'>
                <IntakeCard
                  bgColor={'bg-green-400'}
                  title={'High Quality'}
                  data={highQuality}
                  key='highQuality'
                  profile={true}
                />
                <IntakeCard
                  bgColor={'bg-red-400'}
                  title={'Low Quality'}
                  data={lowQuality}
                  key='lowQuality'
                  profile={true}
                />
              </div>
            </div>
          </main>
        </div>
      </>
    </>
  );
};
export default Profile;
