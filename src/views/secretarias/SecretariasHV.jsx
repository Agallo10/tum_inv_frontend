import { useEffect, useState } from "react";
import { useSecretariaStore } from "../../hook/index";
import { CCard, CCardBody, CRow, CCol } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilSpeedometer } from "@coreui/icons";
// import { Tarjeta } from "../../componentes";
import TarjetaSecretaria from "../../componentes/tarjetas/tarjetaSecretaria";

const Secretarias = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const cargarSecretarias = useSecretariaStore();

  ////////////////////////////////////////////////////////////////////////
  const cargarDatos = async () => {
    const secretarias = await cargarSecretarias();
    setTarjetas(secretarias);
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
          <CCard className="border-0 shadow-sm bg-primary bg-gradient text-white">
            <CCardBody className="p-4">
              <div className="d-flex align-items-center gap-3">
                <CIcon icon={cilSpeedometer} size="3xl" />
                <div>
                  <h2 className="mb-2">
                    Secretarías - Hoja de vida de equipos y reportes
                  </h2>
                  <p className="mb-0 opacity-75">
                    Plataforma integral para la gestión y seguimiento del
                    inventario tecnológico de las secretarías. Este sistema
                    permite administrar equipos de cómputo, periféricos,
                    software y configuraciones de red de manera centralizada.
                  </p>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Cards Section */}
      <CRow className="g-4">
        {tarjetas &&
          tarjetas.map((item) => (
            <TarjetaSecretaria
              backgroundImage={item.img}
              id={item.ID}
              Descripcion={item.Descripcion}
              Secretario={item.Secretario}
              key={item.ID}
              Nombre={item.Nombre}
              Ubicacion={item.Ubicacion}
              nav={2}
            />
          ))}
      </CRow>
    </>
  );
};

export default Secretarias;
