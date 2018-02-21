import * as React from 'react'
import {
  View,
} from 'react-native'
import { Provider } from 'react-redux'
import { Root } from 'native-base'
import TabBarNavigation from './Navigator'
import Loading from './components/Loading'
import CustomToast from './components/CustomToast'
import store from './store'


const App = () => {
  return (
    <Provider store={store}>
      <Root>
        <View style={{ display: 'flex', flex: 1  }}>
          <TabBarNavigation />
          <Loading />
          <CustomToast />
        </View>
      </Root>
    </Provider>
  )
}

export default App
