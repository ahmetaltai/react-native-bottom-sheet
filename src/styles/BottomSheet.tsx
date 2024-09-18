import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('screen');

export const BottomSheetStyle = StyleSheet.create({
  Container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  Backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  Sheet: {
    height: height,
    width: width,
  },
  Content: {
    height: height,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10.0,
    elevation: 22,
  },
});
