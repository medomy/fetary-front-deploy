// import NavBar from './components/navbar/navbar';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeDash } from './pages/home-dashboard/home_dash';
import ClientModule from './pages/client/module/client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoggedIn, setUser } from './store/reducers/user_slice/user_slice';
import { setLang } from './store/reducers/lang_slice/lang_slice';
import i18n from './i18n';

function App() {
  const dispatch = useDispatch();
  const lang = useSelector((state)=> state.lang.lang)
  const isDark = useSelector((state)=> state.theme.isDarkMode);
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      dispatch(setUser(JSON.parse(sessionStorage.getItem('user'))));
      dispatch(setLoggedIn(true));
    }
    dispatch(setLang(localStorage.getItem('i18nextLng')));
  }, [])
  return (
    <>
      <div dir={lang==='ar' ? 'rtl' : 'ltr'} className={isDark ? 'bg-dark whole-page-cover' : ''}>
        <Router>
          <Routes>
            <Route element={<ClientModule />} path='/*' />
            <Route element={<HomeDash />} path='/admin/*' />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
