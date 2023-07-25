import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/stacks/MainStack';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainStack />
        <StatusBar style="auto" />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
