import './App.css';
import Footer from './components/Footer';
import MostPopular from './components/MostPopular';
import PopularGuides from './components/PopularGuides';
import VideoHome from './components/VideoHome';

function App() {
  return (
    <div className="App">
     
      <VideoHome />
      <MostPopular />
      <PopularGuides />
      <Footer />
    </div>
  );
}

export default App;
