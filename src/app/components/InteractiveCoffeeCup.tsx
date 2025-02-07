"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CoffeeCup from './CoffeeCup'; 

gsap.registerPlugin(useGSAP);

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const;

type Props = {
  textureURL: string;
};

export function InteractiveCoffeeCup({ textureURL }: Props) {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center mt-80 ml-8 md:ml-96 md:mb-20'>
      <Canvas className='min-h-[60rem] w-full' 
        camera={{ position: INITIAL_CAMERA_POSITION, fov: 55 }}>
        <Suspense fallback={null}>
          <Scene textureURL={textureURL} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({ textureURL }: Props) {
  const containerRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current.rotation, {
      y: `+=${2 * Math.PI}`, // 360 degrees
      duration: 2,
      repeat: 0, // Continue rotating until scrolling starts
      ease: 'linear',
    });
  }, { scope: containerRef });

  useGSAP(() => {
    camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0));
    setZoom();
    window.addEventListener('resize', setZoom);

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);
      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale;
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale;
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale;
    }

    return () => window.removeEventListener('resize', setZoom);
  }, [camera]);

  useGSAP(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rotationAngle = Math.min(window.scrollY * 0.01, Math.PI / 2); // Limit the rotation to 90 degrees

      gsap.to(containerRef.current.rotation, {
        x: rotationAngle, // Rotate on the x-axis
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          if (rotationAngle >= Math.PI / 2) {
            gsap.killTweensOf(containerRef.current.rotation); // Stop the rotation animation
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return (
    <group>
      <Environment files='/hdr/warehouse-256.hdr' environmentIntensity={.6} />
      <group ref={containerRef}>
        <CoffeeCup textureURL={textureURL} />
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
      </group>
    </group>
  );
}
