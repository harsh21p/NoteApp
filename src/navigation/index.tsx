/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './rootNavigation';
import routes from '../routes';
import Splash from '../routes/Splash';
import AddNote from '../routes/AddNote';
import Home from '../routes/Home';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <RootStack.Group screenOptions={{headerShown: false}}>
          <RootStack.Screen name={routes.Home} component={Home} />
          <RootStack.Screen name={routes.Splash} component={Splash} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{headerShown: false}}>
          <RootStack.Screen name={routes.AddNote} component={AddNote} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
