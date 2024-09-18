import React from 'react';
import { View } from 'react-native';
import { BottomSheetStyle } from '../styles';
import type { BottomSheetProps } from '../types';

interface MemoizedContentProps {
  props: BottomSheetProps;
}

const MemoizedContent = React.memo(({ props }: MemoizedContentProps) => {
  return (
    <View
      style={[
        BottomSheetStyle.Content,
        props.style?.sheet?.shadow && props.config?.indicatorposition === 'over'
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

export default MemoizedContent;
