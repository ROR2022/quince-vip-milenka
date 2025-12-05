// 👗 DressCodeSection - Sección de código de vestimenta y confirmación

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAnimationConfig } from "@/data/animationConfig";
import { GiLargeDress } from "react-icons/gi";
import Image from "next/image";
import { quinceMainData } from "@/components/sections/data/main-data";

export default function DressCodeSection() {
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { event, dressCode } = quinceMainData;
  const { parents } = event;
  const videoRef = useRef(null);
          const retryCountRef = useRef(0);

          // Manejador de error de video con reintentos
                  const handleVideoError = useCallback(() => {
                    if (retryCountRef.current < 3 && videoRef.current) {
                      retryCountRef.current += 1;
                      setTimeout(() => {
                        videoRef.current?.load();
                      }, 1000);
                    }
                  }, []);
            

  // IntersectionObserver para animaciones escalonadas que se reactivan
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
   
  return (
    <section
      ref={sectionRef}
      id="dresscode"
      className="py-20"
      style={{
        backgroundImage: `url('/images/marcoFlores2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >

{/* Video de fondo */}
      <div 
      style={{
        display:'none'
      }}
      className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          className="w-full h-full object-cover"
        >
          <source src="/video/m3.mp4" type="video/mp4" />
        </video>
        {/* Overlay azul pastel más sutil */}
        
      </div>

      
      <div
        style={{
          animation: "bounce1 2s ease 0s 1 infinite",
          //backgroundColor: "#C8BFE795",
        }}
        className="container mx-auto px-4  p-6 rounded-2xl"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Título - Animación desde arriba */}
          <h2 className={`font-main-text text-5xl text-sky-700 transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}>
            Código de Vestimenta
          </h2>
          
          {/* Imagen - Animación con escala */}
          <div className={`flex gap-4 justify-center items-center transition-all duration-700 delay-300 ${
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-75'
          }`}>
            <div className="flex gap-2">
              <Image
                src="/images/codigo1Paola.png"
                alt="Código de Vestimenta"
                width={100}
                height={200}
                className="mx-auto rounded-lg"
              />
              <Image
                src="/images/codigo2Paola.png"
                alt="Código de Vestimenta"
                width={100}
                height={200}
                className="mx-auto rounded-lg"
              />
            </div>
          </div>
          
          {/* Mensaje principal - Animación desde la izquierda */}
          <h3 className={`text-3xl font-bold text-sky-600 transition-all duration-700 delay-600 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-8'
          }`}>
            Semi-Formal
          </h3>
          
        

          <div className="relative flex flex-col gap-3">
            <p className="text-2xl text-sky-900 font-semibold">Colores Reservados para la Festejada</p>
            <Image
              src="/images/colores1Paola.jpg"
              alt="Código de Vestimenta Detalle"
              width={200}
              height={300}
              className={`mx-auto rounded-lg transition-all duration-700 delay-800 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-75'
              }`}
            />
          </div>

          {/* Restricción - Animación desde abajo */}
          <p 
          style={{display:'none'}}
          className={`text-xl text-indigo-500 my-4 font-bold transition-all duration-700 delay-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {dressCode.restriction}
          </p>

          
        </div>
      </div>
    </section>
  );
}
