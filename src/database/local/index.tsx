import Realm from 'realm';
import {v4 as uuidv4} from 'uuid';

const NoteSchema = {
  name: 'Note',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    dateCreated: 'string',
    deleted: 'boolean',
  },
};

export const NoteService = {
  addNote: async (title: any, description: any, deleted: any) => {
    Realm.open({schema: [NoteSchema]})
      .then(() => {
        console.log('Hi');
      })
      .catch(e => console.log(e));

    const dateCreated = currentDate();
    const newNote = {
      id: uuidv4(),
      title,
      description,
      dateCreated,
      deleted: deleted,
    };
    console.log('Date:', dateCreated);
    realm.write(() => {
      realm.create('Note', newNote);
    });

    realm.close();
  },

  updateNote: async (
    noteId: any,
    title: any,
    description: any,
    deleteFlag: any,
  ) => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const existingNote = realm.objectForPrimaryKey('Note', noteId);

    realm.write(() => {
      existingNote.title = title;
      existingNote.description = description;
      existingNote.delete = deleteFlag;
    });

    realm.close();
  },

  deleteNote: async noteId => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const existingNote = realm.objectForPrimaryKey('Note', noteId);

    realm.write(() => {
      realm.delete(existingNote);
    });

    realm.close();
  },

  getAllNotes: async () => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const notes = realm.objects('Note');
    const notesArray = Array.from(notes);
    realm.close();
    return notesArray;
  },

  getNoteById: async noteId => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const note = realm.objectForPrimaryKey('Note', noteId);
    realm.close();
    return note;
  },
};
function currentDate(): String {
  const today = new Date();

  // Extract date, month, and year from the Date object
  const date = today.getDate();
  const month = today.getMonth() + 1; // Note: Months are zero-indexed, so we add 1
  const year = today.getFullYear();

  // Format the date as a string (e.g., "01/08/2023")
  const formattedDate = `${date < 10 ? '0' : ''}${date}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;

  return formattedDate;
}
