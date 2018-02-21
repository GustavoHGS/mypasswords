import * as React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import * as Redux from 'redux'
import {
  NavigationActions,
} from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const LocalAuth = require('react-native-local-auth')
import { Form, Item, Input, Label, Container } from 'native-base'
import { connect } from 'react-redux'
import { login, enableAuthWithLocalCredentials } from '../actions/AuthActions'
import { showMessage, resetStackAndGo } from '../actions/UserActions'
import { IState as IStateAuth } from '../reducers/AuthReducer'
import { IState as IStateUI } from '../reducers/UIReducer'



const logo = require('../assets/icons/padlock-unlock.png')

interface State {
  email: string,
  password: string,
}

interface DispatchProps {
  login({ auth }: IStateAuth): any
  showMessage(message: string): any
  enableAuthWithLocalCredentials(): any
  resetStackAndGo(route: string): void
}

interface StateProps {
  navigation: any
  showFingerprint: boolean,
}

type Props = DispatchProps & StateProps

class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }
  componentDidMount() {
    this.props.enableAuthWithLocalCredentials()
  }
  componentWillReceiveProps(nextProps) {
    
  }

  credentialsAuth() {
    LocalAuth.authenticate({
      reason: 'Insira sua credencial para continuar...',
      falbackToPasscode: true,
      suppressEnterPassword: true,
    })
    .then((success: any) => {
      this.props.resetStackAndGo('Home')
    })
    .catch((error: any) => {
      this.props.showMessage('Falha na autenticação.')
    })
  }
  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={styles.logoContainer}>
                <Image
                  source={logo}
                  style={styles.logo}
                />
              </View>
            </View>
            <View style={styles.formBox}>
              <Form style={styles.form}>
                <Item floatingLabel style={styles.input}>
                  <Label>Email</Label>
                  <Input
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                  />
                </Item>
                <Item floatingLabel last style={styles.input}>
                  <Label>Senha</Label>
                  <Input
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={text => this.setState({ password: text })}
                  />
                </Item>
                <TouchableOpacity
                  onPress={() => this.props.login({
                    auth: {
                      email: this.state.email,
                      password: this.state.password,
                    },
                  })
                  }
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>
                    Entrar
                  </Text>
                </TouchableOpacity>
                {
                  this.props.showFingerprint ? (
                    <TouchableOpacity
                      onPress={() => this.credentialsAuth()}
                      style={styles.loginButton}
                    >
                      <Text style={styles.loginButtonText}>
                        Entrar com credenciais
                      </Text>
                    </TouchableOpacity>
                  ) : null
                }
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('UserRegister')}
                  style={styles.registerButton}
                >
                  <Text style={styles.registerButtonText}>
                    Não possui cadastro? Registre-se
                  </Text>
                </TouchableOpacity>
              </Form>

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
  container: {
    alignItems: 'center',
    backgroundColor: '#b2dfdb',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height - 24,
  },
  formBox: {
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    marginRight: 8,
    flexDirection: 'row-reverse',
  },
  loginButton: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#673D9A',
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 24,
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  registerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  textheader: {
    color: '#000',
    fontSize: 50,
    textAlign: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

const mapStateToProps = (state: any) => {
  return {
    navigationState: state.baseRouting,
    showFingerprint: state.ui.showFingerprint,
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
  return  Redux.bindActionCreators(
    {
      resetStackAndGo, login, showMessage, enableAuthWithLocalCredentials,
    },
    dispatch)
}

export default connect<Props, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Login)
