import Realm from 'realm';
import uuidRandom from 'uuid-random';

const NoteSchema = {
  name: 'Note',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    dateCreated: 'string',
    updated: 'bool',
  },
};

export const NoteService = {
  addNote: async (title: any, description: any, updated: any) => {
    const realm = await Realm.open({schema: [NoteSchema]});

    const dateCreated = currentDate();
    const newNote = {
      id: uuidRandom(),
      title,
      description,
      dateCreated,
      updated: updated,
    };

    try {
      realm.write(() => {
        realm.create('Note', newNote);
      });
      console.log('Done');
    } catch (e: any) {
      console.log(e);
    }

    realm.close();
  },

  updateNote: async (
    noteId: any,
    title: any,
    description: any,
    updateFlag: any,
  ) => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const existingNote = realm.objectForPrimaryKey('Note', noteId);

    realm.write(() => {
      existingNote.title = title;
      existingNote.description = description;
      existingNote.updated = updateFlag;
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
    return notesArray;
  },

  getNoteById: async noteId => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const note = realm.objectForPrimaryKey('Note', noteId);
    return note;
  },
};
function currentDate(): String {
  const today = new Date();

  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = `${date < 10 ? '0' : ''}${date}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;

  return formattedDate;
}
