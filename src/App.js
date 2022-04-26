import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoaderComponenet from './components/Loader';

const Dashboard = lazy(() => import('./pages/Home'));
const Character = lazy(() => import('./pages/Character'));
const NotFound = lazy(() => import('./pages/404'));

function App() {
  return (
    <Suspense fallback={<LoaderComponenet className={''} />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:character" element={<Character />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
