import Home from './components/Home';
import Bucket from './components/Bucket';
import Card from './components/Card';
import History from './components/History';
import {Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/bucket/:name" exact element={<Bucket />} />
        <Route path="/card/:id" exact element={<Card />} />
        <Route path="/history" exact element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
