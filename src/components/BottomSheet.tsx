import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import { PercentageToPx } from '../helpers';
import { BottomSheetStyle } from '../styles';
import type { BottomSheetProps } from '../types';
import { GestureIndicator } from './GestureIndicator';
import { Animated, View, Dimensions, PanResponder } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const BottomSheet = forwardRef((props: BottomSheetProps, ref) => {
  // Points prop kontrolü
  if (
    !props.points ||
    !Array.isArray(props.points) ||
    props.points.length === 0
  ) {
    throw new Error(
      "The 'points' prop is required and should be a non-empty array."
    );
  }

  const ValidPercentage = (value: string) => {
    const percentageRegex = /^(\d+)%$/;
    return percentageRegex.test(value);
  };

  props.points.forEach((point) => {
    if (!ValidPercentage(point)) {
      throw new Error(
        `Invalid point format: '${point}'. All points should be in the percentage format (e.g., '70%').`
      );
    }
  });

  // Index prop kontrolü
  if (
    props.index === undefined ||
    typeof props.index !== 'number' ||
    props.index < 0 ||
    props.index >= props.points.length
  ) {
    throw new Error(
      "The 'index' prop is required and must be a valid number within the range of points."
    );
  }

  const [BottomSheetVisible, SetBottomSheetVisible] = useState(
    props.visible ? true : false
  );
  const [PixelPoints, SetPixelPoints] = useState<number[]>([]);
  const BottomSheetTranslate = useRef(
    new Animated.Value(
      props.visible ? PercentageToPx(props.visible) : SCREEN_HEIGHT
    )
  ).current;
  const LastTranslate: any = useRef(SCREEN_HEIGHT);

  useEffect(() => {
    const points = props.points.map(PercentageToPx);

    if (props.visible) {
      points.push(PercentageToPx(props.visible));
    }

    SetPixelPoints(points);
  }, [props.points, props.visible]);

  const Animate = (toValue: any, callback?: () => void) => {
    if (LastTranslate.current === toValue) return;
    Animated.spring(BottomSheetTranslate, {
      toValue,
      useNativeDriver: true,
      stiffness: 120,
      damping: 25,
      mass: 0.5,
      overshootClamping: true,
    }).start(callback);
  };

  const open = () => {
    SetBottomSheetVisible(true);
    Animate(
      PixelPoints[props.index],
      () => (LastTranslate.current = PixelPoints[props.index])
    );
  };

  const expand = () => {
    SetBottomSheetVisible(true);
    Animate(
      Math.min(...PixelPoints),
      () => (LastTranslate.current = Math.min(...PixelPoints))
    );
  };

  const close = () => {
    const CloseValue = props.visible
      ? PercentageToPx(props.visible)
      : SCREEN_HEIGHT;

    if (LastTranslate.current === CloseValue) return;

    Animate(CloseValue, () => {
      LastTranslate.current = CloseValue;
      if (!props.visible) {
        SetBottomSheetVisible(false);
      }
    });
  };

  useImperativeHandle(ref, () => ({ open, close, expand }));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () =>
      BottomSheetTranslate.stopAnimation(
        (value) => (LastTranslate.current = value)
      ),
    onPanResponderMove: (evt, gestureState) => {
      const deltaY = LastTranslate.current + gestureState.dy;
      if (Math.abs(gestureState.dy) > 5) {
        BottomSheetTranslate.setValue(deltaY);
      }
    },
    onPanResponderRelease: (evt, { dy }) => {
      const finalTranslateY = LastTranslate.current + dy;
      const [minPoint, maxPoint] = [
        Math.min(...PixelPoints),
        Math.max(...PixelPoints),
      ];

      if (finalTranslateY < minPoint) {
        Animate(minPoint, () => (LastTranslate.current = minPoint));
      } else if (
        finalTranslateY >
        (props.visible ? PercentageToPx(props.visible) : maxPoint + 50)
      ) {
        close();
      } else {
        const closestPoint = PixelPoints.reduce((prev, curr) =>
          Math.abs(curr - finalTranslateY) < Math.abs(prev - finalTranslateY)
            ? curr
            : prev
        );
        Animate(closestPoint, () => (LastTranslate.current = closestPoint));
      }
    },
  });

  const BackdropOpacity = BottomSheetTranslate.interpolate({
    inputRange: [
      PercentageToPx(props.points[props.points.length - 1]),
      SCREEN_HEIGHT,
    ],
    outputRange: [props.style?.backdrop?.opacity || 0.5, 0],
    extrapolate: 'clamp',
  });

  if (!BottomSheetVisible) return null;

  return (
    <View style={BottomSheetStyle.Container} pointerEvents="box-none">
      {!props.visible ? (
        <Animated.View
          onTouchStart={close}
          style={[
            BottomSheetStyle.Backdrop,
            {
              opacity: BackdropOpacity,
              backgroundColor: props.style?.backdrop?.background || 'black',
            },
          ]}
        />
      ) : null}
      <Animated.View
        style={[
          BottomSheetStyle.Sheet,
          props.style?.sheet.shadow &&
          props.config?.indicatorposition === 'under'
            ? BottomSheetStyle.Shadow
            : null,
          {
            transform: [{ translateY: BottomSheetTranslate }],
            backgroundColor:
              props.config?.indicatorposition === 'under'
                ? props.style?.sheet?.background || 'white'
                : 'transparent',
            borderTopStartRadius: props.style?.sheet?.radius || 16,
            borderTopEndRadius: props.style?.sheet?.radius || 16,
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

const MemoizedContent = React.memo(({ props }: { props: BottomSheetProps }) => {
  return (
    <View
      style={[
        BottomSheetStyle.Content,
        props.style?.sheet.shadow && props.config?.indicatorposition === 'over'
          ? BottomSheetStyle.Shadow
          : null,
        {
          backgroundColor: props.style?.sheet?.background || 'white',
          borderTopStartRadius: props.style?.sheet?.radius || 12,
          borderTopEndRadius: props.style?.sheet?.radius || 12,
        },
      ]}
    >
      {props.children}
    </View>
  );
});

export default BottomSheet;
