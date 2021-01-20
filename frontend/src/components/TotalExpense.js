import React from 'react';

const TotalExpense = ({ expense }) => {
  return (
    <div className='total-div'>
      <h5 className='total'>
        Total :{' '}
        {expense
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next, 0)}
      </h5>
    </div>
  );
};

export default TotalExpense;
