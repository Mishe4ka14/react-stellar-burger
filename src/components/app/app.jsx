import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import HomePage from "../../pages/home-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
