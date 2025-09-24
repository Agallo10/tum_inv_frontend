//import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../componentes'
import { SidebarProvider } from '../context/SidebarContext'
import { ThemeProvider } from '../context/TemaContext'

const DefaultLayout = () => {
 
  return (
    <>
   <ThemeProvider>
    <SidebarProvider>
      {/* Barra lateral */}
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        {/* Barra superior */}
        <AppHeader />
        {/* Router */}
          <div className="body flex-grow-1">
            <AppContent />
          </div>
          {/* Pie de Página */}
        <AppFooter />
      </div>
    </SidebarProvider>
  </ThemeProvider>
    </>
  )
}

export default DefaultLayout
