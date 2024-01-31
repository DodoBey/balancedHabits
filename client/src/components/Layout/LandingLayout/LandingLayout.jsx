import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useEffect } from 'react';
import fetchUtil from '../../../utils/request';
import { useUserContext } from '../../../context/UserContext';

export const loader = async () => {
  try {
    const { data } = await fetchUtil.get('/users/getCurrentUser');
    const intakeData = await fetchUtil.get('/intake');
    return { data, intakeData };
  } catch (error) {
    return console.log(error);
  }
};

const LandingLayout = () => {
  const navigate = useNavigate();
  const { data, intakeData } = useLoaderData();
  const { setCurrentUser, setUserIntakes } = useUserContext();
  useEffect(() => {
    setCurrentUser(data);
  }, [data]);

  useEffect(() => {
    setUserIntakes(intakeData.data.intakeData);
  }, [intakeData.data]);

  if (!data.user) {
    navigate('/');
  }

  return (
    <div className='min-h-screen'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
