import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  selectIsLocation,
  selectMapXY,
  selectShopInfo,
  setShopInfo,
  setShopMapXY,
  selectRandomInt,
  setRandomInt,
  setShuffleShop,
  setIsLocation,
  setIsLoading,
  selectIsLoading,
  selectShuffleShop,
  selectShopMapXY,
} from '../store/shopSlice';
import { KAKAO_Authorization_KEY, API_BASE_URL } from '@env';
import { useRandomInt } from '../hooks/useRandomInt';
import { useShuffledArray } from '../hooks/useShuffledArray';
import ImageSwiper from './ImageSwiper';
import { useNavigation } from '@react-navigation/native';
import ShopMenu from './ShopMenu';

const ShopInfo = () => {
  const dispatch = useDispatch();
  const selectShop = useSelector(selectShopInfo);
  const selectShopMap = useSelector(selectShopMapXY);
  const selectMap = useSelector(selectMapXY);
  const selectLocation = useSelector(selectIsLocation);
  const selectRandom = useSelector(selectRandomInt);
  const selectLoading = useSelector(selectIsLoading);
  const selectShuffle = useSelector(selectShuffleShop);
  const navigation = useNavigation();

  function useHandleChange() {
    if (!selectShuffle) {
      alert('더이상 음식점 정보가 없습니다.');
      navigation.navigate('Home');
    } else {
      let n = useRandomInt(0, selectShop.length);

      dispatch(setRandomInt(n));
      dispatch(setShuffleShop(useShuffledArray(selectShop, n)));
      dispatch(
        setShopMapXY({
          latitude: selectShop[n]?.shopInfo?.y,
          longitude: selectShop[n]?.shopInfo?.x,
        }),
      );
    }
  }

  const handleDirectionsLink = () => {
    const shopMapXY = {
      latitude: selectShopMap.latitude,
      longitude: selectShopMap.longitude,
    };

    const mapXY = {
      latitude: selectMap.latitude,
      longitude: selectMap.longitude,
    };

    const url = `kakaomap://route?sp=${mapXY.latitude},${mapXY.longitude}&ep=${shopMapXY.latitude},${shopMapXY.longitude}&by=FOOT`;

    Linking.openURL(url);
  };

  useEffect(() => {
    async function getLocation() {
      const longitude = selectMap.longitude;
      const latitude = selectMap.latitude;

      try {
        const kakaoShopInfo = Array.from({ length: 4 }, (_, i) => i + 1).map(
          (page) =>
            axios.get(
              `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=${page}&size=4&sort=accuracy&x=${longitude}&y=${latitude}&radius=1000`,
              {
                headers: {
                  Authorization: KAKAO_Authorization_KEY,
                },
              },
            ),
        );

        const results = await axios.all(kakaoShopInfo);

        const shopInfoForServer = results.reduce(
          (acc: any, result: any) => [...acc, ...result.data.documents],
          [],
        );

        axios
          .post(
            `${API_BASE_URL}/data`,
            { data: shopInfoForServer },
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            const n = useRandomInt(0, res.data.length);

            dispatch(setRandomInt(n));
            dispatch(setShopInfo(res?.data));
            dispatch(setShuffleShop(useShuffledArray(res?.data, n)));
            dispatch(
              setShopMapXY({
                latitude: res.data[n]?.shopInfo?.y ?? 'x좌표',
                longitude: res.data[n]?.shopInfo?.x ?? 'y좌표',
              }),
            );
            dispatch(setShuffleShop(useShuffledArray(res.data, n)));
            dispatch(setIsLocation(true));
            dispatch(setIsLoading(false));
          });
      } catch (error) {
        alert('위치 정보를 가져오는데 실패했습니다. 새로고침 해주세요.');
      }
    }

    if (!selectLocation) {
      getLocation();
    } else {
      console.log('false인 상태입니다.', selectLocation);
    }
  }, []);

  return (
    <>
      {!selectLoading ? (
        <>
          <SafeAreaView style={styles.restaurantContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>
                {selectShop &&
                selectShop[selectRandom] &&
                selectShop[selectRandom].shopInfo
                  ? selectShop[selectRandom].shopInfo.place_name
                  : navigation.navigate('Home' as never, {} as never)}
              </Text>
            </View>
            <View style={styles.slideContainer}>
              {selectShop && (
                <ImageSwiper imageInfo={selectShop[selectRandom]} />
              )}
            </View>
            <View style={styles.menuContainer}>
              <ShopMenu menuInfo={selectShop[selectRandom]} />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.directionsButton}
                activeOpacity={0.8}
                onPress={handleDirectionsLink}
              >
                <Text style={styles.buttonText}>길찾기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.findButton}
                onPress={useHandleChange}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>다시 추천</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      ) : (
        <SafeAreaView style={styles.loadingContainer}>
          <View>
            <ActivityIndicator size="large" color="#FAE39C" />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  restaurantContainer: {
    flex: 1,
    padding: 20,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  slideContainer: {
    height: 200,
    alignItems: 'center',
  },
  menuContainer: {
    marginTop: 10,
  },

  directionsButton: {
    borderWidth: 3,
    borderColor: '#6aafe6',
    borderRadius: 5,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  findButton: {
    borderWidth: 3,
    borderColor: '#f199bc',
    borderRadius: 5,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#6e6e6e',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ShopInfo;
