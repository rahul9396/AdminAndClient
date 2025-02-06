import { useState, useEffect } from 'react';
const items = [
  {
    src: 'https://wallpapers.com/images/featured/laptop-murjp1nk4lp1idlt.jpg',
    altText: 'Laptop',
    caption: 'High-Performance Laptops',
    description: 'Experience top-notch performance with our latest laptops.',
  },
  {
    src: 'https://assets.adidas.com/videos/67fcbae02c2e4ef2b45efa3435917684_d98c/ID9850_HM2.jpg',
    altText: 'Shoes',
    caption: 'Stylish Footwear',
    description: 'Step into comfort and style with our trendy shoes.',
  },
  {
    src: 'https://wallpapercat.com/w/full/b/c/3/2332802-3840x2160-desktop-4k-watches-background.jpg',
    altText: 'Watches',
    caption: 'Elegant Watches',
    description: 'Discover our collection of elegant timepieces.',
  },
];

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  const previous = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative h-56 sm:h-64 md:h-80 lg:h-96">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.src}
              alt={item.altText}
              className="block w-full h-full object-cover"

            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {item.caption}
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-md">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-3 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white transform -translate-y-1/2"
        onClick={previous}
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-3 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white transform -translate-y-1/2"
        onClick={next}
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === activeIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
