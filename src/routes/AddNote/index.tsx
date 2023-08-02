import {Image, Pressable, SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import styles from './styles';
import {NoteService} from '../../database/local';
import Editor from '../../component/Editor';
import routes from '..';
import assets from '../../assets';
import styles from './styles';

const AddNote = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (route.params?.noteId) {
      // Edit existing note, fetch its details
      fetchNoteDetails(route.params.noteId);
    }
  }, []);

  const fetchNoteDetails = async noteId => {
    const note = await NoteService.getNoteById(noteId);
    setTitle(note.title);
    setDescription(note.description);
    setDeleted(note.deleted);
  };

  const handleSaveNote = async () => {
    if (route.params?.noteId) {
      // Update existing note
      await NoteService.updateNote(
        route.params.noteId,
        title,
        description,
        deleted,
      );
    } else {
      // Add new note
     

      await NoteService.addNote(title, description, deleted);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View>
        <Pressable
          style={styles.back}
          onPress={() => navigation.navigate(routes.Home)}>
          <Image
            style={styles.backImg}
            resizeMode="contain"
            source={assets.images.back}
          />
        </Pressable>
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
