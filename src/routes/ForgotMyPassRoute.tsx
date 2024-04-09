import { IonRouterOutlet } from '@ionic/react'
import { Suspense, lazy } from 'react'
import { Route } from 'react-router'
const ForgotMyPasswordPage = lazy(() => import('../pages/ForgotMyPassword'))
const ForgotMyPassConfirmPage = lazy(() => import('../pages/ForgotMyPass/ForgotPassConfirm'))

function ForgotMyPassRoute() {
  return (
    <IonRouterOutlet id="forgotmypass">
      <Route path="/forgotmypass" exact render={() => <Suspense>
        <ForgotMyPasswordPage />
      </Suspense>} />
      <Route path="/forgotpass/confirm" render={() => <Suspense>
        <ForgotMyPassConfirmPage />
      </Suspense>} />
    </IonRouterOutlet>
  )
}

export default ForgotMyPassRoute