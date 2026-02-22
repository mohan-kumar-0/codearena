import { Routes, Route } from 'react-router-dom';
import ProblemList from './pages/ProblemList';
import ProblemSolve from './pages/ProblemSolve';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProblemList />} />
      <Route path="/problem/:slug" element={<ProblemSolve />} />
    </Routes>
  );
}
