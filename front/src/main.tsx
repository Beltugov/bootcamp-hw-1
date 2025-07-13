import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import Main from './pages/Main/Main.tsx';
import Favorite from './pages/Favorite/Favorite.tsx';
import Header from './containers/Header/Header.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/favorite'} element={<Favorite />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
