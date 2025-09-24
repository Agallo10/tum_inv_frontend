import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import { useTranslation } from 'react-i18next';
import { cilArrowRight } from '@coreui/icons';
import Valvula from '../iconos/Valvula.js';
import "./tarjetaproyecto.scss";

const TarjetaProyecto = ({ dispositivos, consumos, alarmas, distribucion, consumototal }) => {
  const { t } = useTranslation();
  const [filteredAlarmas, setFilteredAlarmas] = useState([]);

  useEffect(() => {
    // Filtrar alarmas para eliminar elementos con valor cero
    if (alarmas && alarmas.length > 0) {
      const nonZeroAlarmas = alarmas.filter(item => item.value > 0);
      setFilteredAlarmas(nonZeroAlarmas);
    } else {
      setFilteredAlarmas([]);
    }
  }, [alarmas]); // Dependencia: se ejecuta cuando alarmas cambia

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard className="mb-4">
            <CCardHeader>{t('infoGeneralproyecto')}</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CCard className="mb-4" style={{ height: '250px', overflow: 'auto' }}>
                    <CCardHeader>{t('dispositivosacoiadosproyecto')}</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs={6}>
                          <div className="border-start border-start-4 border-start-info py-1 px-3">
                            <div className="text-body-secondary text-truncate small">
                              {t('proyectados')}
                            </div>
                            <div className="fs-5 fw-semibold">{dispositivos.proyectados}</div>
                          </div>
                        </CCol>
                        <CCol xs={6}>
                          <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                            <div className="text-body-secondary text-truncate small">
                              {t('instalados')}
                            </div>
                            <div className="fs-5 fw-semibold">{dispositivos.instalados}</div>
                          </div>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs={6}>
                          <div className="border-start-select border-start-4 py-1 px-3">
                            <div className="text-body-secondary text-truncate small">
                              {t('noinstalados')}
                            </div>
                            <div className="fs-5 fw-semibold">{dispositivos.noInstalados}</div>
                          </div>
                        </CCol>
                        <CCol xs={6}>
                          {filteredAlarmas.length > 0 ? (
                            filteredAlarmas.map((item) => (
                              <div className="progress-group" key={item.key}>
                                <div className="progress-group-header">
                                  <CIcon className="me-2" icon={item.icon} size="lg" key={item.key}/>
                                  <span>{item.title}</span>
                                  <span className="ms-auto fw-semibold">
                                    {item.value}{' '}
                                    <span className="text-body-secondary small">({item.percent}%)</span>
                                  </span>
                                </div>
                                <div className="progress-group-bars">
                                  <CProgress thin color={item.color} value={item.percent} key={item.key}/>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div>No hay alarmas disponibles</div>
                          )}
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CCard className="mb-4" style={{ height: '250px', overflow: 'auto' }}>
                    <CCardHeader>{t('consumocategorias')}</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol xs={6}>
                          <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                            <div className="text-body-secondary text-truncate small">
                              {t('residencial')}
                            </div>
                            <div className="fs-5 fw-semibold">{consumos.residencial}% <CIcon icon={cilArrowRight}/> {distribucion.residencial}<Valvula/></div>
                          </div>
                        </CCol>
                        <CCol xs={6}>
                          <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                            <div className="text-body-secondary text-truncate small">
                              {t('comercial')}
                            </div>
                            <div className="fs-5 fw-semibold">{consumos.comercial}% <CIcon icon={cilArrowRight}/>{distribucion.comercial}<Valvula/></div>
                          </div>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs={6}>
                          <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                            <div className="text-body-secondary text-truncate small">
                              {t('industrial')}
                            </div>
                            <div className="fs-5 fw-semibold">{consumos.industrial}% <CIcon icon={cilArrowRight}/>{distribucion.industrial}<Valvula/></div>
                          </div>
                        </CCol>
                        <CCol xs={6}>
                          <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                            <div className="text-body-secondary text-truncate small">
                              {t('consumototal')}
                            </div>
                            <div className="fs-5 fw-semibold">{consumototal} m&sup3;</div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};


export default TarjetaProyecto;
