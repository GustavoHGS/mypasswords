import * as React from 'react'
import { Text, View } from 'react-native'
import { Toast } from 'native-base'
import { connect } from 'react-redux'
import { IState } from '../reducers/UIReducer'

class CustomToast extends React.Component<IState> {
  public render() {
    if (this.props.errorMessage && this.props.errorMessage.length) {
      Toast.show({
        text: this.props.errorMessage,
        position: 'bottom',
        buttonText: 'Ok',
      })
    }
    return null
  }
}

const mapStateToProps = ({ errorMessage }: IState) => {
  return { errorMessage }
}

export default connect(mapStateToProps)(CustomToast)
