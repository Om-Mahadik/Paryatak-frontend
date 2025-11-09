import React from "react"
import m1 from "../../../imgs/marquee/1.jpg"
import m2 from "../../../imgs/marquee/2.jpg"
import m3 from "../../../imgs/marquee/3.jpg"
import m4 from "../../../imgs/marquee/4.jpg"
import m5 from "../../../imgs/marquee/5.jpg"
import m6 from "../../../imgs/marquee/6.jpg"
import m7 from "../../../imgs/marquee/7.jpg"
import m8 from "../../../imgs/marquee/8.jpg"
import m9 from "../../../imgs/marquee/9.jpg"
import m10 from "../../../imgs/marquee/10.jpg"
import "./LogoMarquee.css"

const logos = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10]

export default function LogoMarquee() {
  return (
    <div className="logo-marquee">
      <div className="logo-track">
        {logos.map((logo, index) => (
          <div key={index} className="logo-item">
            <img src={logo} alt={`Logo ${index + 1}`} />
          </div>
        ))}
        {/* Duplicate for infinite scroll effect */}
        {logos.map((logo, index) => (
          <div key={index + 10} className="logo-item">
            <img src={logo} alt={`Logo ${index + 11}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
