import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FolderModel } from '../../types/models';
import Folder from '../atoms/Folder';
import { FolderContext } from '../../providers/FolderProvider';

interface FolderListProp {
  column: number;
}

const FolderListContainer = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-right: 1px solid #e6e6e6;

  button.add-folder {
    height: 30px;
    border: 1px solid transparent;
    border-radius: 5px;

    &:hover {
      border-color: #e6e6e6;
    }
  }

  &:hover {
    button.add-folder {
      display: block;
    }
  }
`;

function FolderList(props: FolderListProp) {
  const { column } = props;
  const { selectedFolders, folders, create } = useContext(FolderContext);
  const [folderList, setFolderList] = useState<FolderModel[]>([]);

  useEffect(() => {
    const previousFolder: FolderModel =
      column === 0 ? folders[-1] : folders[selectedFolders[column - 1]];
    previousFolder &&
      setFolderList(previousFolder.children.map((child) => folders[child]));
  }, [folders[-1], folders[selectedFolders[column - 1]]?.children.length]);

  const createFolder = () => {
    create(column);
  };

  return (
    <FolderListContainer>
      {folderList.map((folder, i) => (
        <Folder key={folder.id} folder={folder} column={column} row={i} />
      ))}
      <button className="add-folder" onClick={createFolder}>
        Create Folder
      </button>
    </FolderListContainer>
  );
}

export default FolderList;
