import { useRef } from 'react';
import { Home } from '@screens';
import BottomSheet, { BottomSheetRef } from 'react-native-bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Stack = createStackNavigator();

export function MainNavigation() {
  const BottomSheetRef = useRef<BottomSheetRef>();

  const OpenBottomSheet = () => {
    BottomSheetRef.current?.open();
  };

  const ExpandBottomSheet = () => {
    BottomSheetRef.current?.expand();
  };

  const SnapBottomSheet = (index: number) => {
    BottomSheetRef.current?.snap(index);
  };

  const OnPressBackdrop = () => {
    console.log('Backdrop Pressed');
  };

  const OnChangePoint = (index: number) => {
    console.log('Present Change: ' + index);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{
              title: 'React Native Bottom Sheet',
            }}
          >
            {() => (
              <Home
                SnapBottomSheet={SnapBottomSheet}
                OpenBottomSheet={OpenBottomSheet}
                ExpandBottomSheet={ExpandBottomSheet}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <BottomSheet
        index={0}
        ref={BottomSheetRef}
        points={['50%', '75%']}
        onPressBackdrop={OnPressBackdrop}
        onChangePoint={OnChangePoint}
      >
        <View style={styles.content}>
          <Text style={styles.title}>🥇</Text>
          <Text style={styles.description}>
            How about discovering the highly fast, stable, and nearly
            zero-configuration React Native Bottom Sheet module?
          </Text>
          <TouchableOpacity
            onPress={() => {
              BottomSheetRef.current?.close();
            }}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Lets Go</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 12,
    width: '100%',
  },
  buttontext: {
    color: 'white',
    textTransform: 'uppercase',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 80,
  },
  description: {
    textAlign: 'center',
  },
});
