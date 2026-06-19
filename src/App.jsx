import Footer from '@components/Footer'
import Header from '@components/Header'
import Main from '@components/Main'

function App() {
  return (
    <>
      <div className="bg-orbs" aria-hidden="true">
        <span className="bg-orb bg-orb--1" />
        <span className="bg-orb bg-orb--2" />
        <span className="bg-orb bg-orb--3" />
      </div>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App