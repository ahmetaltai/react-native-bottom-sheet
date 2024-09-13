import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { type BottomSheetRef } from 'react-native-bottom-sheet';

export default function App() {
  const BottomSheetRef = useRef<BottomSheetRef>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          BottomSheetRef.current?.open();
        }}
        style={styles.button}
      >
        <Text style={styles.buttontext}>Open Bottom Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          BottomSheetRef.current?.expand();
        }}
        style={styles.button}
      >
        <Text style={styles.buttontext}>Expand Bottom Sheet</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={BottomSheetRef}
        points={['40%', '70%']}
        index={0}
        // style={{
        //   sheet: {
        //     background: 'white',
        //     shadow: true,
        //   },
        //   indicator: {
        //     color: 'gray',
        //   },
        //   backdrop: {
        //     background: 'black',
        //     opacity: 0.5,
        //   },
        // }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
    justifyContent: 'center',
  },
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
