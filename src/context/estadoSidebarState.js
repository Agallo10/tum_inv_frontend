import { useState, useEffect } from 'react';
//import navinicio from '../components/menu/_navinicio';
import navinicio from '../componentes/menu/_navinicio';
import navadmin from '../componentes/menu/_navadmin';
import navadminuser from '../componentes/menu/_navadminuser';
import navuser from '../componentes/menu/_navuser';

export const useSidebarState = () => {

  const [navegar, setNavegar] = useState(navinicio);
  const [userRole, setUserRole] = useState('');
  const [proyectoactivo, setProyectoActivo] = useState(localStorage.getItem('proyectoactivo'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('autenticacion'));
    if (user && user.state && user.state.user) {
      const userRole = user.state.user.rol || '';
      setUserRole(userRole);
    }
  }, []);

  useEffect(() => {
    const updateProyectoActivo = () => {
      const proyectoactivo = localStorage.getItem('proyectoactivo');
      setProyectoActivo(proyectoactivo);
    };

    window.addEventListener('storage', updateProyectoActivo);

    return () => {
      window.removeEventListener('storage', updateProyectoActivo);
    };
  }, []);

  useEffect(() => {
    if (proyectoactivo !== null) {
      switch (userRole) {
        case 'ADMIN_ROLE':
          setNavegar(navadmin);
          break;
        case 'ADMIN_USER':
          setNavegar(navadminuser);
          break;
        case 'USER':
          setNavegar(navuser);
          break;
        default:
          setNavegar(navinicio);
      }
    }
  }, [userRole, proyectoactivo]);
/////////////////////////////////////////////////////////////////////////////////////////////////  
//Función  que se activa con la tarjeta para pasar al context la iformación de despliegue del Sidebar
  const updateProyectoActivo = (proyectoId) => {
    localStorage.setItem('proyectoactivo', proyectoId);
    setProyectoActivo(proyectoId);
  };
 /////////////////////////////////////////////////////////////////////////////////////////////////
  return {
      updateProyectoActivo,
      navegar,
      userRole,
      proyectoactivo,
  };
};
