import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <h1 className='text-center'>Expense Manager</h1>
          <hr />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
