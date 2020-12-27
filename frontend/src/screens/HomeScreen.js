import React from 'react';
import Expense from '../components/Expense';

const HomeScreen = ({ history, match }) => {
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;
  return (
    <>
      {userInfoFromStorage ? <Expense match={match} /> : history.push('/login')}
    </>
  );
};

export default HomeScreen;
