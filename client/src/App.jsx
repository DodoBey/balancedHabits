import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

const HomeLayout = lazy(() =>
  import('./components/Layout/HomeLayout/HomeLayout')
);
const Register = lazy(() => import('./components/Register/Register'));
const DailyIntake = lazy(() => import('./components/DailyIntake/DailyIntake'));
const LandingLayout = lazy(() =>
  import('./components/Layout/LandingLayout/LandingLayout')
);
const Login = lazy(() => import('./components/Login/Login'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Error = lazy(() => import('./components/Common/Error'));
const Welcome = lazy(() => import('./components/Welcome/Welcome'));
const ForgotPassword = lazy(() =>
  import('./components/ForgotPassword/ForgotPassword')
);

import { action as registerAction } from './components/Register/Register';
import { action as loginAction } from './components/Login/Login';
import { loader as landingLoader } from './components/Layout/LandingLayout/LandingLayout';
import UserContextProvider from './context/userContext';
import SuspenseFallback from './components/common/SuspenseFallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dailyintake',
        element: <LandingLayout />,
        loader: landingLoader,
        children: [
          ,
          {
            element: <DailyIntake />,
            index: true,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </Suspense>
  );
}

export default App;
