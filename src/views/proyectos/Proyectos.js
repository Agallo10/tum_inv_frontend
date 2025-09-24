import { useEffect, useState } from "react";

import { CRow } from "@coreui/react-pro";
//import Tarjeta from '../../components/tarjetas/tarjeta';
import Tarjeta from "../../componentes/tarjetas/tarjeta";
import { useProyectoStore, useSecretariaStore } from "../../hook/index";

const Proyectos = () => {
  const [tarjetas, setTarjetas] = useState([]);
  // const { cargarAdminProyectos } = useProyectoStore();
  const cargarSecretarias = useSecretariaStore();
  ////////////////////////////////////////////////////////////////////////
  const cargarDatos = async () => {
    // const proyectos = await cargarAdminProyectos();
    const secretarias = await cargarSecretarias();
    console.log("secretarias");
    console.log("ey", secretarias);
    setTarjetas(secretarias);
    console.log(tarjetas);
    // console.log(proyectos);
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
            <Tarjeta
              className="mb-4"
              backgroundImage={item.img}
              idPiloto={item.ID}
              alt={item.Descripcion}
              id={item.ID}
              disp={item.numeroplantulas}
              key={item.ID}
              operador={item.Nombre}
            />
          ))}
      </CRow>
    </>
  );
};

export default Proyectos;
