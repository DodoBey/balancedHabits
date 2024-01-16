import { useEffect, useState } from 'react';
import IntakeCard from '../common/IntakeCard';
import Body from './Body';

const DailyIntake = () => {
  const [nutrient, setNutrient] = useState('');
  const [radioOption, setRadioOption] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState();

  useEffect(() => {
    if (!nutrient || !radioOption) {
      setButtonIsDisabled(true);
    } else {
      setButtonIsDisabled(false);
    }
  }, [nutrient, radioOption]);

  const highQuality = ['Coffee', 'Water', 'Club Soda'];
  const lowQuality = ['Sucuk'];

  return (
    <>
      <header className='bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Welcome Back!
          </h1>
        </div>
      </header>
      <main className='grid gap-6 mb-6 md:grid-cols-2'>
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
                    type='text'
                    id='nutrient'
                    value={nutrient}
                    onChange={(e) => setNutrient(e.target.value)}
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
                    onChange={(e) => setRadioOption(e.target.value)}
                    name='nutrient-radio'
                    className='w-3 h-3 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2 '
                  />
                  <label
                    htmlFor='bordered-radio-1'
                    className='w-full py-4 ms-2 text-sm font-medium text-blue-900 '
                  >
                    Blue Pill - High Quality Ingredient
                  </label>
                </div>
                <div className='flex items-center ps-4 border border-gray-200 rounded '>
                  <input
                    id='red'
                    type='radio'
                    value='red'
                    onChange={(e) => setRadioOption(e.target.value)}
                    name='nutrient-radio'
                    className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2'
                  />
                  <label
                    htmlFor='bordered-radio-2'
                    className='w-full py-4 ms-2 text-sm font-medium text-red-900'
                  >
                    Red Pill - Low Quality Ingredient
                  </label>
                </div>
              </div>
              <button
                type='submit'
                disabled={buttonIsDisabled}
                className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-600 disabled:cursor-not-allowed'
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
            />
            <IntakeCard
              bgColor={'bg-red-400'}
              title={'Low Quality'}
              data={lowQuality}
            />
          </div>
        </div>
        <div className='m-auto flex-row align-middle justify-center'>
          <Body
            blueLength={highQuality.length}
            redLength={lowQuality.length}
            className='transition ease-in-out delay-150 duration-300'
          />
        </div>
      </main>
    </>
  );
};
export default DailyIntake;
