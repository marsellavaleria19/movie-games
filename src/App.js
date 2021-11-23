import logo from './logo.svg';
// import './App.css';
import './assets/css/style.css'
import 'antd/dist/antd.css';
import LayoutComponent from './layout/layout';
import Routes from './routers/routers';
import { MovieGameProvider } from './context/moviegamecontext';

function App() {
  return (
    <MovieGameProvider>
          <Routes/>
    </MovieGameProvider>
    // <LayoutComponent/>
  );
}

export default App;
