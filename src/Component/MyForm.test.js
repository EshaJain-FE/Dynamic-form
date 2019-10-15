import React from 'react';
import ReactDOM from 'react-dom';
import MyForm from './MyForm';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

it('renders without crashing', () => {
    const div = document.createElement('div');
    const formdata = '';
    ReactDOM.render(<MyForm formdata={formdata} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the form component correctly', () => {
   const formdata = '';
   const {getByTestId} =render(<MyForm formdata={formdata} />);
   expect(getByTestId('heading')).toHaveTextContent('Contact Form');
});
