// 🏠 HeroSection - Sección principal/portada

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { quinceMainData } from "@/components/sections/data/main-data";
import BackgroundCarrousel from "../../components/sections/BackgroundCarrousel";
//import { getOverlayStyle } from '@/utils/overlay'
//import { useScrollAnimation } from '@/hooks/useScrollAnimation'
//import { getAnimationConfig } from '@/data/animationConfig'

export default function HeroSection() {
  //const { couple, wedding } = weddingData;
  //const { heroSection } = styling
  const { hero } = quinceMainData;
  const { backgroundCarrouselImages } = hero;
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const [isVisible, setIsVisible] = useState(false);
  const [sparklePositions, setSparklePositions] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hasFadedOut, setHasFadedOut] = useState(false);

  const basicClass = "font-script text-4xl text-white mb-4 italic";
  const completeClass =
    "font-script text-4xl text-white mb-4 scale-up-center italic";

  useEffect(() => {
    const handleScroll = () => {
      //console.log('Scroll position:', window.scrollY);
      setScrollPosition(window.scrollY);
    };
    setSparklePositions(generateSparkles());

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition >= 0 && scrollPosition < 300) {
      setIsVisible(true);
    }
  }, [scrollPosition]);

  // Timer para activar animación después de 6 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Timer para activar fade out después de 12 segundos (6s inicial + 6s de espera)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasFadedOut(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Generar partículas sparkle
  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 40; i++) {
      sparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: Math.random() * 6 + 4,
      });
    }
    return sparkles;
  };

  return (
    <section
      //ref={sectionRef}
      style={{
        /* backgroundImage: `url('/images/marcoFlores2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", */
        //backgroundColor: "#89ac76",
        position: "relative",
      }}
      //id="home"
      className="min-h-screen flex flex-col justify-center items-center relative"
    >
      <BackgroundCarrousel images={backgroundCarrouselImages}/> 

      

      {/* Contenido principal - Usar solo animación CSS, no scroll-based */}
      <div
        style={
          {
            //backgroundColor:'#C8BFE780'
          }
        }
        className="absolute inset-0 flex flex-col justify-center items-center text-center"
      >
        <h1
          style={{
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
            transition: "transform 2s ease-in-out, opacity 2s ease-in-out",
            transform: hasAnimated 
              ? `translateY(-40vh) ${hasFadedOut ? 'translateX(-100vw)' : ''}` 
              : 'translateY(0)',
            opacity: hasFadedOut ? 0 : 1,
            //display: "none",
          }}
          className={`${isVisible ? completeClass : basicClass}`}
        >
          {hero.subtitle.split(" ").map((word, index) => (
            <span key={index}>
              {index === 1 ? <span className="italic">{word}</span> : word}
              {index < hero.subtitle.split(" ").length - 1 && " "}
            </span>
          ))}
        </h1>

        
        <div
          style={{
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
            transition: "transform 2s ease-in-out, opacity 2s ease-in-out",
            transform: hasAnimated 
              ? `translateY(30vh) ${hasFadedOut ? 'translateX(100vw)' : ''}` 
              : 'translateY(0)',
            opacity: hasFadedOut ? 0 : 1,
          }}
          className={`text-6xl text-white font-main-text`}
        >
          {hero.name}
        </div>
      </div>
    </section>
  );
}
