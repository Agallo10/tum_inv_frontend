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
  cilNotes
} from '@coreui/icons'


import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'

const _navadminuser = [
  {
    component: CNavItem,
    name: <Translation>{(t) => t('Proyectos')}</Translation>,
    to: '/proyectos',
    icon: <CIcon icon={cibSemaphoreci} customClassName="nav-icon" />,
  },
///////////////////////////////////////////////////////////////////////////
  // {
  //   component: CNavTitle,
  //   name: <Translation>{(t) => t('proyectos')}</Translation>,
  // },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('Principal')}</Translation>,
    to: '/principal',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Proyecto',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
        to: '/principal/proyecto',
      },
      {
        component: CNavItem,
        name: 'Monitoreo',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        to: '/principal/monitoreo',
      }

    ],
  },
///////////////////////////////////////////////////////////////////////////
  {
    component: CNavTitle,
    name: <Translation>{(t) => t('Analitica de datos')}</Translation>,
  },

      {
        component: CNavItem,
        name: 'Proyecto',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
        to: '/principal/proyecto',
      },
      {
        component: CNavItem,
        name: 'Monitoreo',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        to: '/principal/monitoreo',
      },
///////////////////////////////////////////////////////////////////////////  
  {
    component: CNavTitle,
    name: <Translation>{(t) => t('Administrador')}</Translation>,
  },
  {
    component: CNavGroup,
    name: <Translation>{(t) => t('Administrador')}</Translation>,
    icon: <CIcon icon={cibSteam} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Dispositivos')}</Translation>,
        icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
        to: '/login',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Usuarios')}</Translation>,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        to: '/register',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Proyectos')}</Translation>,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        to: '/404',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Logs')}</Translation>,
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: '/404',
      },
      {
        component: CNavItem,
        name: <Translation>{(t) => t('Tareas')}</Translation>,
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
        to: '/plugins/calendar',
      },

    ],
  },

]

export default _navadminuser
