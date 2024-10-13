import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VideoGrid from './components/VideoGrid';
import Footer from './components/Footer';
import { searchVideos } from './services/youtubeApi';

const App: React.FC = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    setError('');
    try {
      const leftWingVideos = await searchVideos(searchTerm, 'CNN,MSNBC,TheGuardian', 3);
      const rightWingVideos = await searchVideos(searchTerm, 'FoxNews,BreitbartNews,TheDailyWire', 3);
      const centristVideos = await searchVideos(searchTerm, 'ReutersNews,AssociatedPress,BBCNews', 3);
      
      setVideos([...leftWingVideos, ...rightWingVideos, ...centristVideos]);
    } catch (error) {
      console.error('Error searching videos:', error);
      setError('An error occurred while fetching videos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar onSearch={handleSearch} />
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                <VideoGrid videos={videos} />
              </>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;