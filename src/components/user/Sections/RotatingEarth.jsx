import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./RotatingEarth.css";

const RotatingEarth = () => {
  const mountRef = useRef(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    const hintTimer = setTimeout(() => setShowHint(false), 5000);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    mountEl.appendChild(renderer.domElement);

    // 🌍 Earth setup
    const geometry = new THREE.SphereGeometry(2.5, 64, 64);
    const texture = new THREE.TextureLoader().load(
      "https://static.vecteezy.com/system/resources/previews/000/182/764/large_2x/green-global-maps-vector.jpg",
      (tex) => (tex.colorSpace = THREE.SRGBColorSpace)
    );

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1.0,
      metalness: 0.0,
      emissive: new THREE.Color(0x222222),
      emissiveIntensity: 0.9,
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // 💡 Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(ambientLight, directionalLight);

    camera.position.z = 5;

    // 🎯 Rotation control
    let targetRotationX = 0;
    let targetRotationY = 0;
    let idleRotationSpeed = 0.003;

    let userInteracting = false;
    let lastInteractionTime = Date.now();

    const onMouseMove = (event) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      targetRotationY = (x - midX) / midX / 4;
      targetRotationX = (y - midY) / midY / 4;
      userInteracting = true;
      lastInteractionTime = Date.now();
    };

    // 📱 Touch controls
    let lastTouchX = 0;
    let lastTouchY = 0;

    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        lastTouchX = event.touches[0].clientX;
        lastTouchY = event.touches[0].clientY;
      }
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - lastTouchX;
        const deltaY = touch.clientY - lastTouchY;
        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;

        targetRotationY += deltaX * 0.002;
        targetRotationX += deltaY * 0.002;
        userInteracting = true;
        lastInteractionTime = Date.now();
      }
    };

    // 🌀 Device tilt
    const onDeviceOrientation = (event) => {
      if (event.beta && event.gamma) {
        targetRotationX = THREE.MathUtils.clamp(event.beta / 90, -0.3, 0.3);
        targetRotationY = THREE.MathUtils.clamp(event.gamma / 90, -0.3, 0.3);
        userInteracting = true;
        lastInteractionTime = Date.now();
      }
    };

    // 🎞 Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = Date.now();
      if (now - lastInteractionTime > 2000) {
        earth.rotation.y += idleRotationSpeed;
      } else {
        earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.05;
        earth.rotation.y += (targetRotationY - earth.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 📏 Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("deviceorientation", onDeviceOrientation, true);
    mountEl.addEventListener("touchstart", onTouchStart);
    mountEl.addEventListener("touchmove", onTouchMove);

    // 🧹 Cleanup
    return () => {
      clearTimeout(hintTimer);
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation, true);

      if (mountRef.current) {
        mountRef.current.removeEventListener("touchstart", onTouchStart);
        mountRef.current.removeEventListener("touchmove", onTouchMove);

        if (renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div className="earth-container">
      <div ref={mountRef} className="earth-canvas" />
      {showHint && <div className="hint-text"></div>}
    </div>
  );
};

export default RotatingEarth;
