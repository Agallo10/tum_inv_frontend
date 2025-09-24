import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { CCol, CDropdown, CWidgetStatsA, CSpinner } from "@coreui/react-pro";
import { getStyle } from "@coreui/utils";
import { useSidebar } from "../../context/SidebarContext";
import { MdOutlineDashboard } from "react-icons/md";

const Tarjeta = (props) => {
  const { t } = useTranslation();
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  let navigate = useNavigate();
  //Conecta el SidebarContext para que actualice el Sidebar
  const { updateProyectoActivo } = useSidebar();

  useEffect(() => {
    document.documentElement.addEventListener("ColorSchemeChange", () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor =
            getStyle("--cui-primary");
          widgetChartRef1.current.update();
        });
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor =
            getStyle("--cui-info");
          widgetChartRef2.current.update();
        });
      }
    });
  }, [widgetChartRef1, widgetChartRef2]);
  ////////////////Navega al proyecto selecionado y se guarda en localstorage
  const setProyecto = () => {
    console.log(props);
    localStorage.setItem("proyectoactivo", props.id);
    localStorage.setItem("nombreproyectoactivo", props.idPiloto);
    updateProyectoActivo(props.id);
    return navigate("/principal/proyecto");
  };
  ///////////////////////////////////////////////////////////////////////////
  return (
    <CCol sm={6} xl={4} xxl={3} className={props.className}>
      <CWidgetStatsA
        //  className='text-secondary bg-primary'
        style={{
          position: "relative", // Añadido para posicionamiento relativo
          overflow: "hidden", // Añadido para manejar el overflow
          height: "190px", // Altura del widget
        }}
        color="info"
        value={
          <>
            {`${props.idPiloto}`}
            <span className="fs-6 fw-normal" style={{ marginLeft: "5px" }}>
              ({props.disp})
            </span>
          </>
        }
        title={`${props.operador ? props.operador : "NA"}`}
        action={
          <CDropdown alignment="end">
            <div onClick={setProyecto} style={{ cursor: "pointer" }}>
              <MdOutlineDashboard size={32} />
            </div>
          </CDropdown>
        }
        chart={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
            }}
          >
            <img
              src={props.backgroundImage} // URL de la imagen pasada como prop
              alt={props.alt}
              style={{
                maxWidth: "100%", // Asegura que la imagen no se desborde
                maxHeight: "85%", // Asegura que la imagen no se desborde
                objectFit: "cover", // Ajusta la imagen para cubrir el contenedor
                borderRadius: "5px", // Bordes redondeados (opcional)
              }}
            />
          </div>
        }
      />
    </CCol>
  );
};

Tarjeta.propTypes = {
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  alt: PropTypes.string,
  idPiloto: PropTypes.string,
  disp: PropTypes.string,
  id: PropTypes.string,
  operador: PropTypes.string,
};

export default Tarjeta;
