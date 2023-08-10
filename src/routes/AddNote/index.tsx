import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NoteService} from '../../database/local';
import Editor from '../../component/Editor';
import assets from '../../assets';
import styles from './styles';
import {useNoteContext} from '../../redux/context/data';

const AddNote = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cloudId, setCloudId] = useState('');
  const [deleted, setDeleted] = useState(false);

  const [updated, setUpdated] = useState(true);

  const {setUpdate, update} = useNoteContext();
  useEffect(() => {
    if (route?.params?.id) {
      fetchNoteDetails(route?.params?.id);
    }
  }, [route?.params?.id]);

  const fetchNoteDetails = async id => {
    const note = await NoteService.getNoteById(id);
    setTitle(note.title);
    setDescription(note.description);
    setUpdated(true);
    setCloudId(note.cloudId);
    setDeleted(note.deleted);
  };

  const handleSaveNote = async () => {
    if (route?.params?.id) {
      await NoteService.updateNote(
        route.params.id,
        cloudId,
        title,
        description,
        updated,
        deleted,
      );
    } else {
      await NoteService.addNote(title, cloudId, description, updated, deleted);
    }
    setUpdate(!update);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.row}>
          <Pressable
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={styles.backImg}
              resizeMode="contain"
              source={assets.images.back}
            />
          </Pressable>
          <Text style={styles.header}>
            {route.params?.id ? 'Update' : 'Add'} Note
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
