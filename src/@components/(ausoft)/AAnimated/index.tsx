"use client"

import { ReactNode, useEffect, useRef, useState } from "react";

export default function AAnimated({
  children,
  animate,
}: {
  children: ReactNode;
  animate: string;
}) {
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade
  const elementRef = useRef<HTMLImageElement | null>(null); // Referência para a imagem

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Ativa a animação quando a imagem está visível
        } else {
          setIsVisible(false); // Desativa a animação quando a imagem não está visível
        }
      },
      { threshold: 0.001 } // Ajuste o threshold conforme necessário
    );

    if (elementRef.current) {
      observer.observe(elementRef.current); // Observa a imagem
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current); // Limpa o observador
      }
    };
  }, []);
  return (
    <div ref={elementRef} className={`${isVisible ? animate : ""}`}>
      {children}
    </div>
  );
}
