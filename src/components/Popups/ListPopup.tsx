import React, { useState } from 'react';
import { FormPopupProps } from '../../types/CouponTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ListPopup: React.FC<FormPopupProps> = ({ trigger, title, body }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openFormPopup = () => {
    setIsVisible(true);
  };

  const closeFormPopup = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Match the duration of the transition
  };

  return (
    <div className="relative text-black ">
      <span onClick={openFormPopup}>{trigger}</span>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeFormPopup}
      >
        <div
          className={`bg-white px-6 pt-4 min-w-[40%] rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the ListPopup
          onTransitionEnd={() => !isVisible} // Ensure proper state after animation
        >
          <div className="flex justify-between items-center border-b border-primary">
            <h2 className="text-2xl text-start">{title}</h2>
            <button
              onClick={closeFormPopup}
              className=" rounded-full px-4 py-2   text-red-300 rounded hover:bg-opacity-40 transition duration-300"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl font-bold" />
            </button>
          </div>
          <div className="mb-4">{body}</div>
        </div>
      </div>
    </div>
  );
};

export default ListPopup;
