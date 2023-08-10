import React, {createContext, useState, useContext, useEffect} from 'react';
import {NoteService} from '../../database/local';
import {Note} from '../../types';
import {CloudService} from '../../database/cloud';

const NoteContext = createContext([]);

export const NoteProvider = ({children}) => {
  const [notesCloud, setNotesCloud] = useState([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [notesLocal, setNotesLocal] = useState([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    fetchFromLocal();
  }, [update]);

  useEffect(() => {
    if (!isUploading) {
      uploadLogic(notesLocal);
    }

    if (isConnected && !isUploading) {
      fetchFromCloud();
    }
  }, [notesLocal, isConnected]);

  useEffect(() => {
    if (notesCloud.length !== 0) {
      downloadLogic(notesLocal, notesCloud);
    }
  }, [notesCloud]);

  async function downloadLogic(notesLocal: any, notesCloud: any) {
    var flagFirst = false;
    await notesCloud?.map(async (e: any, index: any) => {
      if (index === 0) {
        setIsDownloading(true);
      }
      var flag = false;
      notesLocal?.map((i: any) => {
        if (i?.cloudId === e?.cloudId) {
          flag = true;
        }
      });

      if (!flag) {
        flagFirst = true;
        await NoteService?.addNote(
          e?.title,
          e?.cloudId,
          e?.description,
          false,
          false,
        );
      }

      if (index === notesCloud.length - 1) {
        setIsDownloading(false);
      }
    });
    if (flagFirst) {
      setUpdate(!update);
    }
  }
  async function fetchFromCloud() {
    const data = await CloudService.getAllNotes();
    if (data !== null && data !== undefined) {
      await setNotesCloud(data);
    }
  }

  async function fetchFromLocal() {
    const fetchedNotes = await NoteService.getAllNotes();
    setNotesLocal(fetchedNotes);
  }

  async function uploadLogic(notes) {
    await notes?.map(async (e: any, index: any) => {
      if (index === 0) setIsUploading(true);

      if (e.deleted) {
        var isTrue = false;
        if (e.cloudId !== '') {
          isTrue = await CloudService.deleteNote(e.cloudId);
        } else {
          isTrue = true;
        }
        if (isTrue) {
          await NoteService.deleteNote(e.id);
          setUpdate(!update);
        }
      } else {
        if (e.updated) {
          if (e.cloudId === '') {
            await CloudService.addNote(
              e.id,
              e.title,
              e.description,
              e.dateCreated,
            );
          } else {
            await CloudService.updateNote(
              e.id,
              e.cloudId,
              e.title,
              e.description,
            );
          }
          setUpdate(!update);
        }
      }
      if (index === notes?.length - 1) setIsUploading(false);
    });
  }

  return (
    <NoteContext.Provider
      value={{
        notesCloud,
        setNotesCloud,
        isUploading,
        setIsUploading,
        isStarted,
        setIsStarted,
        notesLocal,
        setNotesLocal,
        update,
        setUpdate,
        isConnected,
        setIsConnected,
        isDownloading,
        setIsDownloading,
      }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};
