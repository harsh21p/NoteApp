import Note from '../component/Note';

export interface Note {
  id: string;
  cloudId: string;
  title: string;
  description: string;
  dateCreated: string;
  updated: boolean;
  deleted: boolean;
}

export type DataType = Note[];
