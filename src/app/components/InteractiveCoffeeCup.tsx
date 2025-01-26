"use client";
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import CoffeeCup from './CoffeeCup'; 

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

  useEffect(() => {
    if (!containerRef.current) return;
    

    gsap.to(containerRef.current.rotation, {
      y: `+=${2 * Math.PI}`, // 360 degrees
      duration: 5,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  useEffect(() => {
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

  return (
    <group>
      <Environment files='/hdr/warehouse-256.hdr' />
      <group ref={containerRef}>
        <CoffeeCup onClick={""} textureURL={textureURL} />
      </group>
        <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
        <Html wrapperClass='pointer-events-none' transform zIndexRange={[1, 0]} occlude='blending'>
          {/* Add any additional UI elements or components */}
        </Html>
      </group>
    </group>
  );
}
