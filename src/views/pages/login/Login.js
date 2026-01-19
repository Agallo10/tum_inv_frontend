import { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import iotlogo from "../../../assets/logos/LogoAlcaldia.jpeg";
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
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Ingresa a tu cuenta</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        id="validationCustomUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        invalid={!!errors.username}
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )}
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="validationCustomPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        invalid={!!errors.password}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </CInputGroup>

                    <CRow>
                      <CCol
                        xs={8}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          style={{ marginLeft: "50%" }}
                          disabled={isLoading}
                        >
                          {isLoading ? "Ingresando..." : "Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="p-4" style={{ width: "100%" }}>
                <CCardBody
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "100%" }}
                >
                  <div style={{ width: "100%", paddingRight: "5px" }}>
                    <img
                      src={iotlogo}
                      alt="LogoIoT"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
