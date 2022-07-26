import { Header } from 'components/Header/Header'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Container from 'components/Container/Container'

const HomePage = React.lazy(
  () => import(/* webpackChunkName: "HomePage" */ './pages/HomePage/HomePage')
)

const App = () => {
  return (
    <>
    <Header />
    <Container>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/HeroPageList/:id" element={<HeroPageList />} /> */}
        </Routes>
      </Suspense>
      </Container>
    </>
  )
}

export default App
