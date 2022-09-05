import Background from './components/Background';
import Board from './components/BoardComponents/Board';
import WinScreen from './components/WinScreen';
import ContextProviders from './utils/Contexts/ContextProviders';

function App() {
  return (
    <div>
      <ContextProviders>
        <Background>
          <Board />
          <WinScreen />
        </Background>
      </ContextProviders>
    </div>
  );
}

export default App;
