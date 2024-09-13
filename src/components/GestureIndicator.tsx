import { View } from 'react-native';

export function GestureIndicator({ props }: any) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
      }}
    >
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: 100,
          backgroundColor: props.style?.indicator?.color
            ? props.style?.indicator?.color
            : props.config?.indicatorposition === 'under'
              ? 'black'
              : 'white',
        }}
      />
    </View>
  );
}
