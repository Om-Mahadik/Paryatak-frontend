import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./FloatingBalloon.css";
import balloon from "../../../imgs/hotair-balloon.png";

const FloatingBalloon = () => {
  const balloonRef = useRef(null);

  // 🪶 Idle gentle sway (in place)
  const idleFloat = () => {
    gsap.to(balloonRef.current, {
      y: "+=10",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  };

  const flyBalloon = () => {
    const el = balloonRef.current;
    gsap.killTweensOf(el); // stop idle float
    el.style.pointerEvents = "none"; // disable clicks during flight

    const randomX = gsap.utils.random(150, 350); // diagonal drift
    const randomRotation = gsap.utils.random(-15, 15);
    const duration = gsap.utils.random(5, 7);

    // 🚀 flight animation (fly out)
    gsap.to(el, {
      y: -window.innerHeight - 200,
      x: `+=${randomX}`,
      rotation: randomRotation,
      duration,
      ease: "power1.inOut",
      opacity: 0.8,
      onComplete: () => {
        // 🎯 Reset balloon below screen, invisible
        gsap.set(el, {
          y: window.innerHeight + 150,
          x: 0,
          rotation: 0,
          opacity: 0,
        });

        // 🩵 Bring new balloon up smoothly with fade-in
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 3,
          ease: "power2.out",
          onComplete: () => {
            el.style.pointerEvents = "auto";
            idleFloat(); // resume idle animation
          },
        });
      },
    });
  };

  useEffect(() => {
    idleFloat(); // initial idle motion
  }, []);

  return (
    <img
      ref={balloonRef}
      src={balloon}
      alt="Hot Air Balloon"
      className="floating-balloon"
      onClick={flyBalloon}
    />
  );
};

export default FloatingBalloon;
