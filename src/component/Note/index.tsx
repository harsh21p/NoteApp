import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
export interface NoteProp {
  item: any;
  callback: any;
  getBack: any;
}
const Note = ({item, callback, getBack}: NoteProp) => {
  return (
    <TouchableOpacity onPress={getBack} onLongPress={() => callback(item.id)}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );
};

export default Note;
