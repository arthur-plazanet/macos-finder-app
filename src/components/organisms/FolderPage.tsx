import styled from 'styled-components';
import { FolderContext } from '../../providers/FolderProvider';
import { useContext } from 'react';
import FolderList from '../molecules/FolderList';

const FolderPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

function FolderPage() {
  const { selectedFolders } = useContext(FolderContext);

  return (
    <FolderPageContainer>
      {selectedFolders.map((_, column) => {
        return <FolderList key={`list-${column}`} column={column} />;
      })}
    </FolderPageContainer>
  );
}

export default FolderPage;
