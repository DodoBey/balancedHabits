import { memo } from 'react';
import fetchUtil from '../../utils/request';
import { toast } from 'react-toastify';

const IntakeCard = ({ title, bgColor, data, profile, getUserIntakes }) => {
  const deleteHandler = async (id) => {
    try {
      await fetchUtil.delete(`/intake/${id}`);
      getUserIntakes();
      toast.success('Intake successfully deleted');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div
      className={`w-48 ${
        !profile && 'lg:w-72'
      } md:ml-6 h-60 p-4 ${bgColor} border border-gray-200 rounded-lg shadow sm:p-8 overflow-y-auto`}
    >
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-bold leading-none text-gray-900'>
          {title}
        </h5>
      </div>
      <div className='flow-root'>
        {data?.length > 0 ? (
          <ul
            role='list'
            className='divide-y divide-gray-200'
          >
            {data.map((item) => (
              <li
                className={`py-3 sm:py-4 flex justify-between group ${
                  !profile && 'hover:cursor-pointer'
                } `}
                key={Math.random()}
                {...(!profile && { onClick: () => deleteHandler(item._id) })}
              >
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {item.intake}
                </p>
                {!profile && (
                  <span className='text-sm opacity-0 group-hover:opacity-100 transition-opacity'>
                    Delete
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className='font-medium text-gray-900 overflow-auto mt-4'>
            {profile
              ? 'No records found for the selected date'
              : 'No records found'}
          </p>
        )}
      </div>
    </div>
  );
};
export default memo(IntakeCard);
