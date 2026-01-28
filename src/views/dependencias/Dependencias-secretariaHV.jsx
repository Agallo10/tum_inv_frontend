import { useEffect, useState } from "react";
import { useDependenciaStore } from "../../hook/index";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react-pro";
// import { Tarjeta } from "../../componentes";
import TarjetaDependencia from "../../componentes/tarjetas/tarjetaDependencia";
import { cilSpeedometer, cilTask } from "@coreui/icons";
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
                <CIcon icon={cilSpeedometer} size="3xl" />
                <div>
                  <h2 className="mb-2">
                    Dependencias/Oficinas - {nombreSecretaria}
                  </h2>
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
              nav={2}
            />
          ))}
      </CRow>
    </>
  );
};

export default Dependencias;
