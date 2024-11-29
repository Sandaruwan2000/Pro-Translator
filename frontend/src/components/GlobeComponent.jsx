import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Globe from 'three-globe';
import globeImage from '../Image/earth-topology.png';
// import blueImage from '../Image/earth-night.jpg';
import blueImage from '../Image/er2.jpg';

const GlobeComponent = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 350;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeRef.current.appendChild(renderer.domElement);

    // Globe setup
    const globe = new Globe()
      .globeImageUrl(blueImage) // Dark globe image
      .bumpImageUrl(globeImage) // Bump map for globe
      .showAtmosphere(true)
      .atmosphereColor('#FFFFFF') // Glow color
      .atmosphereAltitude(0.25)
      .hexPolygonsData([]) // Assuming you want no hex polygons for now
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonColor(() => 'rgba(255, 255, 255, 0.1)')
      .polygonCapColor(() => '#1F2937')
      .polygonSideColor(() => 'rgba(255, 255, 255, 0.15)')
      .polygonStrokeColor(() => '#111827');

    scene.add(globe);

    // Set background color directly on the renderer
    renderer.setClearColor('#ffffffff'); // Background color (dark mode)

    // Light setup
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    // Rotation and animation
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0025; // Rotation speed
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Clean up resources on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      globeRef.current.removeChild(renderer.domElement); // Remove the renderer's DOM element
    };
  }, []);

  return <div ref={globeRef} style={{ width: '70vw', height: '70vh' }} />;
};

export default GlobeComponent;
