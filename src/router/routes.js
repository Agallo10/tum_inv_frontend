import React from "react";
import { Translation } from "react-i18next";
// Principal
const Proyectos = React.lazy(() => import("../views/proyectos/Proyectos"));
const Proyecto = React.lazy(() => import("../views/proyecto/Proyecto"));
const Monitoreo = React.lazy(() => import("../views/monitoreo/Monitoreo"));
const Secretarias = React.lazy(
  () => import("../views/secretarias/Secretarias")
);
const SecretariasHv = React.lazy(
  () => import("../views/secretarias/SecretariasHV")
);
const DependenciasSecretaria = React.lazy(
  () => import("../views/dependencias/Dependencias-secretaria")
);
const DependenciasSecretariaHv = React.lazy(
  () => import("../views/dependencias/Dependencias-secretariaHV")
);
const Dependencia = React.lazy(
  () => import("../views/dependencias/Dependencia")
);
const DependenciaListaEquipos = React.lazy(
  () => import("../views/dependencias/Dependencia-listaEquipos")
);

const EquiposDetalle = React.lazy(
  () => import("../views/equipos/Equipos-detalle")
);

const EquiposDetalleHv = React.lazy(
  () => import("../views/equipos/Equipos-detalle-hv")
);
// const Analisis = React.lazy(() => import('../views/datos/Analisisdatos'))

// Monitoreo

const routes = [
  {
    path: "/",
    exact: true,
    name: <Translation>{(t) => t("home")}</Translation>,
  },

  {
    path: "/proyectos",
    name: <Translation>{(t) => t("proyectos")}</Translation>,
    element: Proyectos,
  },
  {
    path: "/secretarias",
    name: <Translation>{(t) => t("secretarias")}</Translation>,
    element: Secretarias,
  },
  {
    path: "/secretarias-hv",
    name: <Translation>{(t) => t("secretarias-hv")}</Translation>,
    element: SecretariasHv,
  },

  {
    path: "/dependencias-secretaria",
    name: <Translation>{(t) => t("dependencias-secretaria")}</Translation>,
    element: DependenciasSecretaria,
  },
  {
    path: "/dependencias-secretaria-hv",
    name: <Translation>{(t) => t("dependencias-secretaria-hv")}</Translation>,
    element: DependenciasSecretariaHv,
  },

  {
    path: "/dependencia",
    name: <Translation>{(t) => t("dependencia")}</Translation>,
    element: Dependencia,
  },
  {
    path: "/dependencia-hv-equipos",
    name: <Translation>{(t) => t("dependencia-hv-equipos")}</Translation>,
    element: DependenciaListaEquipos,
  },

  {
    path: "/detalle-equipo",
    name: <Translation>{(t) => t("detalle-equipo")}</Translation>,
    element: EquiposDetalle,
  },
  {
    path: "/detalle-equipo-hv",
    name: <Translation>{(t) => t("detalle-equipo")}</Translation>,
    element: EquiposDetalleHv,
  },

  {
    path: "/principal",
    name: <Translation>{(t) => t("principal")}</Translation>,
    element: Proyecto,
    exact: true,
  },

  {
    path: "/principal/proyecto",
    name: "Proyecto",
    element: Proyecto,
  },

  {
    path: "/principal/monitoreo",
    name: "Monitoreo",
    element: Monitoreo,
  },

  // {
  //   path: '/principal/analisisdedatos',
  //   name: 'Analisis',
  //   element: Analisis,
  //   exact: true
  // },

  // {
  //   path: '/analitica/perfiles',
  //   name: 'Analisis',
  //   element: ContenedorPerfiles,
  //   exact: true
  // },
];

export default routes;
