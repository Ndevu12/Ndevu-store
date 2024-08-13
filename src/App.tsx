import React from 'react';
import Layout from './layout/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <div data-testid="app-component">
        <Layout />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Provider>
  );
}

export default App;
