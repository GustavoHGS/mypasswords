import * as React from 'react'
import {
  addNavigationHelpers,
  StackNavigator,
  TabBarBottom,
  TabNavigator,
} from 'react-navigation'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import Screen1 from './components/Screen1'
import Screen2 from './components/Screen2'
import { IState } from './reducers/AuthReducer'
import Login from './container/Login'
import { isUserLogged } from './actions/UserActions'
import { login } from './actions/AuthActions'

const TabBar = TabNavigator(
  {
    Screen1: { screen: Screen1 },
    Screen2: { screen: Screen2 },
  },
  {
    animationEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  },
)

const BaseRouter = StackNavigator(
  {
    Login: { screen: Login },
    MainScreen: { screen: TabBar },
  },
  {
    headerMode: 'none',
    // initialRouteName: iRouteName,
    initialRouteName: 'Login',
  },
)

interface Props extends IState {
  isUserLogged(): void
  dispatch?: any
  navigationState?: any
}

class TabBarNavigation extends React.Component<Props, IState> {
  componentDidMount() {
    this.props.isUserLogged()
  }
  public render() {
    const { dispatch, navigationState } = this.props
    
    return (
      <BaseRouter
        navigation={addNavigationHelpers({ dispatch, state: navigationState })
        }
      />
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    navigationState: state.baseRouting,
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => ({
  dispatch,
  isUserLogged: () => dispatch(isUserLogged()),
})

export { BaseRouter }
export { TabBar }
export default connect(mapStateToProps, mapDispatchToProps)(TabBarNavigation)
