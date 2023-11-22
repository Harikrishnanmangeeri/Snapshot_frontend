'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

function Page() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://source.unsplash.com/random/1920x1080")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
 const router = useRouter()
  const messageStyle = {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(240, 240, 240, 0.8)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    background: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    margin:'10px'
  };

  const handleGoHome = () => {

router.push('/user')
  };
  
  const handleGoToIdeaSnap = () => {
    router.push('/create_idea_snap'); 
  };

  return (
    <div style={containerStyle}>
     
      <div style={messageStyle}>
      
        <p>
          Welcome to our website! Exciting new features are under development.
          Stay tuned for more updates.
        </p>
        <button style={buttonStyle} onClick={handleGoHome}>
          Go to Home
        </button>
        <button style={buttonStyle}  onClick={handleGoToIdeaSnap}>
          Go to Idea Snap
        </button>
      </div>
    </div>
  );
}

export default Page;

