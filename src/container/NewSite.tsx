import * as React from 'react'
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import * as Redux from 'redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container, Form, Icon, Item, Input, Label } from 'native-base'
import { connect } from 'react-redux'
import { saveNewSite } from '../actions/SiteActions'
import { ISite } from '../reducers/SiteReducer'

const LOGO = require('../assets/icons/padlock.png')

interface State {
  username: string,
  url: string,
  password: string,
  urlError: boolean
  usernameError: boolean
  passwordError: boolean
}

interface DispatchProps {
  saveNewSite(site: ISite): any
}

interface StateProps {
  navigation: any
}

type Props = DispatchProps & StateProps

class NewSite extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      url: '',
      urlError: false,
      usernameError: false,
      passwordError: false,
    }
  }
  validatePassword() {
    if (this.state.password.length) {
      return this.setState({ passwordError: true })
    }
    return this.setState({ passwordError: false })
  }
  validateUsername() {
    if (this.state.username.length) {
      return this.setState({ usernameError: true })
    }
    return this.setState({ usernameError: false })
  }
  validateUrl() {
    if (this.state.url.length) {
      return this.setState({ urlError: true })
    }
    return this.setState({ urlError: false })
  }
  renderErrorButton(errorType: string) {
    let errorMessage = ''
    const icon = (
      <Icon
          name="close-circle"
          style={{ color: 'red' }}
          onPress={() => Alert.alert(
            'Aviso',
            errorMessage,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            // { cancelable: false },
          )}
        />
    )
    switch (errorType) {
      case 'url': {
        errorMessage = 'URL é um campo obrigatório.'
        if (!this.state.urlError) {
          return icon
        }
        break
      }        
      case 'username':
        errorMessage = 'Usuário/email é um campo obrigatório.'
        if (!this.state.usernameError) {
          return icon
        }
        break
      case 'password':
        errorMessage = 'Senha é um campo obrigatório.'
        if (!this.state.passwordError) {
          return icon
        }
        break
      default:
        break
    }
  }



  render() {
    const {
      url,
      password,
      username,
    } = this.state
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={styles.logoContainer}>
                <Image
                  source={LOGO}
                  style={styles.logo}
                />
              </View>
            </View>
            <Text style={styles.titleText}>
                Novo Site
              </Text>
            <View style={styles.formBox}>
              <Form style={styles.form}>
                <Item floatingLabel error={!this.state.urlError} style={styles.input}>
                  <Label>URL</Label>
                  <Input
                    value={this.state.url}
                    onChangeText={text => this.setState({ url: text }, () => {
                      this.validateUrl()
                    })}
                  />
                  {this.renderErrorButton('url')}
                </Item>
                <Item floatingLabel error={!this.state.usernameError} style={styles.input}>
                  <Label>Usuário/senha</Label>
                  <Input
                    value={this.state.username}
                    onChangeText={text => this.setState({ username: text }, () => {
                      this.validateUsername()
                    })}
                  />
                  {this.renderErrorButton('username')}
                </Item>
                <Item floatingLabel error={!this.state.passwordError} style={styles.input}>
                  <Label>Senha</Label>
                  <Input
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={text => this.setState({ password: text }, () => {
                      this.validatePassword()
                    })}
                  />
                  {this.renderErrorButton('password')}
                </Item>
              </Form>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => this.props.saveNewSite({
                    url,
                    password,
                    username,
                  })}
                  style={styles.registerButton}
                  disabled={
                    !this.state.urlError
                    || !this.state.passwordError
                    || !this.state.usernameError
                  }
                  activeOpacity={(!this.state.urlError
                    || !this.state.passwordError
                    || !this.state.usernameError) ? 0.7 : 1}
                >
                  <Text style={styles.registerButtonText}>
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </KeyboardAwareScrollView>
      </Container>
      
    )
  }
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
  },
  buttonsContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fefefe',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height - 24,
  },
  formBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    alignSelf: 'stretch',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  registerButton: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#b2dfdb',
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  input: {
    marginRight: 8,
    flexDirection: 'row-reverse',
  },
  logo: {
    width: 85,
    height: 85,
  },
  logoContainer: {
    flexDirection: 'column',
    height: 170,
    width: 170,
    borderRadius: 85,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
  },
  textheader: {
    color: '#000',
    fontSize: 50,
    textAlign: 'center',
  },
  titleText: {
    color: '#673D9A',
    fontSize: 30,
    display: 'flex',
    flexDirection: 'row',
  },
  top: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

const mapStateToProps = (state: any) => {
  return {
    navigationState: state.baseRouting,
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
  return  Redux.bindActionCreators({ saveNewSite }, dispatch)
}

export default connect<Props, DispatchProps, any>(null, mapDispatchToProps)(NewSite)
