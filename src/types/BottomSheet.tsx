export interface BottomSheetConfig {
  indicatorposition: 'over' | 'under';
}

export interface BottomSheetProps {
  index: number;
  points: string[];
  visible?: string;
  style?: BottomSheetStyles;
  children?: React.ReactNode;
  config?: BottomSheetConfig;
  onPressBackdrop: () => {};
  onChangePoint: (index: number) => {};
}

export interface BottomSheetStyles {
  sheet: BottomSheetStyle;
  backdrop?: BackdropStyle;
  indicator?: IndicatorStyle;
}

export interface BottomSheetStyle {
  background: string;
  radius?: number;
  shadow?: boolean;
}

export interface BackdropStyle {
  background?: string;
  opacity?: number;
}

export interface IndicatorStyle {
  color?: string;
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
  expand: () => void;
}
