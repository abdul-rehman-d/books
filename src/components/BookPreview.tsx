import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
const windowWidth = Dimensions.get('window').width;

const imageWidth = (windowWidth - 30) / 2

function BookPreview({ book, index, onPress }: {
  book: Book,
  index: number,
  onPress: () => void,
}) {
  const [aspectRatio, setAspectRatio] = useState<string>('1');

  useEffect(() => {
    if (book.thumbnail) {
      Image.getSize(book.thumbnail, (w, h) => {
        if (w && h) {
          setAspectRatio(`${w} / ${h}`);
        }
      })
    }
  }, [])

  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.container,
      {
        marginLeft: index % 2 === 0 ? 0 : 10,
        aspectRatio,
      }
    ]}>
      <Animated.Image
        source={{ uri: book.thumbnail }}
        style={{
          aspectRatio,
          width: '100%',
          borderRadius: 10,
        }}
        resizeMode='cover'
        sharedTransitionTag={`book-${book.id}`}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: imageWidth,
    width: imageWidth,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 'auto',
    minHeight: 250,
  }
});

export default BookPreview;
