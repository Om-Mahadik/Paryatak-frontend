import React from "react";
import "./CardDisplay.css";

const cardImages = [
  "https://www.riu.com/blog/wp-content/uploads/2020/09/riu-maldivas-scaled.jpg",
  "https://tse1.mm.bing.net/th/id/OIP.okmQGuumVuevxyEU8eTuaAHaEK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse3.mm.bing.net/th/id/OIP.RPiLsR0ci6BUVoSWA4WXngHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse2.mm.bing.net/th/id/OIP.S2LYPEdx9vLp5p0pgBoAAQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://static.thehoneycombers.com/wp-content/uploads/sites/4/2022/01/Four-Seasons-Resort-at-Jimbaran-Bay-Bali-Indonesia.jpeg",
  "https://static.vecteezy.com/system/resources/thumbnails/017/791/706/original/4k-time-lapse-of-taj-mahal-an-ivory-white-marble-mausoleum-on-the-south-bank-of-the-yamuna-river-in-agra-uttar-pradesh-india-free-video.jpg",
];

const CardDisplay = () => {
  return (
    <div className="cardDisplayContainer">
      <h1 className="heading">Discover Your Next Adventure</h1>
      <p className="subText">
        Explore breathtaking destinations and experiences designed just for you.
      </p>

      <div className="cardsWrapper">
        {cardImages.map((image, index) => (
          <div key={index} className="card">
            <img src={image} alt={`Card ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;
