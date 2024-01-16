const IntakeCard = ({ title, bgColor, data }) => {
  return (
    <div
      className={`w-full md:ml-2 h-60 max-w-xs p-4 ${bgColor} border border-gray-200 rounded-lg shadow sm:p-8 overflow-y-auto`}
    >
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-bold leading-none text-gray-900'>
          {title}
        </h5>
      </div>
      <div className='flow-root'>
        <ul
          role='list'
          className='divide-y divide-gray-200 dark:divide-gray-700'
        >
          {data.map((item) => {
            return (
              <li
                className='py-3 sm:py-4'
                key={Math.random()}
              >
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {item}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default IntakeCard;
