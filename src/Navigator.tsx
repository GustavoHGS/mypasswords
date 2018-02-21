import * as React from 'react'
import {
  BackHandler,
} from 'react-native'
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator,
} from 'react-navigation'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import { IState } from './reducers/AuthReducer'
import Login from './container/Login'
import UserRegister from './container/UserRegister'
import Home from './container/Home'
import NewSite from './container/NewSite'
import EditSite from './container/EditSite'
import { isUserLogged } from './actions/UserActions'

const BaseRouter = StackNavigator(
  {
    EditSite: { screen: EditSite },
    Home: { screen: Home },
    Login: { screen: Login },
    NewSite: { screen: NewSite },
    UserRegister: { screen: UserRegister },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
)

interface State {

}

interface StateProps {
  dispatch?: any
  navigationState?: any
}

interface DispatchProps {
  isUserLogged(): void
}

type Props = StateProps & DispatchProps

class Navigator extends React.Component<Props, State> {
  shouldCloseApp(nav:any) {
    console.log(' back pressd ', nav)
    console.log(' props', this.props)
    return nav.index === 0
  }
  componentDidMount() {
    this.props.isUserLogged()
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, navigationState } = this.props
      if (this.shouldCloseApp(navigationState)) {
        return false
      }
      dispatch(NavigationActions.back())
      return true
    })
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

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
  return { dispatch, ...Redux.bindActionCreators({ isUserLogged }, dispatch) }
}


export { BaseRouter }

export default connect<StateProps, DispatchProps, any>(mapStateToProps,mapDispatchToProps)
(Navigator)

// definition connect<StateProps, DispatchProps, OwnProps, State>(Comp)
