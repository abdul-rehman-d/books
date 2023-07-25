import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MasonryList from '@react-native-seoul/masonry-list';
import { RootStackParamList } from '../types/stack';
import useBooks from '../hooks/useBooks';
import BookPreview from '../components/BookPreview';

function HomeScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const {
    books,
    isLoading,
    isError,
    isRefreshing,
    isFetchingNext,
    fetchNext,
    refresh,
  } = useBooks();

  if (isLoading || typeof books === "undefined") return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#333" />
    </View>
  )

  if (isError) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Error</Text>
    </View>
  )

  return (
    <>
      <MasonryList
        data={books}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        containerStyle={styles.container}
        renderItem={({item, i}: {item: Book, i: number}) => (
          <BookPreview
            index={i}
            book={item}
            onPress={() => navigation.navigate('Details', { book: item })}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={refresh}
        onEndReachedThreshold={0.1}
        onEndReached={fetchNext}
      />
      {isFetchingNext && <ActivityIndicator size="large" color="#333" style={styles.floatingLoader} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  floatingLoader: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen;
