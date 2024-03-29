import { useEffect, useMemo, useRef, useState } from 'react';
import IntakeCard from '../Common/IntakeCard';
import Body from '../Common/Body';
import fetchUtil from '../../utils/request';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/UserContext';

const DailyIntake = () => {
  const [newIntake, setNewIntake] = useState('');
  const [radioOption, setRadioOption] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState();
  const { currentUser, userIntakes, setUserIntakes } = useUserContext();
  const userName = currentUser?.user.userName;
  const blueRadioRef = useRef(null);
  const redRadioRef = useRef(null);

  useEffect(() => {
    setButtonIsDisabled(!newIntake || !radioOption);
  }, [newIntake, radioOption]);

  const getUserIntakes = async () => {
    try {
      const data = await fetchUtil.get('/intake');
      setUserIntakes(data.data.intakeData);
    } catch (error) {
      console.log(error);
    }
  };
  const todaysDate = new Date().toLocaleDateString();

  const onSubmitHandler = async () => {
    try {
      await fetchUtil.post('/intake', {
        intake: newIntake,
        pill: radioOption,
        date: todaysDate,
      });
      setNewIntake('');
      setRadioOption('');
      blueRadioRef.current.checked = false;
      redRadioRef.current.checked = false;
      getUserIntakes();
      toast.success('Intake successfully added');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const todaysIntakes = useMemo(() => {
    return userIntakes?.filter((intake) => intake.date === todaysDate);
  }, [userIntakes]);

  const highQuality = useMemo(() => {
    return todaysIntakes?.filter((intake) => intake.pill === 'blue');
  }, [todaysIntakes]);
  const lowQuality = useMemo(() => {
    return todaysIntakes?.filter((intake) => intake.pill === 'red');
  }, [todaysIntakes]);

  return (
    <>
      <header className='bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Welcome Back {userName}!
          </h1>
        </div>
      </header>
      <div className='container mx-auto'>
        <main className='grid gap-6 mb-6 lg:grid-cols-2'>
          <div>
            <div className='mx-auto max-w-7xl py-6 px-6 lg:px-8'>
              <form>
                <div className='grid gap-6 mb-6'>
                  <div>
                    <label
                      htmlFor='nutrient'
                      className='block mb-2 text-sm font-medium text-gray-400'
                    >
                      Nutrient
                    </label>
                    <input
                      value={newIntake}
                      type='text'
                      id='nutrient'
                      onChange={(e) => setNewIntake(e.target.value)}
                      className='bg-white-50 border border-white-300 text-sm rounded-lg text-gray-400 focus:ring-green-500 focus:border-green-500 block w-full p-2.5'
                      placeholder='Enter the nutrient'
                      required
                    />
                  </div>
                </div>
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  <div className='flex items-center ps-4 border border-gray-200 rounded'>
                    <input
                      id='blue'
                      type='radio'
                      value='blue'
                      ref={blueRadioRef}
                      onChange={(e) => setRadioOption(e.target.value)}
                      name='nutrient-radio'
                      className='w-3 h-3 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2'
                    />
                    <label
                      htmlFor='blue'
                      className='w-full py-4 ms-2 text-sm font-medium text-blue-900 '
                    >
                      Take the Blue Pill - High Quality Ingredient
                    </label>
                  </div>
                  <div className='flex items-center ps-4 border border-gray-200 rounded '>
                    <input
                      id='red'
                      type='radio'
                      value='red'
                      ref={redRadioRef}
                      onChange={(e) => setRadioOption(e.target.value)}
                      name='nutrient-radio'
                      className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2'
                    />
                    <label
                      htmlFor='red'
                      className='w-full py-4 ms-2 text-sm font-medium text-red-900'
                    >
                      Take the Red Pill - Low Quality Ingredient
                    </label>
                  </div>
                </div>
                <button
                  type='button'
                  disabled={buttonIsDisabled}
                  onClick={onSubmitHandler}
                  className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center disabled:bg-gray-300 disabled:cursor-not-allowed'
                >
                  Submit
                </button>
              </form>
            </div>
            <div className='grid gap-6 mb-6 px-2 grid-cols-2 justify-center'>
              <IntakeCard
                bgColor={'bg-green-400'}
                title={'High Quality'}
                data={highQuality}
                key='highQuality'
                profile={false}
                getUserIntakes={getUserIntakes}
              />
              <IntakeCard
                bgColor={'bg-red-400'}
                title={'Low Quality'}
                data={lowQuality}
                key='lowQuality'
                profile={false}
                getUserIntakes={getUserIntakes}
              />
            </div>
          </div>
          <div className='m-auto flex-row align-middle justify-center'>
            <Body
              blueLength={highQuality?.length}
              redLength={lowQuality?.length}
              className='transition ease-in-out delay-150 duration-300'
            />
          </div>
        </main>
      </div>
    </>
  );
};
export default DailyIntake;
