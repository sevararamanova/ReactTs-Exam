import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store/index.ts';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { enableMapSet } from 'immer';
enableMapSet();

import 'aos/dist/aos.css'; 
import AOS from 'aos'; 

AOS.init({
  duration: 1000, 
  once: true, 
});

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)