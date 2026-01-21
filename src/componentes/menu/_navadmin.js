import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilChartPie,
  cilMap,
  cilPuzzle,
  cibSteam,
  cibSemaphoreci,
  cilTask, 
  cilSpeedometer,
  cilDevices, 
  cilUser, 
  cilList,
  cilNotes,
  cilBuilding,
  cilPeople,
} from '@coreui/icons'


import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'

const _navadmin = [
  {
    component: CNavItem,
    name: <Translation>{(t) => t('Dashboard')}</Translation>,
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: <Translation>{(t) => t('Secretarías')}</Translation>,
  //   to: '/secretarias',
  //   icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: <Translation>{(t) => t('Proyectos')}</Translation>,
  //   to: '/proyectos',
  //   icon: <CIcon icon={cibSemaphoreci} customClassName="nav-icon" />,
  // },
///////////////////////////////////////////////////////////////////////////
  {
    component: CNavGroup,
    name: 'Secretarías',
    to: '/secretarias',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Administrar equipos',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
        to: '/secretarias',
      },
      {
        component: CNavItem,
        name: 'Hoja de vida equipos',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        to: '/secretarias-hv',
      },
    ],
  },
///////////////////////////////////////////////////////////////////////////
  // Usuarios - Solo visible para admin
  {
    component: CNavItem,
    name: <Translation>{(t) => t('Usuarios')}</Translation>,
    to: '/usuarios',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
///////////////////////////////////////////////////////////////////////////
  // {
  //   component: CNavTitle,
  //   name: <Translation>{(t) => t('Analitica de datos')}</Translation>,
  // },

  // {
  //   component: CNavItem,
  //   name: <Translation>{(t) => t('Perfiles de consumo')}</Translation>,
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  //   to: '/analitica/perfiles',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Localización',
  //   icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  //   to: '/analitica/mapas',
  // },
///////////////////////////////////////////////////////////////////////////  
  // {
  //   component: CNavTitle,
  //   name: <Translation>{(t) => t('Administrador')}</Translation>,
  // },
  // {
  //   component: CNavGroup,
  //   name: <Translation>{(t) => t('Administrador')}</Translation>,
  //   icon: <CIcon icon={cibSteam} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: <Translation>{(t) => t('Dispositivos')}</Translation>,
  //       icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: <Translation>{(t) => t('Usuarios')}</Translation>,
  //       icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: <Translation>{(t) => t('Proyectos')}</Translation>,
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: <Translation>{(t) => t('Logs')}</Translation>,
  //       icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: <Translation>{(t) => t('Tareas')}</Translation>,
  //       icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  //       to: '/plugins/calendar',
  //     },

  //   ],
  // },

]

export default _navadmin
