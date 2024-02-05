import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Fragment, useMemo, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import MainLogo from '../../assets/logo.png';
import fetchUtil from '../../utils/request';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/UserContext';

const navigation = {
  pages: [
    { name: 'DailyIntake', href: '/dailyintake' },
    { name: 'Profile', href: '/dailyintake/profile' },
  ],
};

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();
  const { pathname } = useLocation();

  const logoutHandler = async () => {
    setCurrentUser(undefined);
    navigate('/');
    await fetchUtil.get('/auth/logout');
    toast.success('User Succesfully Logged Out');
  };

  const linkProps = useMemo(() => {
    if (currentUser?.user !== undefined) {
      return (
        <Link
          onClick={logoutHandler}
          className='text-sm font-medium text-gray-700 hover:text-gray-800'
        >
          Logout
        </Link>
      );
    } else {
      return (
        <Link
          to='/login'
          className='text-sm font-medium text-gray-700 hover:text-gray-800'
        >
          Login
        </Link>
      );
    }
  }, [currentUser?.user]);

  return (
    <>
      <div className='bg-white z-100'>
        {/* Mobile menu */}
        <Transition.Root
          show={mobileNavOpen}
          as={Fragment}
        >
          <Dialog
            as='div'
            className='relative z-40 lg:hidden'
            onClose={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                  <div className='flex px-4 pb-2 pt-5'>
                    <button
                      type='button'
                      className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                      onClick={() => setMobileNavOpen(false)}
                    >
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon
                        className='h-6 w-6'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                  <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                    {navigation.pages.map((page) => (
                      <div
                        key={page.name}
                        className='flow-root'
                      >
                        <Link
                          to={page.href}
                          className='-m-2 block p-2 font-medium text-gray-900'
                          onClick={() => setMobileNavOpen(false)}
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                    <div className='flow-root'>{linkProps}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className='relative bg-white'>
          <nav
            aria-label='Top'
            className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
          >
            <div className='border-b border-gray-200'>
              <div className='flex h-16 items-center'>
                <button
                  type='button'
                  className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
                  onClick={() => setMobileNavOpen(true)}
                >
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open menu</span>
                  <Bars3Icon
                    className='h-6 w-6'
                    aria-hidden='true'
                  />
                </button>

                {/* Logo */}
                <div className='ml-auto flex lg:ml-0'>
                  <Link to={'/'}>
                    <img
                      className='h-8 w-auto'
                      src={MainLogo}
                      alt='Logo of the page'
                    />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                  <div className='flex h-full space-x-8'>
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className={`flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 ${
                          pathname === page.href && 'underline decoration-2'
                        }`}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Group>

                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {linkProps}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};
export default Header;
