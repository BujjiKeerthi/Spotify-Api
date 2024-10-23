// App.js
import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';

function App() {
  const [keyword, setKeyword] = useState('');
  const [tracks, setTracks] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const audioRef = useRef(null);
  const [isSearch,setIsSearh]=useState(false);

  const getTracks = async () => {
    try {
      const response = await fetch(`https://v1.nocodeapi.com/pavankajol/spotify/KDRVVRLEWygrHYNE/search?q=${keyword}&type=track`);
      const data = await response.json();

      if (data.tracks && data.tracks.items) {
        setTracks(data.tracks.items);
        setIsSearh(true);
      } else {
        console.error("No tracks found");
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

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

  return (
    <div>
      <Navbar keyword={keyword} setKeyword={setKeyword} getTracks={getTracks} />
      {!isSearch?(<Home/>):(<Search tracks={tracks} currentTrackId={currentTrackId} handleCardClick={handleCardClick} />)}

    </div>
  );
}

export default App;
