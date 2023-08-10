import {NoteService} from '../local';
import {app} from './config';
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from 'firebase/firestore/lite';
export const CloudService = {
  addNote: async (id: any, title: any, description: any, dateCreated: any) => {
    const firestore = getFirestore(app);
    const noteCol = collection(firestore, 'Notes');
    try {
      const cloudId = await addDoc(noteCol, {
        id: id,
        title: title,
        description: description,
        dateCreated: dateCreated,
      });
      await NoteService.updateNote(
        id,
        cloudId?.id,
        title,
        description,
        false,
        false,
      );
      console.log('Added to cloud');
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      return false;
    }
  },

  getAllNotes: async () => {
    const firestore = getFirestore(app);
    const noteCol = collection(firestore, 'Notes');
    const snapshot = await getDocs(noteCol);
    try {
      const arrayNote: {
        id: any;
        cloudId: string;
        title: any;
        description: any;
        dateCreated: any;
      }[] = [];
      snapshot.docs.map(doc => {
        arrayNote.push({
          id: doc.data()?.id,
          cloudId: doc.id,
          title: doc.data()?.title,
          description: doc.data()?.description,
          dateCreated: doc.data()?.dateCreated,
        });
      });
      console.log('Feached from cloud');
      return arrayNote;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  },

  updateNote: async (
    noteId: any,
    cloudId: any,
    title: any,
    description: any,
  ) => {
    const firestore = getFirestore(app);
    const noteCol = collection(firestore, 'Notes');
    const documentRef = doc(noteCol, cloudId);
    try {
      await updateDoc(documentRef, {
        id: noteId,
        title: title,
        description: description,
      });

      await NoteService.updateNote(
        noteId,
        cloudId,
        title,
        description,
        false,
        false,
      );

      console.log('Updated to cloud');
      return true;
    } catch (error) {
      console.error('Error updating note:', error);
      return false;
    }
  },

  deleteNote: async (noteId: any) => {
    const firestore = getFirestore(app);
    const noteCol = collection(firestore, 'Notes');
    const documentRef = doc(noteCol, noteId);
    try {
      await deleteDoc(documentRef);
      console.log('Deleted from cloud');
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  },
};
