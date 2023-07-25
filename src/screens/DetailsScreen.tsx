import { Image } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

function DetailsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Details'>) {
  const book = route.params.book;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={{ uri: book.thumbnail }} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
    </SafeAreaView>
  );
}

export default DetailsScreen;
