import Header from '../Header/Header';
import Cards from '../Cards/Cards';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss'
import Missing from '../Missing/Missing';
import ListOfWords from '../ListOfWords/ListOfWords';

export default function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/list' element={<ListOfWords />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}


