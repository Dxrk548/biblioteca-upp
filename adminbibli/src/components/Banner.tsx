import React, { useState, useEffect } from 'react';
import './Banner.css'

import banner1 from '../assets/images/bann.webp'
import banner2 from '../assets/images/bann2.webp'
import banner3 from '../assets/images/bann3.webp'

const images = [
    banner1,
    banner2,
    banner3
];

const BannerRotativo: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 100 s segundos

    return () => clearInterval(intervalo); // limpieza
  }, []);

  return (
    <div className="banner-container">
      <img src={images[index]} alt={`Banner ${index + 1}`} className="banner-img" />
    </div>
  );
};

export default BannerRotativo;
