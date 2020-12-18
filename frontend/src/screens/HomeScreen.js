import React from 'react';
import Expense from '../components/Expense';

const HomeScreen = ({ history }) => {
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;
  return <>{userInfoFromStorage ? <Expense /> : history.push('/login')}</>;
};

export default HomeScreen;
