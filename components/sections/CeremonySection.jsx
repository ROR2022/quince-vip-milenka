// ⛪ CeremonySection - Sección de información de la ceremonia

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { quinceMainData } from "./data/main-data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAnimationConfig } from "@/data/animationConfig";

export default function CeremonySection() {
  
  const { parents, ceremony, party } = quinceMainData.event;
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
      const retryCountRef = useRef(0);
  
  // Estados para animaciones teatrales escalonadas
  const [isInView, setIsInView] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [ceremonyCardVisible, setCeremonyCardVisible] = useState(false);
  const [partyCardVisible, setPartyCardVisible] = useState(false);

  // Manejador de error de video con reintentos
      const handleVideoError = useCallback(() => {
        if (retryCountRef.current < 3 && videoRef.current) {
          retryCountRef.current += 1;
          setTimeout(() => {
            videoRef.current?.load();
          }, 1000);
        }
      }, []);

  // Hook personalizado para IntersectionObserver
  const useIntersectionObserver = useCallback(() => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Secuencia teatral escalonada
            setTimeout(() => setCurtainVisible(true), 200);
            setTimeout(() => setImageVisible(true), 600);
            setTimeout(() => setCeremonyCardVisible(true), 1000);
            setTimeout(() => setPartyCardVisible(true), 1400);
          } else {
            // Reset cuando sale de vista
            setIsInView(false);
            setCurtainVisible(false);
            setImageVisible(false);
            setCeremonyCardVisible(false);
            setPartyCardVisible(false);
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-50px 0px'
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);
  }, []);

  useIntersectionObserver();

  // Función helper para clases de animación elegante
  const getElegantAnimationClass = (isVisible, animationType, delay = '') => {
    return isVisible ? `animate-${animationType} ${delay}` : '';
  };

  const basicClass = "text-2xl font-bold text-purple-800";
  const completeClass = "text-2xl font-bold text-purple-800 animate-elegant-float";

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig("ceremony");
  // Ya no necesitamos el hook useScrollAnimation, usamos nuestro IntersectionObserver

  return (
    <section
      ref={sectionRef}
       style={{
        backgroundImage: `url('/images/marcoFlores2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
     
      id="ceremony"
      className="py-20 relative overflow-hidden"
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
          <source src="/video/m7.mp4" type="video/mp4" />
        </video>
        {/* Overlay azul pastel más sutil */}
        
      </div>

      
      {/* Cortina teatral de entrada */}
      <div className={getElegantAnimationClass(curtainVisible, 'curtain-reveal', 'delay-200')}>
        
       

        

        <div className="container text-white mx-auto px-4 p-6 rounded-2xl relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Layout tipo escenario con imagen central */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              
              {/* Card de Ceremonia - Slide desde izquierda */}
              <div className={getElegantAnimationClass(ceremonyCardVisible, 'card-slide-left', 'delay-400')}>
                <div className="p-8 text-center space-y-6">
                  <div className="text-5xl text-cyan-700 font-main-text mb-4">
                    Ceremonia
                  </div>
                  <h4 className={ceremonyCardVisible ? completeClass : basicClass}>
                    {ceremony.venue}
                  </h4>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-6 h-6 text-cyan-800" />
                    <span className="text-2xl font-medium text-purple-700">
                      {ceremony.time}
                    </span>
                  </div>
                  <p className="text-sky-800">
                    {ceremony.address}
                  </p>
                  <Button
                    onClick={() => window.open(ceremony.ubiLink, "_blank")}
                    className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-8 py-3 transform hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ir al mapa
                  </Button>
                </div>
              </div>

              {/* Imagen central con efecto spotlight */}
              <div 
              style={{display:'none'}}
              className={getElegantAnimationClass(imageVisible, 'curtain-reveal', 'delay-600')}>
                <div className="spotlight-image relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden mx-auto">
                  <Image
                    src='/images/pao20.jpg'
                    alt="Ceremony Image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* El efecto spotlight se aplica via CSS */}
                </div>
              </div>

              {/* Card de Recepción - Slide desde derecha */}
              <div className={getElegantAnimationClass(partyCardVisible, 'card-slide-right', 'delay-800')}>
                <div className="rounded-2xl p-8 text-center space-y-6">
                  <div className="text-5xl text-cyan-700 font-main-text mb-4">
                    Recepción
                  </div>
                  <h4 className={partyCardVisible ? completeClass : basicClass}>
                    {party.venue}
                  </h4>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-6 h-6 text-cyan-800" />
                    <span className="text-2xl font-medium text-purple-700">
                      {party.time}
                    </span>
                  </div>
                  <p className="text-sky-800">
                    {party.address}
                  </p>
                  <Button
                    onClick={() => window.open(party.ubiLink, "_blank")}
                    className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-8 py-3 transform hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ir al mapa
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
