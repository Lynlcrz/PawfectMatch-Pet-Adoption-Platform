import { Route, Routes } from 'react-router-dom';
import Signup from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
  );
}

export default App;