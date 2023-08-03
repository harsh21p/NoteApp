import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import assets from '../../assets';
export interface NoteProp {
  item: any;
  callback: any;
  getBack: any;
}
const Note = ({item, callback, getBack}: NoteProp) => {
  const [lines, setLines] = useState(2);
  return (
    <TouchableOpacity
      style={styles.sectionContainer}
      onPress={getBack}
      onLongPress={() => callback(item.id)}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Pressable
          onPress={() => {
            callback(item.id);
          }}>
          <Image
            style={styles.delete}
            resizeMode="contain"
            source={assets.images.delete}
          />
        </Pressable>
      </View>

      <Text numberOfLines={lines} style={styles.text}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

export default Note;
