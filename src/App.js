import React from 'react';
import './App.css';
import MyForm from './Component/MyForm';
function App() {
  let formdata = {
    'name': {
      'type': 'text',
      'required': true,
      'label': 'Full Name'
    },
    'dob': {
      'type': 'date',
      'required': true,
      'label': 'Date Of Birth'
    },
    'gender': {
      'type': 'radio',
      'required': true,
      'options': ['Male', 'Female'],
      'label': 'Gender'
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          My Form
        </p>
      </header>
      <section>
        <MyForm key="MyForm" formdata={formdata} />
      </section>
    </div>
  );
}

export default App;
