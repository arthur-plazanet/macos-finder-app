import styled from 'styled-components';
import FolderImg from '../../assets/folder.png';
import { FolderModel } from '../../types/models';
import { FolderContext } from '../../providers/FolderProvider';
import React, { useContext, useState } from 'react';

const Container = styled.div`
  height: 30px;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 0.75rem;

  img {
    margin-right: 10px;
  }

  button {
    display: none;
  }

  &:active,
  &:hover {
    background-color: #e6e6e6;
    cursor: pointer;

    button {
      display: block;
      margin-left: auto;
    }
  }
  &:focus {
    background-color: blue;
  }
`;

interface FolderProp {
  folder: FolderModel;
  column: number;
  row: number;
}

function Folder(props: FolderProp) {
  const { select, update, deleteF } = useContext(FolderContext);
  const { folder, column } = props;
  const [title, setTitle] = useState(folder.title);
  const [editMode, setEditMode] = useState(title === '');

  const handleClick = () => {
    select(column, folder.id);
  };

  const deleteFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteF(column, folder.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update(folder.id, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
    }
  };

  return (
    <Container onClick={handleClick}>
      <img src={FolderImg} width={20} alt="folder-img" />
      {editMode ? (
        <input
          type="text"
          autoFocus
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p>{title}</p>
      )}
      <button onClick={deleteFolder}>X</button>
    </Container>
  );
}

export default Folder;
