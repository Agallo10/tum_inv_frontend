import { useEffect, useState } from "react";
import { useDependenciaStore } from "../../hook/index";
import { CRow } from "@coreui/react-pro";
// import { Tarjeta } from "../../componentes";
import TarjetaDependencia from "../../componentes/tarjetas/tarjetaDependencia";

const Dependencias = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const { cargarDependenciasBySecretaria } = useDependenciaStore();

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
