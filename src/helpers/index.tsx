import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const PercentageToPx = (percentage: any) =>
  SCREEN_HEIGHT * (1 - parseFloat(percentage) / 100);