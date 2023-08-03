/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Import the functions you need from the SDKs you need

import React, {useEffect} from 'react';
import AppNavigator from './navigation';
import app from './database/cloud/config';

function App(): JSX.Element {
  useEffect(() => {}, []);

  return <AppNavigator />;
}

export default App;
