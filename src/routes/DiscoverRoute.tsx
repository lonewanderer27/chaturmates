import { IonRouterOutlet } from '@ionic/react'
import { Route } from 'react-router'
import Discover from '../pages/Discover'
import Search from '../pages/Search'

export default function DiscoverRoute() {
  return (
    <IonRouterOutlet id="discover">
      <Route path="/discover" exact render={() => <Discover/>}/>
      <Route path="/discover/search" render={() => <Search/>}/>
    </IonRouterOutlet>
  )
}
