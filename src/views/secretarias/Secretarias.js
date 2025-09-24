import { useEffect, useState } from "react";
import { useSecretariaStore } from "../../hook/index";
import { CRow } from "@coreui/react-pro";
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
      <CRow>
        {tarjetas &&
          tarjetas.map((item) => (
            <TarjetaSecretaria
              className="mb-4"
              backgroundImage={item.img}
              id={item.ID}
              Descripcion={item.Descripcion}
              Secretario={item.Secretario}
              key={item.ID}
              Nombre={item.Nombre}
              Ubicacion={item.Ubicacion}
              nav={1}
            />
          ))}
      </CRow>
    </>
  );
};

export default Secretarias;
