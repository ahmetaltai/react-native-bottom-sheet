import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Animate,
  GetThreshold,
  ValidPercentage,
  GetClosestPoint,
} from '../utils/BottomSheetUtils';
import { PercentageToPx } from '../helpers';
import { BottomSheetStyle } from '../styles';
import MemoizedContent from './MemoizedContent';
import type { BottomSheetProps } from '../types';
import { GestureIndicator } from './GestureIndicator';
import { Animated, View, PanResponder, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

// Helper functions for validation
const validateProps = (props: BottomSheetProps) => {
  const { points, index } = props;

  if (!points || !Array.isArray(points) || points.length === 0) {
    throw new Error(
      "The 'points' prop is required and should be a non-empty array."
    );
  }

  points.forEach((point) => {
    if (!ValidPercentage(point)) {
      throw new Error(
        `Invalid point format: '${point}'. All points should be in the percentage format (e.g., '70%').`
      );
    }
  });

  if (
    index === undefined ||
    typeof index !== 'number' ||
    index < 0 ||
    index >= points.length
  ) {
    throw new Error(
      "The 'index' prop is required and must be a valid number within the range of points."
    );
  }
};

const BottomSheet = forwardRef((props: BottomSheetProps, ref) => {
  const { points, index, visible, onChangePoint, style, config } = props;

  validateProps(props);

  const [isVisible, setIsVisible] = useState(!!visible);
  const [pixelPoints, setPixelPoints] = useState<number[]>([]);
  const BottomSheetTranslate = useRef(
    new Animated.Value(visible ? PercentageToPx(points[index]) : SCREEN_HEIGHT)
  ).current;
  const LastTranslate = useRef(SCREEN_HEIGHT);
  const lastSentPoint = useRef<number | null>(null); // Store the last sent point index

  useEffect(() => {
    setPixelPoints(points.map(PercentageToPx));
  }, [points]);

  const getClosestPointIndex: any = (currentValue: number) =>
    pixelPoints.indexOf(GetClosestPoint(pixelPoints, currentValue)) ?? -1;

  const animateTo = (target: number, callback?: () => void) =>
    Animate(BottomSheetTranslate, target, () => {
      LastTranslate.current = target;
      callback?.();
    });

  const handleChangePoint = (closestIndex: number) => {
    if (closestIndex !== lastSentPoint.current) {
      lastSentPoint.current = closestIndex;
      onChangePoint?.(closestIndex);
    }
  };

  const open = () => {
    setIsVisible(true);
    animateTo(pixelPoints[index] ?? SCREEN_HEIGHT, () =>
      handleChangePoint(getClosestPointIndex(pixelPoints[index]))
    );
  };

  const expand = () => {
    setIsVisible(true);
    const minPoint = Math.min(...pixelPoints);
    animateTo(minPoint, () =>
      handleChangePoint(getClosestPointIndex(minPoint))
    );
  };

  const close = () => {
    animateTo(SCREEN_HEIGHT, () => setIsVisible(false));
    handleChangePoint(-1);
  };

  const snap = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= points.length) {
      console.error(
        `Invalid index: ${targetIndex}. It should be between 0 and ${points.length - 1}.`
      );
      return;
    }

    if (pixelPoints.length === 0) {
      console.error('Pixel points are not initialized yet.');
      return;
    }

    const targetPoint = pixelPoints[targetIndex];
    if (targetPoint === undefined) {
      console.error(
        `Invalid target point at index ${targetIndex}. Pixel points: ${pixelPoints}`
      );
      return;
    }

    setIsVisible(true);
    animateTo(targetPoint, () => {
      handleChangePoint(targetIndex);
    });
  };

  useImperativeHandle(ref, () => ({ open, close, expand, snap }));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () =>
      BottomSheetTranslate.stopAnimation(
        (value) => (LastTranslate.current = value)
      ),
    onPanResponderMove: (evt, gestureState) => {
      let deltaY = LastTranslate.current + gestureState.dy;
      const [minPoint, maxPoint] = [
        Math.min(...pixelPoints),
        Math.max(...pixelPoints),
      ];

      if (deltaY < minPoint) deltaY = minPoint - (minPoint - deltaY) / 3;
      BottomSheetTranslate.setValue(deltaY);
    },
    onPanResponderRelease: (evt, { dy }) => {
      const finalTranslateY = LastTranslate.current + dy;
      const [minPoint, maxPoint] = [
        Math.min(...pixelPoints),
        Math.max(...pixelPoints),
      ];

      if (finalTranslateY < minPoint) {
        animateTo(minPoint, () =>
          handleChangePoint(getClosestPointIndex(minPoint))
        );
      } else if (finalTranslateY > maxPoint) {
        close();
      } else {
        const closestPoint = GetClosestPoint(pixelPoints, finalTranslateY);
        const threshold = GetThreshold();

        if (Math.abs(finalTranslateY - closestPoint) < threshold) {
          animateTo(closestPoint, () =>
            handleChangePoint(getClosestPointIndex(closestPoint))
          );
        } else {
          animateTo(LastTranslate.current);
        }
      }
    },
  });

  if (!isVisible) return null;

  return (
    <View style={BottomSheetStyle.Container} pointerEvents="box-none">
      {!visible ? (
        <Animated.View
          onTouchStart={props.onPressBackdrop || close}
          style={[
            BottomSheetStyle.Backdrop,
            {
              opacity: BottomSheetTranslate.interpolate({
                inputRange: [
                  PercentageToPx(points[points.length - 1]),
                  SCREEN_HEIGHT,
                ],
                outputRange: [style?.backdrop?.opacity || 0.5, 0],
                extrapolate: 'clamp',
              }),
              backgroundColor: style?.backdrop?.background || 'black',
            },
          ]}
        />
      ) : null}
      <Animated.View
        style={[
          BottomSheetStyle.Sheet,
          config?.indicatorposition === 'under' && style?.sheet.shadow
            ? BottomSheetStyle.Shadow
            : null,
          {
            transform: [{ translateY: BottomSheetTranslate }],
            backgroundColor:
              config?.indicatorposition === 'under'
                ? style?.sheet?.background || 'white'
                : 'transparent',
            borderTopStartRadius: style?.sheet?.radius || 16,
            borderTopEndRadius: style?.sheet?.radius || 16,
          },
        ]}
      >
        <View {...panResponder.panHandlers}>
          <GestureIndicator props={props} />
        </View>
        <MemoizedContent props={props} />
      </Animated.View>
    </View>
  );
});

export default BottomSheet;
