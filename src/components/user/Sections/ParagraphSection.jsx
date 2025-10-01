import React, { useEffect, useState, useRef } from "react";
import "./ParagraphSection.css";

const ParagraphSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shortened paragraph
  const paragraphText =
    "Travel is not just about reaching places, it’s about living stories. At GoParyatak, we make every journey effortless and memorable — so you can focus on exploring and discovering the world.";

  // Words to highlight
  const highlightWords = ["Travel", "stories", "effortless", "memorable", "exploring", "discovering"];

  const words = paragraphText.split(" ");

  // Section position
  const sectionTop = sectionRef.current?.offsetTop || 0;
  const sectionHeight = sectionRef.current?.offsetHeight || 1;
  const windowHeight = window.innerHeight;

  // Section scroll progress (0-1)
  const sectionProgress = Math.min(Math.max((scrollY + windowHeight / 2 - sectionTop) / sectionHeight, 0), 1);

  const getWordStyle = (index) => {
    const wordProgress = Math.min(Math.max(sectionProgress * words.length - index, 0), 1);
    const color = highlightWords.includes(words[index].replace(/[.,—]/g, ""))
      ? `rgba(108, 203, 119, ${wordProgress})` // green highlight
      : `rgba(0,0,0,${wordProgress})`; // normal black
    return {
      color: wordProgress > 0 ? color : "#999", // default grey
      transition: "color 0.3s linear",
    };
  };

  return (
    <section className="paragraph-section" ref={sectionRef}>
      <p>
        {words.map((word, index) => (
          <span key={index} style={getWordStyle(index)}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
};

export default ParagraphSection;
