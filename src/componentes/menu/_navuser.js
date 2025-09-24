import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilMap,
  cilPuzzle,
  cibSemaphoreci,
  cilTask, 
  cilSpeedometer,
} from '@coreui/icons'


import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'

const _navuser = [
  {
    component: CNavItem,
    name: <Translation>{(t) => t('Proyectos')}</Translation>,
    to: '/proyectos',
    icon: <CIcon icon={cibSemaphoreci} customClassName="nav-icon" />,
  },
///////////////////////////////////////////////////////////////////////////
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
 

]

export default _navuser
