import './App.css';
import FolderPage from './components/organisms/FolderPage';
import { FolderProvider } from './providers/FolderProvider';

function App() {
  return (
    <div className="App">
      <FolderProvider>
        <FolderPage />
      </FolderProvider>
    </div>
  );
}

export default App;
