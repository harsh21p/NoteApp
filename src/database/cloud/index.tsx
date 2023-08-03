import {app} from './config';
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';
export const CloudService = {
  addNote: async (title: any, description: any) => {
    const firestore = getFirestore(app);
    const noteCol = collection(firestore, 'Notes');
    try {
      await addDoc(noteCol, {
        title: title,
        description: description,
      });
      console.log('Note added successfully!');
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
      const notes = snapshot.docs.map(doc => doc.data());
      console.log('All notes:', notes);
      return notes;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  },

  updateNote: async (noteId: any, title: any, description: any) => {
    const firestore = getFirestore(app);
    const noteCol = collection(firestore, 'Notes');
    const documentRef = doc(noteCol, noteId);
    try {
      await updateDoc(documentRef, {
        title: title,
        description: description,
      });
      console.log('Note updated successfully!');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  },

  deleteNote: async (noteId: any) => {
    const firestore = getFirestore(app);
    const noteCol = collection(firestore, 'Notes');
    const documentRef = doc(noteCol, noteId);
    try {
      await deleteDoc(documentRef);
      console.log('Note deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  },
};
