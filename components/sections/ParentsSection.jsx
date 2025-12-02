// 👨‍👩‍👧‍👦 ParentsSection - Sección de información de padres

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { quinceMainData } from "@/components/sections/data/main-data";

export default function ParentsSection() {
  //const { parents } = weddingData;
  const { parents, godparents } = quinceMainData.event;
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const retryCountRef = useRef(0);

  // Estados para animaciones escalonadas
  const [isInView, setIsInView] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [parentsVisible, setParentsVisible] = useState(false);
  const [godparentsVisible, setGodparentsVisible] = useState(false);

  // Hook personalizado para IntersectionObserver
  const useIntersectionObserver = useCallback(() => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Secuencia de animaciones escalonadas
            setTimeout(() => setMessageVisible(true), 300);
            setTimeout(() => setParentsVisible(true), 700);
            setTimeout(() => setGodparentsVisible(true), 1100);
          } else {
            // Reset cuando sale de vista
            setIsInView(false);
            setMessageVisible(false);
            setParentsVisible(false);
            setGodparentsVisible(false);
          }
        },
        {
          threshold: 0.3,
          rootMargin: "-50px 0px",
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);
  }, []);

  useIntersectionObserver();

  // Manejador de error de video con reintentos
  const handleVideoError = useCallback(() => {
    if (retryCountRef.current < 3 && videoRef.current) {
      retryCountRef.current += 1;
      setTimeout(() => {
        videoRef.current?.load();
      }, 1000);
    }
  }, []);

  // Función helper para clases de animación
  const getAnimationClass = (isVisible, animationType, delay = "") => {
    const baseClass = "";
    const animClass = isVisible ? `animate-${animationType} ${delay}` : "";
    return `${baseClass} ${animClass}`.trim();
  };

  const basicClass = "font-main-text text-5xl text-sky-800 mb-4";
  const completeClass =
    "font-main-text text-5xl text-sky-800 mb-4 scale-up-center";

  return (
    <section
      ref={sectionRef}
      
      style={{
        /* backgroundImage: `url('/images/marcoFlores2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", */
        //backgroundColor: "#89ac76",
        position: "relative",
      }}
      id="parents"
      className={`pb-0 relative overflow-hidden`}
    >

      {/* Video de fondo */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          className="w-full h-full object-cover"
        >
          <source src="/video/m5.mp4" type="video/mp4" />
        </video>
        {/* Overlay azul pastel más sutil */}
        
      </div>

      

      <div className=" mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative p-6 z-10 text-center space-y-2">
              

              <div className="space-y-2">
                {/* Mensaje principal con animación */}
                <div
                style={{display:'none'}}
                  className={getAnimationClass(
                    messageVisible,
                    "fade-in-up",
                    "delay-200"
                  )}
                >
                  <p className="text-lg font-semibold italic max-w-2xl mx-auto text-sky-900 flex flex-col px-10">
                    <span>
                      Agradezco a Dios por la vida, su amor y
                      permitirme llegar a este día tan especial.
                    </span>
                  </p>
                </div>
                {/* Card de Padres */}
                <div
                  className={`${getAnimationClass(
                    parentsVisible,
                    "slide-in-left",
                    "delay-400"
                  )}`}
                >
                  <div className="rounded-xl ">
                    <div className="flex items-center justify-center">
                      <h3
                        className={parentsVisible ? completeClass : basicClass}
                      >
                        Mis papás
                      </h3>
                    </div>
                    <div className="space-y-3  text-sky-800 font-bold">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-2xl font-medium">{parents.father}</p>
                      </div>
                      <p>&</p>
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-2xl font-medium text-glow">
                          {parents.mother}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mensaje principal con animación */}
                <div
                  className={getAnimationClass(
                    messageVisible,
                    "fade-in-up",
                    "delay-200"
                  )}
                >
                  <p className="text-lg font-semibold italic max-w-2xl mx-auto text-sky-900 flex flex-col space-y-4 mt-8">
                    <span>
                      Gracias por su guía, sacrificios y amor incondicional. Hoy
                      celebro mis quince años con alegría, porque Dios y
                      ustedes me enseñaron a soñar. Los amo con todo mi corazón.
                    </span>
                  </p>
                </div>

                <div
                  style={{ display: "none" }}
                  className={getAnimationClass(
                    messageVisible,
                    "fade-in-up",
                    "delay-200"
                  )}
                >
                  <p className="text-lg italic max-w-2xl mx-auto text-blue-900 font-bold">
                    Y la Compañia de
                  </p>
                </div>
                {/* Card de Padrinos */}
                <div
                  //style={{ display: "none" }}
                  className={`${getAnimationClass(
                    godparentsVisible,
                    "slide-in-right",
                    "delay-600"
                  )}`}
                >
                  <div className="rounded-xl p-6 ">
                    <div className="flex items-center justify-center mb-4">
                      <h3
                        className={
                          godparentsVisible ? completeClass : basicClass
                        }
                      >
                        Mis Padrinos
                      </h3>
                    </div>
                    <div className="space-y-3 text-sky-800">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-2xl font-medium text-glow">
                          {godparents.godfather}
                        </p>
                      </div>
                      <p>&</p>
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-2xl font-medium text-glow">
                          {godparents.godmother}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
