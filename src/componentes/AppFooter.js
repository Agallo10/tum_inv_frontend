import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        {/* <a href="https://iottsolutions.com/" target="_blank" rel="noopener noreferrer">
          Iot
        </a>
        <span className="ms-1">&copy; 2024 Metrex .</span> */}
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="https://frealpe@gmail.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Iot Tech Solutions &amp; Dashboard Iot Services */}
          frealpe@gmail.com
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
