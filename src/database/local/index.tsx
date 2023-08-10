import Realm from 'realm';
import uuidRandom from 'uuid-random';

const NoteSchema = {
  name: 'Note',
  primaryKey: 'id',
  properties: {
    id: 'string',
    cloudId: 'string',
    title: 'string',
    description: 'string',
    dateCreated: 'string',
    updated: 'bool',
    deleted: 'bool',
  },
};

export const NoteService = {
  addNote: async (
    title: any,
    cloudId: any,
    description: any,
    updated: any,
    deleted: any,
  ) => {
    const realm = await Realm.open({schema: [NoteSchema]});

    const dateCreated = currentDate();
    const newNote = {
      id: uuidRandom(),
      cloudId: cloudId,
      title,
      description,
      dateCreated,
      updated: updated,
      deleted: deleted,
    };
    try {
      await realm.write(() => {
        realm.create('Note', newNote);
      });
      console.log('Added to local');
    } catch (e: any) {
      console.log(e);
    }
    await realm.close();
  },

  updateNote: async (
    id: any,
    cloudId: any,
    title: any,
    description: any,
    updateFlag: any,
    deleted: any,
  ) => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const existingNote = realm.objectForPrimaryKey('Note', id);

    realm.write(() => {
      existingNote.cloudId = cloudId;
      existingNote.title = title;
      existingNote.description = description;
      existingNote.updated = updateFlag;
      existingNote.deleted = deleted;
    });

    console.log('Updated to local');

    realm.close();
  },

  deleteNote: async id => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const existingNote = realm.objectForPrimaryKey('Note', id);
    await realm.write(async () => {
      await realm.delete(existingNote);
    });
    console.log('Local data deleted');
    realm.close();
    return true;
  },

  getAllNotes: async () => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const notes = realm.objects('Note');
    const notesArray: any[] = [];
    notes?.map(e => {
      notesArray.push({
        id: e?.id,
        cloudId: e?.cloudId,
        title: e?.title,
        description: e?.description,
        dateCreated: e?.dateCreated,
        updated: e?.updated,
        deleted: e?.deleted,
      });
    });
    console.log('Local data feached');
    return notesArray;
  },

  getNoteById: async id => {
    const realm = await Realm.open({schema: [NoteSchema]});
    const note = realm.objectForPrimaryKey('Note', id);
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
