import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import Register from './components/Register';
import DailyIntake from './components/DailyIntake';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Error from './components/Error';
import Welcome from './components/Welcome';
import ForgotPassword from './components/ForgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: 'dailyintake',
        element: <DailyIntake />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
