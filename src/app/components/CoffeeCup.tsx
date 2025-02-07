import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    CupCoffee_CupCoffee1_0: THREE.Mesh;
    CupCoffee_CupCoffee2_0: THREE.Mesh;
  };
  materials: {};
};

interface CoffeeCupProps {
  textureURL: string;
  onClick?: (event: React.MouseEvent<THREE.Group>) => void;
}

export default function CoffeeCup({
  textureURL, 
  onClick
}: CoffeeCupProps) {
  const cupRef = useRef<THREE.Object3D>(null);
  const { nodes } = useGLTF('/coffeeCup.gltf') as GLTFResult;

  const coffeeCupTexture = useTexture(textureURL) as THREE.Texture;

  const coffeeCupMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: coffeeCupTexture, roughness: 0.5 }),
    [coffeeCupTexture]
  );
  

  const whiteMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.5 }),
    []
  );

  useEffect(() => {
    console.log('Loaded GLTF:', nodes);
  }, [nodes]);

  if (!nodes?.CupCoffee_CupCoffee1_0?.geometry || !nodes?.CupCoffee_CupCoffee2_0?.geometry) {
    console.error('Error: Coffee cup geometry is undefined.');
    return null;
  }

  const scale = new THREE.Vector3(
    window.innerWidth < 768 ? 0.5 : 0.3, 
    window.innerWidth < 768 ? 0.5 : 0.3, 
    window.innerWidth < 768 ? 0.5 : 0.3 
  );

  return (
    <group onClick={onClick} ref={cupRef} scale={scale} rotation={[-Math.PI/2, 0, 2]}>
      <mesh
        name='CupCoffee_CupCoffee1_0'
        geometry={nodes.CupCoffee_CupCoffee1_0.geometry}
        material={whiteMaterial}
      />
      <mesh
        name='CupCoffee_CupCoffee2_0'
        geometry={nodes.CupCoffee_CupCoffee2_0.geometry}
        material={coffeeCupMaterial}
      />
    </group>
  );
}

useGLTF.preload('/coffeeCup.gltf');
