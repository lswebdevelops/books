import React, { useEffect, useState } from 'react';

const BiographyScreen = () => {
  const [biography, setBiography] = useState([]);

  useEffect(() => {
    const fetchBiography = async () => {
      try {
        const response = await fetch('/api/biography');
        const data = await response.json();
        setBiography(data);
      } catch (error) {
        console.error('Failed to load biography:', error);
      }
    };

    fetchBiography();
  }, []);

  return (
    <div>
      <h1>Sobre o Autor</h1>
      {biography.map((bio) => (
        <div
          key={bio._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px', // Space between image and text
          }}
        >
          {bio.image && (
            <img
              src={bio.image}
              alt={bio.name}
              style={{
                width: '200px',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          )}
          <div>
            <h2>{bio.name}</h2>
            <hr />
            <p>{bio.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BiographyScreen;
