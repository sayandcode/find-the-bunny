import Board from './components/BoardComponents/Board';
import WinScreen from './components/WinScreen';
import ConfigContextProvider from './utils/Contexts/gameConfig';

function App() {
  return (
    <div>
      <ConfigContextProvider>
        <WinScreen />
        <Board />
      </ConfigContextProvider>
    </div>
  );
}

export default App;
