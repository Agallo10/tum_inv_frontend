import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibSemaphoreci,
  cilSpeedometer,
  cilBuilding,
} from '@coreui/icons'


import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'

const _navinicio = [
  {
    component: CNavItem,
    name: <Translation>{(t) => t('Dashboard')}</Translation>,
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: <Translation>{(t) => t('Secretarías')}</Translation>,
    to: '/secretarias',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: <Translation>{(t) => t('Proyectos')}</Translation>,
    to: '/proyectos',
    icon: <CIcon icon={cibSemaphoreci} customClassName="nav-icon" />,
  },
///////////////////////////////////////////////////////////////////////////
  {
    component: CNavTitle,
    name: <Translation>{(t) => t('proyectos')}</Translation>,
  },

]

export default _navinicio
