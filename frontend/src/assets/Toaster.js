import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const submitNotify = () => toast.success('Added Successfully!');
export const updateNotify = () => toast.info('Updated Successfully!');
export const deleteNotify = () => toast.error('Deleted Successfully!');
// 🦄
const toaster = () => {
  return (
    <div>
      <ToastContainer
        position='bottom-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default toaster;
