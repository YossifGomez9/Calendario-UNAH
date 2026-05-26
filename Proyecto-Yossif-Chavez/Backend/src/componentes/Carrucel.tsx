"use client";

import { useCallback, useEffect, useRef, useState } from "react";


const slides = [
  {
    title: "Admisiones",
    description: "Información sobre el proceso de matrícula académica para el próximo período.",
    
    
    image:
      
    
    "https://blogs.unah.edu.hn/assets/sistema-de-admision/blog/11244/thumbnail-IMG-1115.jpg"
 },
  {
    title: "Examenes",
    description: "Información sobre el proceso de exámenes para el próximo período.",
    
    
    image:
       "https://latitudhn.com/wp-content/uploads/2024/12/DSC_0394-scaled-1.jpg",
  },
  {
    title: "Feriados",
    description: "Información sobre los feriados del próximo período.",

    
    image:
     "https://upload.wikimedia.org/wikipedia/commons/c/c6/Palacio_Universitario_de_la_UNAH.jpg",
  },
];

export default function CarrucelComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const replaceBrokenImage = useCallback((image: HTMLImageElement) => {
    const fallbacks = [
      "https://picsum.photos/id/1018/1920/1080",
      "https://picsum.photos/id/1015/1920/1080",
      "https://picsum.photos/id/1019/1920/1080",
    ];
    image.src = fallbacks[currentSlide % fallbacks.length];
  }, [currentSlide]);

  useEffect(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (autoplay) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [autoplay]);

  return (
    <div className="relative w-full">
      
        <style>{`
          .slide-content {
            transition: all 0.6s ease 0.3s;
          }

          .fade-in {
            animation: fadeIn 1s ease-in;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="relative h-[80vh] min-h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-800 ${
                  currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="absolute inset-0 bg-gray-800">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-80"
                    onError={(event) => replaceBrokenImage(event.currentTarget)}
                    loading="lazy"
                  />
                </div>

                <div className="container mx-auto px-6 h-full flex items-center">
                  <div
                    className={`max-w-2xl text-white slide-content transform transition-all duration-600 ${
                      currentSlide === index ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                    }`}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                  
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10 transition-all"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10 transition-all"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                    currentSlide === index ? "bg-white w-4 md:w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      
    </div>
  );
}

