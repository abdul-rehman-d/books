import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/stacks/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
