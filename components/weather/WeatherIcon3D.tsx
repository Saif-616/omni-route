"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export const WeatherIcon3D = ({ type = "sun" }: { type?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Fit renderer to container
    renderer.setSize(120, 120);
    mountRef.current.appendChild(renderer.domElement);

    // Create Octahedron for "Ben 10" aesthetic
    const geometry = new THREE.OctahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x32B531, 
      emissive: 0x16AE58,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    
    const octahedron = new THREE.Mesh(geometry, material);
    scene.add(octahedron);

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x32B531, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 4;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Spin
      octahedron.rotation.x += delta * 0.5;
      octahedron.rotation.y += delta * 0.8;
      
      // Floating effect
      octahedron.position.y = Math.sin(elapsedTime) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[120px] flex items-center justify-center"
    />
  );
};
