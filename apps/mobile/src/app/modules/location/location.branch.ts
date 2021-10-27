import { BranchBuilder } from '../../common/services/branch-builder';
import GetLocation from 'react-native-get-location';

interface ILocationData {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const {
  slice: locationSlice,
  actions: locationActions,
} = new BranchBuilder<ILocationData>()
  .defineActions((api) => ({
    async getLocation() {
      try {
        const { latitude, longitude } = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        });

        return {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
      } catch (error) {
        return {
          latitude: 61.7847373,
          longitude: 34.3488191,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
      }
    },
  }))
  .build('location');

export { locationSlice, locationActions };
