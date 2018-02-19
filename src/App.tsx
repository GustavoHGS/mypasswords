import * as React from 'react'
import {
  View,
} from 'react-native'
import { Provider } from 'react-redux'
import TabBarNavigation from './TabBarNavigation'
import Loading from './components/Loading'
import CustomToast from './components/CustomToast'
import store from './store'


const App = () => {
  return (
    <Provider store={store}>
      <View style={{ display: 'flex', flex: 1  }}>
        <TabBarNavigation />
        <Loading />
        {/*<CustomToast applicationIsLoading={false} errorMessage="" />*/}
      </View>
      
    </Provider>
  )
}

// size="large"
//           textStyle={{}}
//           overlayColor={'rgba(0,0,0,0.25)'}
//           visible

export default App
