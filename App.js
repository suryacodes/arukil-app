import React from 'react';
import AuthRoutes from './src/authRoutes';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
const {store} = configureStore();

console.disableYellowBox = true;
export default function App() {
  return (
    <Provider store={store}>
      <AuthRoutes />
    </Provider>
  );
}
