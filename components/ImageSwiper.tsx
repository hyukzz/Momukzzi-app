import { StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

interface imageType {
  imageInfo: {
    shopPics: string[];
  };
}

const ImageSwiper = ({ imageInfo }: imageType) => {
  return (
    <Swiper height={200} horizontal={false} autoplay>
      {imageInfo?.shopPics?.map((image: string, index: number) => (
        <View key={index} style={styles.container}>
          <Image style={styles.images} source={{ uri: image }} />
        </View>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
});
