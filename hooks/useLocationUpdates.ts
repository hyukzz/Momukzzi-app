import { useEffect } from 'react';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';

import { setMapXY } from '../store/shopSlice';

export interface LocationType {
  longitude: number;
  latitude: number;
}

export const useLocationUpdates = (map: Location): void => {
  const dispatch = useDispatch();

  let watchId: Location.LocationSubscription | null = null;

  useEffect(() => {
    const getLocationUpdates = async (): Promise<void> => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        watchId = await Location.watchPositionAsync(
          { distanceInterval: 180000 },
          (location: Location.LocationObject): void => {
            const { longitude, latitude } = location.coords;
            dispatch(setMapXY({ longitude, latitude }));
          },
        );
      } catch (error) {
        console.log('위치를 가져오는 도중 오류가 발생했습니다.', error);
      }
    };

    getLocationUpdates();

    const intervalId = setInterval(() => {
      getLocationUpdates();
    }, 180000);

    return () => {
      if (watchId !== null) {
        Location.stopLocationUpdatesAsync(`${watchId}`);

        watchId = null;
      }
      clearInterval(intervalId);
    };
  }, [map]);
};
