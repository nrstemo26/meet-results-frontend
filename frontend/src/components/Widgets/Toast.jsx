import React from 'react';

const Toast = ({ message, onClose, type }) => {
  let toastClass = 'bg-gray-400';
  if (type === 'success') {
    toastClass = 'bg-green-800';
  } else if (type === 'warning') {
    toastClass = 'bg-yellow-800';
  } else if (type === 'error') {
    toastClass = 'bg-red-800';
  } else if (type === 'brand') {
    toastClass = 'bg-primary-500';
  }

  return (
    <div className="fixed bottom-0 left-0 mb-8 ml-8">
      <div className={`text-white py-2 px-4 rounded ${toastClass}`}>
        <span className="mr-2">{message}</span>
        <button className="text-white font-bold" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
