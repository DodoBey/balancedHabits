const Footer = () => {
  return (
    <footer className='fixed inset-x-0 bottom-0 bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-white-800 antialiased'>
      <p className='mb-4 text-sm text-center text-gray-500 dark:text-gray-600 sm:mb-0'>
        &copy; 2024{' '}
        <a
          href='https://flowbite.com/'
          className='hover:underline'
          target='_blank'
        >
          DodoBey Project
        </a>
        . All rights reserved.
      </p>
      <div className='flex justify-center items-center space-x-1'></div>
    </footer>
  );
};
export default Footer;
