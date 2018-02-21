import * as React from 'react'
import * as Redux from 'redux'
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { IState } from '../reducers/UIReducer'
const Spinner = require('react-native-loading-spinner-overlay') 

interface Props extends IState {
  
}

interface State{
  visible: boolean
  textContent: string
}

class Loading extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      textContent: '',
    }
    this.renderContent = this.renderContent.bind(this)
  }
  componentWillReceiveProps(nextProps: any) {
    console.log('loading props ', nextProps)
    if (nextProps) {
      this.setState({ visible: nextProps.isLoading })
    }
  }
  renderContent() {
    return (
      <View style={styles.background}>
        <ActivityIndicator
          size="large"
          color={'#0000ff'}
          style={{ flex: 1 }}
        />
        <View style={styles.textContainer}>
          {/*<Text 
          style={[styles.textContent, this.props.textStyle]}>{this.state.textContent}</Text>*/}
          <Text style={styles.textContent}>{this.state.textContent}</Text>
        </View>
      </View>
    )
  }
  public render() {
    const spinner = (
      <View style={[
        styles.container,
        { backgroundColor: 'rgba(0, 0, 0, 0.25)' },
      ]} key={`spinner_${Date.now()}`}>
        {this.props.children ? this.props.children : this.renderContent()}
      </View>
    )
    if (this.state.visible) {
      return (
        <Modal
          animationType={'none'}
          supportedOrientations={['landscape', 'portrait']}
          transparent
          visible={this.state.visible}
          onRequestClose={() => console.log('none')}
        >
          {spinner}
        </Modal>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state:any) => ({
  isLoading: state.ui.applicationIsLoading,
})

export default connect(mapStateToProps)(Loading)
