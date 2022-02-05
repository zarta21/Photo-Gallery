import React, { useState } from 'react';
import Header from './comps/Header';
import ImageGrid from './comps/ImageGrid';
import LogInOut from './comps/LogInOut';
import Modal from './comps/Modal';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [userOnline, setUserOnline] = useState(null);
  const [error, setError] = useState(null);
  
  return (
    <div className="App">
      <Header setError={setError}/>
      <LogInOut setUserOnline={setUserOnline} userOnline={userOnline} error={error} setError={setError}/>
      <Title />
      {userOnline && <UploadForm />}
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg}
       setSelectedImg={setSelectedImg} />}
    </div>
  );
}

export default App;
