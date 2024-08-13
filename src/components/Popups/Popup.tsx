import React, { useEffect, useState, useRef } from 'react';
import successImg from '../../assets/done-svgrepo-com.svg';
import errorImg from '../../assets/status-failed-svgrepo-com.svg';
import { PopupProps } from '../../types/CouponTypes';

const Popup: React.FC<PopupProps> = ({ title, subtitle, responseType, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const successImage = new Image();
    const errorImage = new Image();

    successImage.src = successImg;
    errorImage.src = errorImg;

    const handleImageLoad = () => {
      setImagesLoaded(true);
    };

    successImage.onload = handleImageLoad;
    errorImage.onload = handleImageLoad;

    return () => {
      successImage.onload = null;
      errorImage.onload = null;
    };
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [imagesLoaded, duration, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        onClose();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        ref={popupRef}
        className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out w-[542px] h-[351px] flex items-center justify-center flex-col ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
      >
        <img
          src={responseType === 'success' ? successImg : errorImg}
          alt={responseType === 'success' ? 'Success' : 'Failure'}
          className="w-34 h-34 inline-block mr-2"
        />
        <h2 className="text-2xl font-bold mb-2 text-center text-primary">{title}</h2>
        <h3 className="text-lg mb-4 text-center text-secondary">{subtitle}</h3>
      </div>
    </div>
  );
};

export default Popup;
