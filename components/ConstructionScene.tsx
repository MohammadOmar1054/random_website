"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { MotionValue, useTransform } from "framer-motion";

function Site({ progress, pointerX, pointerY }: { progress: MotionValue<number>; pointerX: MotionValue<number>; pointerY: MotionValue<number> }) {
  const craneRef = useRef<THREE.Group>(null);
  const boomRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const p = useTransform(progress, [0, 0.3, 0.7, 1], [0, 0.35, 0.75, 1]);
  const x = useTransform(pointerX, [-1, 1], [-0.28, 0.28]);
  const y = useTransform(pointerY, [-1, 1], [0.18, -0.18]);
  useFrame((state) => {
    const value = p.get();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.08 + value * 0.34 + x.get();
      groupRef.current.rotation.x = y.get() * 0.24;
      groupRef.current.position.x = x.get() * 0.75;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.04 - value * 0.25 + y.get();
    }
    if (craneRef.current) craneRef.current.rotation.y = -0.16 + value * 0.78;
    if (boomRef.current) boomRef.current.rotation.z = -0.08 - value * 0.3;
  });
  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[9, 6]} /><meshStandardMaterial color="#b76d42" roughness={0.9} /></mesh>
      <mesh position={[0, 0.06, 0]} receiveShadow><boxGeometry args={[8.4, 0.12, 5.4]} /><meshStandardMaterial color="#263842" roughness={0.76} /></mesh>
      <mesh position={[-1.45, 0.42, 0.38]} castShadow><boxGeometry args={[2.1, 0.75, 1.35]} /><meshStandardMaterial color="#d9b37a" roughness={0.5} /></mesh>
      <mesh position={[-1.45, 0.82, 0.38]} castShadow><boxGeometry args={[1.72, 0.05, 1.03]} /><meshStandardMaterial color="#e8ce9e" roughness={0.55} /></mesh>
      {[[-2.08, 0.81, -0.25], [-0.82, 0.81, -0.25], [-2.08, 0.81, 1.0], [-0.82, 0.81, 1.0]].map((position, index) => <mesh key={index} position={position as [number, number, number]} castShadow><boxGeometry args={[0.06, 0.48, 0.06]} /><meshStandardMaterial color="#6e3428" /></mesh>)}
      <group ref={craneRef} position={[2.1, 0.1, 0]}>
        <mesh position={[0, 1.4, 0]} castShadow><boxGeometry args={[0.22, 2.7, 0.22]} /><meshStandardMaterial color="#d5954c" metalness={0.45} roughness={0.4} /></mesh>
        {[0.3, 0.78, 1.26, 1.74, 2.22].map((y) => <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.025, 0.025, 0.52, 8]} /><meshStandardMaterial color="#eba956" /></mesh>)}
        <group ref={boomRef} position={[0, 2.74, 0]}>
          <mesh position={[1.15, 0, 0]} castShadow><boxGeometry args={[2.5, 0.12, 0.12]} /><meshStandardMaterial color="#e4a654" metalness={0.4} roughness={0.35} /></mesh>
          <mesh position={[-0.8, 0.03, 0]} castShadow><boxGeometry args={[1.1, 0.16, 0.18]} /><meshStandardMaterial color="#c87c35" /></mesh>
          <mesh position={[2.1, -0.65, 0]}><cylinderGeometry args={[0.012, 0.012, 1.3, 8]} /><meshStandardMaterial color="#e4d4b8" /></mesh>
          <mesh position={[2.1, -1.32, 0]} castShadow><boxGeometry args={[0.4, 0.26, 0.35]} /><meshStandardMaterial color="#bd7140" /></mesh>
        </group>
        <mesh position={[0, 2.72, 0]} castShadow><boxGeometry args={[0.45, 0.3, 0.38]} /><meshStandardMaterial color="#f0b968" /></mesh>
      </group>
      <Sparkles count={70} scale={[8, 3.5, 5]} size={1.2} speed={0.18} color="#f2bc71" />
    </group>
  );
}

export default function ConstructionScene({ progress, pointerX, pointerY }: { progress: MotionValue<number>; pointerX: MotionValue<number>; pointerY: MotionValue<number> }) {
  return <Canvas shadows dpr={[1, 1.5]} camera={{ position: [6.8, 4.3, 7.8], fov: 34 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={0.55} />
    <directionalLight castShadow position={[4, 8, 3]} intensity={3.5} color="#ffe7bd" shadow-mapSize={[1024, 1024]} />
    <pointLight position={[-4, 2, 3]} intensity={8} distance={10} color="#427cac" />
    <Site progress={progress} pointerX={pointerX} pointerY={pointerY} />
    <Environment preset="city" />
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
  </Canvas>;
}
