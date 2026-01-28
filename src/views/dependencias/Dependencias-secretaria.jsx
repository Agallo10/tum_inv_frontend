import { useEffect, useState } from "react";
import { useDependenciaStore } from "../../hook/index";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react-pro";
// import { Tarjeta } from "../../componentes";
import TarjetaDependencia from "../../componentes/tarjetas/tarjetaDependencia";
import { cilTask } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Dependencias = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const { cargarDependenciasBySecretaria } = useDependenciaStore();
  const nombreSecretaria = localStorage.getItem("nombre-secretaria") || "Secretaría";

  ////////////////////////////////////////////////////////////////////////
  const cargarDatos = async () => {
    const dependencias = await cargarDependenciasBySecretaria();
    setTarjetas(dependencias);
  };
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    cargarDatos();
  }, []);
  ////////////////////////////////////////////////////////////////////////
  return (
    <>

    {/* Header Section */}
          <CRow className="mb-4">
            <CCol xs={12}>
              <CCard className="border-0 shadow-sm bg-info bg-gradient text-white">
                <CCardBody className="p-4">
                  <div className="d-flex align-items-center gap-3">
                    <CIcon icon={cilTask} size="3xl" />
                    <div>
                      <h2 className="mb-2">
                        Dependencias/Oficinas - {nombreSecretaria}
                      </h2>
                      {/* <p className="mb-0 opacity-75">
                        Plataforma integral para la gestión y seguimiento del
                        inventario tecnológico de las secretarías. Este sistema
                        permite administrar equipos de cómputo, periféricos,
                        software y configuraciones de red de manera centralizada.
                      </p> */}
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {/* Cards Section */}
      <CRow>
        {tarjetas &&
          tarjetas.map((item) => (
            <TarjetaDependencia
              className="mb-4"
              backgroundImage={item.img}
              id={item.ID}
              Descripcion={item.Descripcion}
              JefeOficina={item.JefeOficina}
              key={item.ID}
              Nombre={item.Nombre}
              UbicacionOficina={item.UbicacionOficina}
              nav={1}
            />
          ))}
      </CRow>
    </>
  );
};

export default Dependencias;
