/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Import the functions you need from the SDKs you need

import AppNavigator from './navigation';
import app from './database/cloud/config';
import AppNetInfo from './redux/hooks';
import {NoteProvider} from './redux/context/data';

function App(): JSX.Element {
  return (
    <NoteProvider>
      <AppNetInfo>
        <AppNavigator />
      </AppNetInfo>
    </NoteProvider>
  );
}

export default App;
