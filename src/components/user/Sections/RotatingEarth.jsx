import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const RotatingEarth = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 🌍 Geometry + texture
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(
      "https://static.vecteezy.com/system/resources/previews/000/182/764/large_2x/green-global-maps-vector.jpg",
      (tex) => (tex.colorSpace = THREE.SRGBColorSpace)
    );

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1.0,
      metalness: 0.0,
      emissive: new THREE.Color(0x222222),
      emissiveIntensity: 0.5,
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // 💡 Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(ambientLight, directionalLight);

    camera.position.z = 5;

    // 🎯 Rotation control
    let targetRotationX = 0;
    let targetRotationY = 0;

    // 🖱️ Desktop mouse move
    const onMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      targetRotationY = (x - midX) / midX / 4;
      targetRotationX = (y - midY) / midY / 4;
    };

    // 📱 Touch control
    let lastTouchX = 0;
    let lastTouchY = 0;

    const onTouchMove = (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - lastTouchX;
        const deltaY = touch.clientY - lastTouchY;
        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;

        targetRotationY += deltaX * 0.001;
        targetRotationX += deltaY * 0.001;
      }
    };

    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        lastTouchX = event.touches[0].clientX;
        lastTouchY = event.touches[0].clientY;
      }
    };

    // 🌀 Device tilt (gyroscope)
    const onDeviceOrientation = (event) => {
      if (event.beta && event.gamma) {
        const maxTilt = 30; // limit rotation
        targetRotationX = THREE.MathUtils.clamp(event.beta / 90, -0.3, 0.3);
        targetRotationY = THREE.MathUtils.clamp(event.gamma / 90, -0.3, 0.3);
      }
    };

    // 🎞 Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.002; // base rotation
      earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.05;
      earth.rotation.y += (targetRotationY - earth.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // 📏 Handle resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    // 🧹 Cleanup
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("deviceorientation", onDeviceOrientation, true);
    mountRef.current.addEventListener("touchstart", onTouchStart);
    mountRef.current.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      mountRef.current.removeEventListener("touchstart", onTouchStart);
      mountRef.current.removeEventListener("touchmove", onTouchMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "500px",
        background: "transparent",
        touchAction: "none",
      }}
    />
  );
};

export default RotatingEarth;
