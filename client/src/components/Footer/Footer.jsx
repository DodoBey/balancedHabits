const Footer = () => {
  return (
    <footer className='sticky top-[100vh] inset-x-0 bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 antialiased'>
      <p className='mb-4 text-sm text-center text-gray-500 sm:mb-0'>
        &copy; 2024{' '}
        <a
          href='https://dogukanyigiter.notion.site/dogukanyigiter/'
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
