import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './Context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
