import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NoteService} from '../../database/local';
import Editor from '../../component/Editor';
import routes from '..';
import assets from '../../assets';
import styles from './styles';

const AddNote = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (route.params?.noteId) {
      fetchNoteDetails(route.params.noteId);
    }
  }, []);

  const fetchNoteDetails = async noteId => {
    const note = await NoteService.getNoteById(noteId);
    setTitle(note.title);
    setDescription(note.description);
    setUpdated(note.updated);
  };

  const handleSaveNote = async () => {
    if (route.params?.noteId) {
      await NoteService.updateNote(
        route.params.noteId,
        title,
        description,
        updated,
      );
    } else {
      await NoteService.addNote(title, description, updated);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.row}>
          <Pressable
            style={styles.back}
            onPress={() => navigation.navigate(routes.Home)}>
            <Image
              style={styles.backImg}
              resizeMode="contain"
              source={assets.images.back}
            />
          </Pressable>
          <Text style={styles.header}>
            {route.params?.noteId ? 'Update' : 'Add'} Note
          </Text>
        </View>

        <Editor
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          handleSaveNote={handleSaveNote}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddNote;
