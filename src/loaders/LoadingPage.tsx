import React from 'react'
import GenericPage from './GenericPage'
import { Spinner } from 'react-bootstrap'
import { IonSpinner } from '@ionic/react'

function LoadingPage() {
  return (
    <GenericPage>
        <IonSpinner />
    </GenericPage>
  )
}

export default LoadingPage