import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import skoobLogo from '../assets/skoob_icon.jpeg';

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
          <div className="bio-container">
            <div className="div-image-biography">
              <img className="image-biography" src={bio.image} alt={bio.name} />
            </div>
            <div style={{ flex: 1 }}>
              <p className="bio-content">{bio.bio}</p>
            </div>
          </div>
          <hr />
          <div>
          <Link
            to="https://www.facebook.com/harry.wiese.96/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook style={{ fontSize: "2rem", color:  "rgb(8, 102, 255)" }} />
          </Link>
      {" "}
      {" "}
          <Link
            to="https://www.skoob.com.br/autor/6151-harry-wiese"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={skoobLogo} alt="Skoob logo" style={{ height: "35px"}} />
          </Link>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BiographyScreen;
