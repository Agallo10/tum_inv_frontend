import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { CCol, CWidgetStatsA, CTooltip } from "@coreui/react-pro";
import { getStyle } from "@coreui/utils";
import { MdOutlineDashboard } from "react-icons/md";
import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const TarjetaSecretaria = (props) => {
  const { t } = useTranslation();
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  let navigate = useNavigate();

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

  const setSecretaria = () => {
    localStorage.setItem("secretaria-id", props.id);
    localStorage.setItem("nombre-secretaria", props.Nombre);
    if (props.nav == 1) {
      return navigate("/dependencias-secretaria");
    } else if (props.nav == 2) {
      return navigate("/dependencias-secretaria-hv");
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (props.onEdit) props.onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (props.onDelete) props.onDelete();
  };

  return (
    <CCol sm={6} xl={4} xxl={3}>
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
        onClick={setSecretaria}
        color="info"
        value={
          <>
            <span className="fs-6 fw-normal" style={{ marginLeft: "8px", opacity: 0.9 }}>
              ({props.Secretario})
            </span>
          </>
        }
        title={
          <span className="text-white fw-semibold">
            {`${props.Nombre ? props.Nombre : "NA"}`}
          </span>
        }
        action={
          props.esAdmin ? (
            <div className="d-flex gap-2">
              <CTooltip content="Editar">
                <div
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={handleEdit}
                >
                  <CIcon icon={cilPencil} size="lg" />
                </div>
              </CTooltip>
              <CTooltip content="Eliminar">
                <div
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={handleDelete}
                >
                  <CIcon icon={cilTrash} size="lg" />
                </div>
              </CTooltip>
            </div>
          ) : (
            <div style={{ cursor: "pointer", color: "white" }}>
              <MdOutlineDashboard size={32} />
            </div>
          )
        }
      />
    </CCol>
  );
};

TarjetaSecretaria.propTypes = {
  className: PropTypes.string,
  Descripcion: PropTypes.string,
  id: PropTypes.number,
  Secretario: PropTypes.string,
  Nombre: PropTypes.string,
  Ubicacion: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  esAdmin: PropTypes.bool,
};

export default TarjetaSecretaria;
