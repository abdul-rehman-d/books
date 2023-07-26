import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import Animated from 'react-native-reanimated';
import * as Animatble from 'react-native-animatable';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../types/stack';
import { colors } from '../styles/theme';

const DELAY = 300;

function DetailsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Details'>) {
  const book = route.params.book;

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <Animatble.Text style={styles.heading} animation="fadeInLeft" delay={DELAY}>
        {book.title}
      </Animatble.Text>
      <Animatble.View style={styles.publishLine} animation="fadeInLeft" delay={DELAY*2}>
        <Text style={styles.subtitle}>
          <Text>{'Published from '}</Text>
          <Text style={styles.subtitleDark}>{book.publisher}</Text>
        </Text>
        <Text style={styles.subtitle}>
          <Text>{book.publishedDate}</Text>
        </Text>
      </Animatble.View>

      {/* hero */}
      <View style={[styles.imageWrapper, styles.leftRoundedBorder]}>
        <Animated.Image
          source={{ uri: book.thumbnail }}
          style={[styles.image, styles.leftRoundedBorder]}
          sharedTransitionTag={`book-${book.id}`}
        />
      </View>

      {/* rating */}
      <Animatble.View style={styles.ratingWrapper} animation="fadeInLeft" delay={DELAY*2}>
        {
          (book.ratingCount > 0 && book.rating > 0) && (
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>{book.rating.toFixed(1)}</Text>
              <StarRating
                rating={book.rating}
                onChange={()=>{}}
                color='#FEB422'
                starSize={20}
                style={{ marginBottom: 5, marginLeft: 10 }}
                starStyle={{ marginHorizontal: 1 }}
                emptyColor='#eee'
                enableSwiping={false}
                animationConfig={{
                  duration: 0,
                  scale: 1,
                }}
              />
            </View>
          )
        }
        <Text style={styles.subtitle}>
          {book.ratingCount ?? '0'} {book.ratingCount === 1 ? 'rating' : 'ratings'}
        </Text>
      </Animatble.View>

      {/* desc */}
      <ScrollView>
        <Animatble.Text style={styles.description} animation="fadeIn" delay={DELAY*3}>
          {book.description ?? 'No Description'}
        </Animatble.Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.secondary,
  },
  publishLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 16,
    color: '#444',
    fontWeight: '300',
  },
  subtitleDark: {
    fontWeight: '700',
    color: colors.secondary,
  },

  imageWrapper: {
    marginVertical: 20,
    position: 'relative',
    marginRight: -20,
    height: 300,
    width: '110%',
    backgroundColor: '#f7f7f7',
  },
  image: {
    margin: 0,
    width: '90%',
    height: '100%',
    objectFit: 'cover'
  },
  leftRoundedBorder: {
    marginLeft: 'auto',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },

  ratingWrapper: {
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 32,
    color: colors.secondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  description: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.secondary,
  }
});

export default DetailsScreen;
