import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';

const App = () => {
  const [recording, setRecording] = useState();

  const startRecording = async () => {
    try {
      console.log('Requesting permissions...');
      const permission = await Audio.requestPermissionsAsync();
      console.log('Permission status:', permission.status);
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log('Starting recording...');
        console.log('Recording status:', recording);
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);
        console.log('Recording started');
        console.log('Recording status:', recording);
      }
    } catch (error) {
      console.log('Error starting recording:', error);
    }
  }

  const stopRecording = async () => {
    console.log('Stopping recording');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at:', uri);
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.button}>
        <Text style={styles.buttonText}>
          {recording ? 'Stop Listening' : 'Start Listening'}
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