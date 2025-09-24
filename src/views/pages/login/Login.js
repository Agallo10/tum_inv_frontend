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
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
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
    if (validateForm()) {
      await loginUser({ username, password });
      //  console.log(valor);
    }
  };
  //////////////////////////////////////////////////////////////////////////
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
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
                        >
                          Login
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
