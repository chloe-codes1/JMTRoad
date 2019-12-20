import React from 'react';
import './App.css';
import AppRouter from "./component/RouterComponent";
import NavBar from "./component/Navbar";
import Container from '@material-ui/core/Container';

import ReservationModal from "./component/Storebtn/ReservationModal";
import WaitingModal from "./component/Storebtn/WaitingModal";

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <WaitingModal />
        <ReservationModal />
        <AppRouter />
      </Container>
    </div>
  );
}

export default App;