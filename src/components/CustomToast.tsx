import * as React from 'react'
import { Text, View } from 'react-native'
import { Toast } from 'native-base'
import { connect } from 'react-redux'
import { IState } from '../reducers/UIReducer'

interface State {
  message: string
}

class CustomToast extends React.Component<IState, State> {
  constructor(props: IState) {
    super(props)
    this.state = {
      message: '',
    }
    this.showToast = this.showToast.bind(this)
  }
  showToast() {
    Toast.show({
      text: this.state.message,
      position: 'bottom',
      buttonText: 'Ok',
      duration: 4000,
    })
  }
  componentWillReceiveProps(nextProps: IState) {
    if (nextProps && nextProps.errorMessage) {
      this.setState(
        {
          message: nextProps.errorMessage,
        },
        () => this.showToast())
    }
  }
  public render() {
    return null
  }
}

const mapStateToProps = (state: any) => {
  return { errorMessage: state.ui.errorMessage }
}

export default connect<IState, {}, {}>(mapStateToProps)(CustomToast)
