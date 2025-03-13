import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
const BiographyScreen = () => {
  const [biography, setBiography] = useState([]);

  useEffect(() => {
    const fetchBiography = async () => {
      try {
        const response = await fetch("/api/biography");
        const data = await response.json();
        setBiography(data);
      } catch (error) {
        console.error("Failed to load biography:", error);
      }
    };

    fetchBiography();
  }, []);

  return (
    <div className="div-container-bio">
  {biography.map((bio) => (
    <div key={bio.name}>
      <h1>{bio.name}</h1>
      <div className="bio-container" >
        <div className="div-image-biography" >
          <img  className="image-biography" src={bio.image} alt={bio.name}  />
        </div>
        <div style={{ flex: 1 }}>
          <p className="bio-content">{bio.bio}</p>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default BiographyScreen;
