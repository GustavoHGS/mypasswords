import * as React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { IState } from '../reducers/AuthReducer'

class Screen2 extends React.Component<IState> {
  public render() {
    return (
      <View style={{ paddingTop: 30 }}>
        <Text>
          Another sample tab, this is your Facebook access
          token from Redux state: {this.props.accesstoken}
        </Text>
      </View>
    )
  }
}

const mapStateToProps = ({ accesstoken }: IState) => {
  return { accesstoken }
}

export default connect(mapStateToProps)(Screen2)