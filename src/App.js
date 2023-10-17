import './App.css';
import Titulo from './componentes/titulo';
import Archivos from './componentes/archivos';
import BotonDiagnostico from './componentes/botonDiagnostico';

function App() {
  return (
    <div className="App">
      <Titulo />
      <Archivos/>
      <BotonDiagnostico/>
    </div>
  );
}

export default App;
