import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { CCol, CDropdown, CWidgetStatsA, CSpinner } from "@coreui/react-pro";
import { getStyle } from "@coreui/utils";
// import { useSidebar } from "../../context/SidebarContext";
import { MdOutlineDashboard } from "react-icons/md";

const TarjetaDependencia = (props) => {
  const { t } = useTranslation();
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  let navigate = useNavigate();
  //Conecta el SidebarContext para que actualice el Sidebar
  //   const { updateProyectoActivo } = useSidebar();

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
  const setDependencia = () => {
    console.log("props", props);
    localStorage.setItem("dependencia-id", props.id);
    localStorage.setItem("dependencia-nombre", props.Nombre);
    // updateProyectoActivo(props.id);

    if (props.nav == 1) {
      return navigate("/dependencia");
    } else if (props.nav == 2) {
      return navigate("/dependencia-hv-equipos");
    } else {
      return;
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  return (
    <CCol sm={6} xl={4} xxl={3} className={props.className}>
      <CWidgetStatsA
        style={{
          position: "relative",
          overflow: "hidden",
          height: "190px",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        className="shadow-sm"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "";
        }}
        onClick={setDependencia}
        color="secondary"
        value={
          <>
            {/* {`${props.id}`} */}
            <span className="fs-6 fw-normal" style={{ marginLeft: "5px" }}>
              ({props.JefeOficina})
            </span>
          </>
        }
        title={
          <span className="fw-semibold">
            {`${props.Nombre ? props.Nombre : "NA"}`}
          </span>
        }
        action={
          <CDropdown alignment="end">
            <div style={{ cursor: "pointer" }}>
              <MdOutlineDashboard size={32} />
            </div>
          </CDropdown>
        }
        // chart={
        //   <div
        //     style={{
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       height: "50%",
        //     }}
        //   >
        //     <img
        //       src={props.backgroundImage} // URL de la imagen pasada como prop
        //       alt={props.alt}
        //       style={{
        //         maxWidth: "100%", // Asegura que la imagen no se desborde
        //         maxHeight: "85%", // Asegura que la imagen no se desborde
        //         objectFit: "cover", // Ajusta la imagen para cubrir el contenedor
        //         borderRadius: "5px", // Bordes redondeados (opcional)
        //       }}
        //     />
        //   </div>
        // }
      />
    </CCol>
  );
};

TarjetaDependencia.propTypes = {
  className: PropTypes.string,
  //   backgroundImage: PropTypes.string,
  Descripcion: PropTypes.string,
  id: PropTypes.number,
  JefeOficina: PropTypes.string,
  Nombre: PropTypes.string,
  UbicacionOficina: PropTypes.string,
};

export default TarjetaDependencia;
