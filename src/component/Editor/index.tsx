import {View, TextInput, Button, Pressable, Text} from 'react-native';
import React from 'react';
import styles from './styles';

export interface EditorProp {
  title: any;
  setTitle: any;
  description: any;
  setDescription: any;
  handleSaveNote: any;
}

const Editor = ({
  title,
  setTitle,
  description,
  setDescription,
  handleSaveNote,
}: EditorProp) => {
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.description}
        multiline
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Pressable style={styles.button} onPress={() => handleSaveNote()}>
        <Text style={styles.save}>Save</Text>
      </Pressable>
    </View>
  );
};

export default Editor;
