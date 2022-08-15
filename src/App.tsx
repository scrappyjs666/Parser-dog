import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from './components/Container/Container';
import { Header } from './components/Header';
import { Loader } from './components/ui/Loader';

const HomePage = React.lazy(() => import(/* webpackChunkName: "HomePage" */ './pages/HomePage'));

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
};

export default App;
