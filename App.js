import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AudioRecorderPlayer } from 'react-native-audio-recorder-player';
import * as Permissions from 'expo-permissions';

const App = () => {
  const [isListening, setIsListening] = useState(false);
  //const audioRecorderPlayer = new AudioRecorderPlayer();

  const handleListenButtonPress = async () => {
    const audioRecorderPlayer = new AudioRecorderPlayer();
    if (isListening) {
      // stop recording and analyze result
      try {
        const result = await audioRecorderPlayer.stopRecorder();
        console.log('Stopped recording:', result);
        const audioURI = await audioRecorderPlayer.getRecordURL();
        console.log('Recorded audio URI:', audioURI);
        setIsListening(false);
      } catch (error) {
        console.log('Error stopping recording:', error);
      }
    } else {
      // start recording
      try {
        const result = await audioRecorderPlayer.startRecorder();
        console.log('Started recording:', result)
        setIsListening(true);
      } catch (error) {
        console.log('Error starting recording:', error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleListenButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
  button: {
    backgroundColor: '#1A1A1D',
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  } 
});

export default App;