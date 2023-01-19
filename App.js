import { Button, StyleSheet, Text, View } from 'react-native';
import ExpoDraw from 'expo-draw'
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  // const [status, requestPermission] = MediaLibrary.usePermissions();
  const ref = useRef();
  // const [saveScreen, setSaveScreen] = useState(false)

  useEffect(() => {
    hasPermissions
  }, [])

  const hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };
  const imageRef = useRef();
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Daigram Saved in Device's Local Storage!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (

    <View style={styles.container}>
      <View ref={imageRef} collapsable={false}>


        <Text style={{ marginTop: 50 }}>Draw a Daigram below</Text>
        <View style={{ height: 300 }}>
          <ExpoDraw
            strokes={[]}
            containerStyle={{ backgroundColor: "lightgray", height: 200, width: 300 }}
            color={'#000000'}
            strokeWidth={4}
            enabled={true}
            onChangeStrokes={(strokes) => {
              onSaveImageAsync()
              console.log(strokes)
            }}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
