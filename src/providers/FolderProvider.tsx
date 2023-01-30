import { createContext, useContext, useState } from 'react';
import { FolderModel } from '../types/models';

interface FolderData {
  [id: string]: FolderModel;
}

interface FolderContextType {
  folders: FolderData;
  selectedFolders: number[];
  select: Function;
  create: Function;
  update: Function;
  deleteF: Function;
}

const initialState: FolderData = {
  '-1': {
    id: -1,
    title: '',
    children: [0],
  },
  0: {
    id: 0,
    title: 'baupal',
    children: [],
  },
};

export const FolderContext = createContext<FolderContextType>({
  folders: {},
  selectedFolders: [],
  select: () => {},
  create: () => {},
  update: () => {},
  deleteF: () => {},
});

export const FolderProvider = ({ children }: any) => {
  const [folders, setFolders] = useState(initialState);
  const [selectedFolders, setSelectedFolders] = useState([0, -1]);

  const select = (column: number, row: number) => {
    setSelectedFolders((selectedFolders) => {
      if (column < selectedFolders.length) {
        selectedFolders = selectedFolders.slice(0, column + 1);
        selectedFolders.push(-1);
      }
      selectedFolders[column] = row;
      return selectedFolders;
    });
  };

  const create = (column: number) => {
    setFolders((folders) => {
      const parentFolder: FolderModel =
        column === 0 ? folders[-1] : folders[selectedFolders[column - 1]];
      const id = Object.keys(folders).length;

      return {
        ...folders,
        [parentFolder.id]: {
          ...parentFolder,
          children: [...parentFolder.children, id],
        },
        [id]: {
          id,
          title: '',
          children: [],
        },
      };
    });
  };

  const update = (folderId: number, title: string) => {
    setFolders((folders) => ({
      ...folders,
      [folderId]: {
        ...folders[folderId],
        title,
      },
    }));
  };

  const deleteF = (column: number, folderId: number) => {
    const parentId: number = selectedFolders[column - 1];
    const index = folders[parentId].children.indexOf(folderId);

    setFolders((folders) => ({
      ...folders,
      parentId: {
        ...folders[parentId],
        children: folders[parentId].children.splice(index, 1),
      },
    }));
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        selectedFolders,
        select,
        create,
        update,
        deleteF,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = () => useContext(FolderContext);
