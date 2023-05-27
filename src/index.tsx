import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import APP from './routes/index';
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter><APP /></HashRouter>
);