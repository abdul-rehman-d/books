import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/stack';
import useBooks from '../hooks/useBooks';

function HomeScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const {
    data: books,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useBooks();

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  )

  if (isError) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Error</Text>
    </View>
  )

  return (
    <FlatList
      data={books}
      style={styles.container}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate('Details', { book: item })}>
          <Text>{item.title}</Text>
        </Pressable>
      )}
      onRefresh={refetch}
      refreshing={isFetching}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  }
});

export default HomeScreen;
