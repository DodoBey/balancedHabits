import { memo, useMemo, useState } from 'react';
import { comments } from '../constants/comments';

const Body = ({ blueLength, redLength }) => {
  const [comment, setComment] = useState('');

  const bodyFiller = useMemo(() => {
    const totalLength = 100;
    const totalIntake = blueLength + redLength;

    if (!blueLength && !redLength) {
      const arr = comments.noIntake;
      setComment(arr[Math.floor(Math.random() * arr.length)]);
      return (
        <stop
          offset='100%'
          stopColor='none'
        />
      );
    } else if (!blueLength && redLength) {
      const arr = comments.allRed;
      setComment(arr[Math.floor(Math.random() * arr.length)]);
      return (
        <stop
          offset='100%'
          stopColor='#f87171'
        />
      );
    } else if (!redLength && blueLength) {
      const arr = comments.allGreen;
      setComment(arr[Math.floor(Math.random() * arr.length)]);
      return (
        <stop
          offset='100%'
          stopColor='#4ade80'
        />
      );
    } else if (blueLength > redLength) {
      const arr = comments.green;
      setComment(arr[Math.floor(Math.random() * arr.length)]);
      return (
        <>
          <stop
            offset={Math.floor((totalLength / totalIntake) * blueLength) + `%`}
            stopColor={'#4ade80'}
          />
          <stop
            offset={Math.floor((totalLength / totalIntake) * redLength) + `%`}
            stopColor={'#f87171'}
          />
        </>
      );
    } else if (redLength > blueLength) {
      const arr = comments.red;
      setComment(arr[Math.floor(Math.random() * arr.length)]);
      return (
        <>
          <stop
            offset={Math.floor((totalLength / totalIntake) * redLength) + `%`}
            stopColor={'#f87171'}
          />
          <stop
            offset={Math.floor((totalLength / totalIntake) * blueLength) + `%`}
            stopColor={'#4ade80'}
          />
        </>
      );
    } else {
      const arr = comments.balance;
      setComment(arr[Math.floor(Math.random() * arr.length)]);
      return (
        <>
          <stop
            offset={Math.floor((totalLength / totalIntake) * blueLength) + `%`}
            stopColor={'#4ade80'}
          />
          <stop
            offset={Math.floor((totalLength / totalIntake) * redLength) + `%`}
            stopColor={'#f87171'}
          />
        </>
      );
    }
  }, [blueLength, redLength]);

  return (
    <>
      <svg
        width='256px'
        height='256px'
        viewBox='0 0 512 512'
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        className='m-auto'
      >
        <defs>
          <linearGradient
            id='grad'
            gradientTransform='rotate(90)'
          >
            {bodyFiller}
          </linearGradient>
        </defs>
        <circle
          fill='url(#grad)'
          stroke='#000000'
          strokeMiterlimit='10'
          strokeWidth='5.12'
          cx='256'
          cy='56'
          r='40'
        ></circle>
        <path
          fill='url(#grad)'
          stroke='#000000'
          strokeMiterlimit='10'
          strokeWidth='5.12'
          d='M199.3,295.62h0l-30.4,172.2a24,24,0,0,0,19.5,27.8,23.76,23.76,0,0,0,27.6-19.5l21-119.9v.2s5.2-32.5,17.5-32.5h3.1c12.5,0,17.5,32.5,17.5,32.5v-.1l21,119.9a23.92,23.92,0,1,0,47.1-8.4l-30.4-172.2-4.9-29.7c-2.9-18.1-4.2-47.6.5-59.7,4-10.4,14.13-14.2,23.2-14.2H424a24,24,0,0,0,0-48H88a24,24,0,0,0,0,48h92.5c9.23,0,19.2,3.8,23.2,14.2,4.7,12.1,3.4,41.6.5,59.7Z'
        ></path>
      </svg>
      <p className='text-center font-bold italic mt-6'>"{comment}"</p>
    </>
  );
};
export default memo(Body);
