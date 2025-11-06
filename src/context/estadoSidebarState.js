import { useState, useEffect } from 'react';
//import navinicio from '../components/menu/_navinicio';
import navinicio from '../componentes/menu/_navinicio';
import navadmin from '../componentes/menu/_navadmin';
import navadminuser from '../componentes/menu/_navadminuser';
import navuser from '../componentes/menu/_navuser';

export const useSidebarState = () => {

  const [navegar, setNavegar] = useState(navinicio);
  const [userRole, setUserRole] = useState('');
  // const [proyectoactivo, setProyectoActivo] = useState(localStorage.getItem('proyectoactivo'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('autenticacion'));
    // console.log('Usuario autenticado:', user);
    // console.log('Usuario autenticado:',user.state.user.Rol );
    if (user && user.state && user.state.user) {
      const userRole = user.state.user.Rol || '';
      setUserRole(userRole);
    }
  }, []);

  // useEffect(() => {
  //   const updateProyectoActivo = () => {
  //     const proyectoactivo = localStorage.getItem('proyectoactivo');
  //     setProyectoActivo(proyectoactivo);
  //   };

  //   window.addEventListener('storage', updateProyectoActivo);

  //   return () => {
  //     window.removeEventListener('storage', updateProyectoActivo);
  //   };
  // }, []);

  useEffect(() => {
    if (userRole !== null) {
      switch (userRole) {
        case 'admin':
          setNavegar(navadmin);
          break;
        case 'ADMIN_USER':
          setNavegar(navadminuser);
          break;
        case 'tecnico':
          setNavegar(navuser);
          break;
        default:
          setNavegar(navinicio);
      }
    }
  }, [userRole]);
/////////////////////////////////////////////////////////////////////////////////////////////////  
// //Función  que se activa con la tarjeta para pasar al context la iformación de despliegue del Sidebar
//   const updateProyectoActivo = (proyectoId) => {
//     localStorage.setItem('proyectoactivo', proyectoId);
//     setProyectoActivo(proyectoId);
//   };
 /////////////////////////////////////////////////////////////////////////////////////////////////
  return {
      // updateProyectoActivo,
      navegar,
      userRole,
      // proyectoactivo,
  };
};
