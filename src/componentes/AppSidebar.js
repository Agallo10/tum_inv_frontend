import React,{ useContext, useEffect, useState }  from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  useColorModes,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';
import { logo } from 'src/assets/brand/logo';
import { sygnet } from 'src/assets/brand/sygnet';
import { SidebarContext} from '../context/SidebarContext';

import LogoIot from  "./logos/LogoIot"
import LogoIotDark from  "./logos/LogoIotDark"
import { useTheme } from '../context/TemaContext';
import {iot } from  '../assets/brand/iot'
import logoSidebarAlcaldia from '../assets/logos/logoSidebarAlcaldia.png'
import logoSidebarBlancoAlcaldia from '../assets/logos/logoSidebarBlancoAlcaldia.png'


const AppSidebar = () => {
  const {navegar} = useContext(SidebarContext);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const { tema } = useTheme();
 
//Colocar estado

 
  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      //Abre o cierra el menu del sidebar
      unfoldable={unfoldable}
      visible={sidebarShow}
     
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        
        <CSidebarBrand as={NavLink} to="/">          
          <img 
            src={tema === 'dark' ? logoSidebarBlancoAlcaldia : logoSidebarAlcaldia} 
            alt="Alcaldía" 
            className="sidebar-brand-full" 
            style={{ height: '40px' }} 
          />
          <img 
            src={tema === 'dark' ? logoSidebarBlancoAlcaldia : logoSidebarAlcaldia} 
            alt="Alcaldía" 
            className="sidebar-brand-narrow" 
            style={{ height: '32px' }} 
          />
        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
        
      </CSidebarHeader>
      {/*Componentes de la barra lateral  */}
      <AppSidebarNav items={navegar} />
      
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

