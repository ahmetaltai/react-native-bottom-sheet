import { Animated, Dimensions } from 'react-native';
const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

// Validates if a value is in percentage format (e.g., '50%')
export const ValidPercentage = (value: string): boolean => {
  const percentageRegex = /^(\d+)%$/;
  return percentageRegex.test(value);
};

// Animates the bottom sheet
export const Animate = (
  translateRef: Animated.Value,
  toValue: number,
  onComplete?: () => void,
  lastTranslate?: React.MutableRefObject<number>
): void => {
  if (lastTranslate?.current === toValue) return;

  Animated.spring(translateRef, {
    toValue,
    useNativeDriver: true,
    stiffness: 120,
    damping: 25,
    mass: 0.5,
    overshootClamping: true,
  }).start(onComplete);
};

// Finds the closest snapping point
export const GetClosestPoint = (points: number[], value: number): number => {
  return points.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

// Returns the threshold for snapping logic (15% of screen height)
export const GetThreshold = (): number => SCREEN_HEIGHT * 0.15;
