import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
 // return <h1>Hello, World!</h1>;
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a simple React component.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

