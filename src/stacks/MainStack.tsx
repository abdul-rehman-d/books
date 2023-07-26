import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import type { RootStackParamList } from '../types/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<RootStackParamList>();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'All Books'
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
        sharedElements={(route, otherRoute, showing) => {
          const id = route.params.book.id;
          return [id];
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
