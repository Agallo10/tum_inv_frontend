import { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilXCircle } from "@coreui/icons";
import logoAlcaldiaHq from "../../../assets/logos/logoAlcaldiaHq.png";
import { AuthStore } from "../../../store/index";

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
const formValidation = {
  // username: [(value) => value.includes("@"), "No es un username valido"],
  username: [(value) => value.length >= 1, "El username no puede ir vacío"],
  password: [
    (value) => value.length >= 4,
    "El password debe tener mas de 4 caracteres",
  ],
};
/////////////////////////////////////////////////////////////////////////////////////
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = AuthStore((state) => state.loginUser);
  //////////////////////////////////////////////////////////////////////////
  //VALIDACION DE LOS CAMPOS DE LOGIN
  const validateForm = () => {
    const newErrors = {};
    if (!formValidation.username[0](username)) {
      newErrors.username = formValidation.username[1];
    }
    if (!formValidation.password[0](password)) {
      newErrors.password = formValidation.password[1];
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //////////////////////////////////////////////////////////////////////////
  //VERIFICACION DEL USUARIO CON EL BACKEND
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setLoginError(null);
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await loginUser({ username, password });
        if (!result) {
          setLoginError("Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.");
        }
      } catch (error) {
        setLoginError("Error de conexión. Por favor, intenta de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  //////////////////////////////////////////////////////////////////////////
  return (
    <div 
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Toast para errores de login */}
      <CToaster className="position-fixed p-3" placement="top-end" style={{ zIndex: 9999 }}>
        {loginError && (
          <CToast
            visible={true}
            color="danger"
            className="text-white align-items-center border-0"
            onClose={() => setLoginError(null)}
          >
            <div className="d-flex">
              <CToastBody className="d-flex align-items-center gap-2">
                <CIcon icon={cilXCircle} className="flex-shrink-0" width={20} height={20} />
                <div>
                  <strong className="me-2">Error de acceso</strong>
                  <span>{loginError}</span>
                </div>
              </CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        )}
      </CToaster>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} lg={5} xl={4}>
            <CCard className="border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <CCardBody className="p-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <img
                    src={logoAlcaldiaHq}
                    alt="Alcaldía de Tumaco"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Título */}
                <div className="text-center mb-4">
                  <h4 className="fw-bold text-dark mb-1">Bienvenido</h4>
                  <p className="text-muted small">Sistema de Inventario de Equipos</p>
                </div>

                <CForm
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="bg-light border-end-0">
                      <CIcon icon={cilUser} className="text-muted" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Usuario"
                      autoComplete="username"
                      id="validationCustomUsername"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      invalid={!!errors.username}
                      className="border-start-0 ps-0"
                      style={{ boxShadow: 'none' }}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">
                        {errors.username}
                      </div>
                    )}
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-light border-end-0">
                      <CIcon icon={cilLockLocked} className="text-muted" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="current-password"
                      id="validationCustomPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      invalid={!!errors.password}
                      className="border-start-0 ps-0"
                      style={{ boxShadow: 'none' }}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password}
                      </div>
                    )}
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton
                      type="submit"
                      color="primary"
                      size="lg"
                      disabled={isLoading}
                      style={{
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        fontWeight: '600',
                      }}
                    >
                      {isLoading ? "Ingresando..." : "Iniciar Sesión"}
                    </CButton>
                  </div>
                </CForm>

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Alcaldía Distrital de San Andrés de Tumaco
                  </small>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
