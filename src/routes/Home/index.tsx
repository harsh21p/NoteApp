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

const Home = ({navigation}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const fetchedNotes = await NoteService.getAllNotes();
    setNotes(fetchedNotes);
  };

  const handleDeleteNote = async noteId => {
    await NoteService.deleteNote(noteId);
    fetchNotes();
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
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
