import './App.css';
import { Container } from '@mui/material';
import Sidebar from './Components/Sidebar';
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Components/Home"));
const MapComponent = lazy(() => import("./Components/MapComponent"));
const CreateContact = lazy(() => import("./Components/CreateContact"));
const EditForm = lazy(() => import("./Components/EditForm"));

function App() {
  return (
    <Container>
      <Sidebar/>
      <div style={{paddingTop:'100px'}}>
      <Suspense fallback={<div className="container">Loading...</div>}>
         <Routes>
         <Route
              path="/"
              element={<Home />}
            />
            <Route path="/map" element={<MapComponent/>} />
            <Route
              path="/create"
              element={<CreateContact  />}
            />
             <Route path="/edit/:id" element={<EditForm />} />
          </Routes>
        </Suspense>
      </div>
    </Container>
  );
}

export default App;
