import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  View,
  FlatList,
  Pressable,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import {NoteService} from '../../database/local';
import routes from '..';
import Note from '../../component/Note';
import assets from '../../assets';
import {useFocusEffect} from '@react-navigation/native';
import { CloudService } from '../../database/cloud';

const Home = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, []),
  );

  const fetchNotes = async () => {
    const fetchedNotes = await NoteService.getAllNotes();
    const getNotesFromFirebase = await CloudService.getAllNotes();
    console.log('Feached:', getNotesFromFirebase);
    setNotes(fetchedNotes);
  };

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  const handleDeleteNote = async noteId => {
    await NoteService.deleteNote(noteId);
    fetchNotes();
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        {notes === undefined || notes?.length === 0 ? (
          <Text style={styles.notFound}>Not Found</Text>
        ) : (
          <>
            <Text style={styles.notesText}>Notes</Text>

            <FlatList
              data={notes}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Note
                  getBack={() =>
                    navigation.navigate(routes.AddNote, {noteId: item.id})
                  }
                  item={item}
                  callback={handleDeleteNote}
                />
              )}
            />
          </>
        )}
        <Pressable
          style={styles.floating}
          onPress={() => navigation.navigate(routes.AddNote)}>
          <Image style={styles.add} source={assets.images.add} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
