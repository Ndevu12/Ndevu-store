import React from 'react';
import heroImage from '../../images/hero_image 1.png';
import handIcon from '../../images/hand_icon 1.png';

const HeroSection = () => {
  return (
    <div className="animate-fadeInAnimation flex items-center justify-center xmd:justify-between xmd:px-10 md:px-16 lg:px-36 py-5 xmd:h-[23rem] bg-gradient-to-r from-secondary200 from-5% via-secondary500 via-20% to-secondary600 to-55%">
      <div className="flex flex-col items-center justify-center xmd:items-start xmd:justify-start gap-y-4 xmd:gap-y-8 w-[90%]">
        <div className="text-3xl xmd:text-4xl lg:text-5xl font-medium tracking-wide leading-snug xmd:leading-tight">
          <div className="flex gap-x-4 items-center w-[100%] justify-center xmd:justify-start">
            <span className="text-center xmd:text-start">New</span>
            <img className="w-10 xmd:w-16 xmd:h-14" src={handIcon} alt="hand-icon" />
          </div>
          <p className="text-center xmd:text-start">collections</p>
          <p className="text-center xmd:text-start">for everyone</p>
        </div>
        <div className="hover:cursor-pointer flex items-center justify-center w-[90%] max-w-[250px] xmd:w-[230px] lg:w-[80%] gap-x-4 bg-primary text-baseWhite rounded-3xl py-[0.5rem] px">
          <span>Latest collections</span>
          <i className="fa-solid fa-arrow-right-long text-xl"></i>
        </div>
        <div>
          <p className="text-center xmd:text-start">Happy Shopping!</p>
        </div>
      </div>
      <div className="hidden xmd:flex ">
        <img className="xmd:w-[80%] md:w-[90%] lg:w-[100%]" src={heroImage} alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
