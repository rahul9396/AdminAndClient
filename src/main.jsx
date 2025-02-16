import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import ReactQueryProviders from './queryClientProvider/ReactQueryProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactQueryProviders>
    <App />
    </ReactQueryProviders>
  </StrictMode>,
)
