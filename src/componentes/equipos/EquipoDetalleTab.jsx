import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from "@coreui/react-pro";
import { useEquipoStore } from "../../hook/equipos/useEquipoStore";

const EquipoDetalleTab = ({ equipo }) => {
  const { cargarEquipoHv } = useEquipoStore();
  const { ID } = equipo;

  const [equipoHv, setEquipoHv] = useState({});

  const cargarEquipo = async () => {
    const equipo = await cargarEquipoHv(ID);
    console.log(equipo);
    setEquipoHv(equipo);
  };

  useEffect(() => {
    cargarEquipo();
  }, [ID]);

  return (
    <>
      <CCard>
        {/* <CCardHeader></CCardHeader> */}
        <CCardBody>
          <CCardTitle>Equipo {equipoHv.Marca}</CCardTitle>
          <CCardText> • Numero Serial: {equipoHv.Serial}</CCardText>
          <CCardText>
            {" "}
            • Placa de inventario: {equipoHv.PlacaInventario}
          </CCardText>
          <CCardText>
            {" "}
            • Tipo de dispositivo: {equipoHv.TipoDispositivo}
          </CCardText>
          <CCardText>
            {equipoHv.Modelo} • {equipoHv.PlacaInventario}
          </CCardText>
          <CCardText>
            {equipoHv.TipoDispositivo} • {equipoHv.Serial}
          </CCardText>
          <CCardText>
            {equipoHv.Modelo} • {equipoHv.PlacaInventario}
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  );
};

export default EquipoDetalleTab;
