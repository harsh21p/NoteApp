import React, {useEffect} from 'react';
import styles from './styles';
import {
  View,
  FlatList,
  Pressable,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {NoteService} from '../../database/local';
import routes from '..';
import Note from '../../component/Note';
import assets from '../../assets';
import {useNoteContext} from '../../redux/context/data';
const Home = ({navigation}) => {
  const {notesLocal, setUpdate, update, isDownloading, isUploading} =
    useNoteContext();

  const handleDeleteNote = async (item: {
    id: any;
    cloudId: any;
    title: any;
    description: any;
    updated: any;
  }) => {
    await NoteService.updateNote(
      item?.id,
      item?.cloudId,
      item?.title,
      item?.description,
      item?.updated,
      true,
    );
    setUpdate(!update);
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        {isUploading ||
        isDownloading ||
        notesLocal === undefined ||
        notesLocal?.length === 0 ? (
          <View style={styles.holder}>
            notesLocal?.length === 0 && (isUploading || isDownloading) ? (
            <ActivityIndicator style={styles.activity} size={'large'} />) : (
            <Text style={styles.notFound}>Not Found</Text>)
          </View>
        ) : (
          <View style={styles.myFirstView}>
            <View style={styles.header}>
              <Text style={styles.notesText}>Notes</Text>
            </View>
            <FlatList
              data={notesLocal?.filter(e => !e?.deteted)}
              keyExtractor={item => item?.id}
              style={styles.flatList}
              renderItem={({item}) => (
                <Note
                  getBack={() => {
                    navigation.navigate(routes.AddNote, {id: item?.id});
                  }}
                  item={item}
                  callback={handleDeleteNote}
                />
              )}
            />
          </View>
        )}
        <View style={styles.mySecondView}>
          <Pressable
            style={styles.floating}
            onPress={() => {
              navigation.navigate(routes.AddNote);
            }}>
            <Image style={styles.add} source={assets.images.add} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
