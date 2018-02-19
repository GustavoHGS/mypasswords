import * as React from 'react'
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { IState } from '../reducers/AuthReducer'
import { logout } from '../actions/UserActions'

interface Props extends IState {
  logout(): any
}

class Screen1 extends React.Component<Props> {
  public render() {
    return (
      <View style={{ paddingTop: 30 }}>
        <Text>A sample tab</Text>
        <TouchableHighlight onPress={() => this.props.logout()}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default connect(null, { logout })(Screen1)
