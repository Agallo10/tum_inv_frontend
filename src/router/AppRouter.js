import { Suspense, lazy, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthStore } from '../../src/store/index';
import { AuthRoutes } from './AuthRoutes';
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react-pro';
import '../scss/style.scss'
// We use those styles to show code examples, you should remove them in your application.
import '../scss/examples.scss'

const Login = lazy(() => import('../views/pages/login/Login'));
const DefaultLayout = lazy(() => import('../layout/DefaultLayout'))

export const AppRouter = () => {
/////////////////////////////////////////////////////////////////////////////  
//Se verifica si está autenticado el ususario  
const status = AuthStore( state => state.status );
//console.log(status);
  //const status = "authenticated";
  const { isColorModeSet, setColorMode } = useColorModes(
    'coreui-pro-react-admin-template-theme-light',
  )
  const storedTheme = useSelector((state) => state.theme)
/////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Verificar si hay un tema en la URL
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
      return
    }
    
    // Verificar el tema guardado en localStorage
    const savedTheme = localStorage.getItem('coreui-pro-react-admin-template-theme-light')
    
    // Si no hay tema guardado o es dark, establecer light por defecto
    if (!savedTheme || savedTheme === 'dark' || savedTheme === '"dark"') {
      localStorage.setItem('coreui-pro-react-admin-template-theme-light', 'light')
      setColorMode('light')
      return
    }
    
    // Si ya hay un tema configurado y es válido, mantenerlo
    if (isColorModeSet() && savedTheme === 'light') {
      return
    }
    
    // Fallback a light
    setColorMode('light')
  }, []) 
/////////////////////////////////////////////////////////////////////////////
  return (
    <HashRouter>
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
        <Routes>
            {
             (status === "authenticated")   
              ? <Route path="/*" name="Proyectos" element={<DefaultLayout/>} />     
              : <Route path="/auth/*" element={<AuthRoutes/>}/>

            }
           <Route exact path="/*" name="Login Page" element={<Login/>} />  
        </Routes>
        </Suspense>
    </HashRouter>        
  )
}
/////////////////////////////////////////////////////////////////////////////