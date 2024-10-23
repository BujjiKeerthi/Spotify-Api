import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';

const HomePage = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const audioRef = useRef(null);

  const fetchTracks = async () => {
    try {
      const response = await fetch(`https://v1.nocodeapi.com/pavankajol/spotify/KDRVVRLEWygrHYNE/search?q=kannada&type=genre`);
      const data = await response.json();

      if (data.tracks && data.tracks.items) {
        setTracks(data.tracks.items);
      } else {
        console.error("No tracks found");
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleCardClick = (trackId, previewUrl) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (currentTrackId === trackId) {
      setCurrentTrackId(null); 
    } else {
      const newAudio = new Audio(previewUrl);
      audioRef.current = newAudio;
      newAudio.play();
      setCurrentTrackId(trackId);
    }
  };

  return (<>
  
    <div className="track-list bg-black flex flex-wrap justify-center overflow-hidden transform: translateZ(0) scrollbar-none scroll-smooth">
      {tracks.map((element, index) => (
        <div 
          key={index} 
          className={`max-w-sm rounded overflow-hidden shadow-lg bg-white mx-4 my-4 ${currentTrackId === element.id ? 'border-4 border-purple-500' : ''}`}
          onClick={() => handleCardClick(element.id, element.preview_url)}
        >
          <img src={element.album?.images[0]?.url} className="w-full object-cover" alt={`Album cover for ${element.name}`} />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{element.name}</h2>
            <p className="text-gray-700 text-base">
              by {element.album?.artists[0]?.name}
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default HomePage;
