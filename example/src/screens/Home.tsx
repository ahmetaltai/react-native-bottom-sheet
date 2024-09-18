import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function Home(props: any) {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.button} onPress={props.OpenBottomSheet}>
        <Text style={style.buttontext}>Open Bottom Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.button} onPress={props.ExpandBottomSheet}>
        <Text style={style.buttontext}>Expand Bottom Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          props.SnapBottomSheet(1);
        }}
      >
        <Text style={style.buttontext}>Snap Bottom Sheet</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttontext: {
    color: 'white',
  },
});
