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
import { Container, Form, Icon, Item, Input, Label } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { userRegister } from '../actions/UserActions'
import { IUser } from '../reducers/UserReducer'

const LOGO = require('../assets/icons/padlock.png')


const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // tslint:disable-line
const PASSWORD_REG = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

interface State {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
  passwordError: boolean
  passwordConfirmError: boolean
  emailError: boolean
}

interface DispatchProps {
  userRegister(user: IUser): any
}

interface StateProps {
  navigation: any
}

type Props = DispatchProps & StateProps

class UserRegister extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      passwordError: false,
      passwordConfirmError: false,
      emailError: false,
    }
  }
  validatePassword(password:string) {
    return this.setState({ passwordError:  !PASSWORD_REG.test(password) })
  }
  validateEmail(email: string) {
    return this.setState({ emailError:  !EMAIL_REG.test(email) })
  }
  confirmPassword() {
    if (this.state.password !== this.state.passwordConfirm) {
      return this.setState({ passwordConfirmError: true })
    }
    return this.setState({ passwordConfirmError: false })
  }
  renderErrorButton() {
    if (this.state.passwordError) {
      return (
        <Icon
          name="close-circle"
          style={{ color: 'red' }}
          onPress={() => alert('teste')}
        />
      )
    }
    return null
  }

  renderConfirmButton() {
    if (this.state.passwordConfirmError) {
      return (
        <Icon
          name="close-circle"
          style={{ color: 'red' }}
          onPress={() => alert('As senhas diferem')}
        />
      )
    }
    return null
  }

  renderEmailErrorButton() {
    if (this.state.emailError) {
      return (
        <Icon
          name="close-circle"
          style={{ color: 'red' }}
          onPress={() => alert('Email invalido')}
        />
      )
    }
    return null
  }

  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
              {/*<View style={styles.top}>
                <View style={styles.logoContainer}>
                  <Image
                    source={LOGO}
                    style={styles.logo}
                  />
                </View>
              </View>*/}
              <Text style={styles.titleText}>
                  Novo Usuário
                </Text>
              <View style={styles.formBox}>
                <Form style={styles.form}>
                  <Item floatingLabel style={styles.input}>
                    <Label>Nome</Label>
                    <Input
                      value={this.state.name}
                      onChangeText={text => this.setState({ name: text })}
                    />
                  </Item>
                  <Item floatingLabel style={styles.input}>
                    <Label>Email</Label>
                    <Input
                      value={this.state.email}
                      onChangeText={text => this.setState({ email: text }, () => {
                        this.validateEmail(text)
                      })}
                    />
                    {this.renderEmailErrorButton()}
                  </Item>
                  <Item floatingLabel error={this.state.passwordError} style={styles.input}>
                    <Label>Senha</Label>
                    <Input
                      value={this.state.password}
                      secureTextEntry
                      onChangeText={text => this.setState({ password: text }, () => {
                        this.validatePassword(text)
                      })}
                    />
                    {this.renderErrorButton()}
                  </Item>
                  <Item floatingLabel style={styles.input}>
                    <Label>Confirmar senha</Label>
                    <Input
                      value={this.state.passwordConfirm}
                      secureTextEntry
                      onChangeText={text => this.setState({ passwordConfirm: text }, () => {
                        this.confirmPassword()
                      })}
                    />
                    {this.renderConfirmButton()}
                  </Item>
                </Form>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.userRegister({
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password,
                    })
                    }
                    style={styles.registerButton}
                    disabled={
                      this.state.emailError
                      || this.state.passwordError
                      || this.state.passwordConfirmError
                    }
                    activeOpacity={(this.state.emailError
                      || this.state.passwordError
                      || this.state.passwordConfirmError) ? 0.7 : 1}
                  >
                    <Text style={styles.registerButtonText}>
                      Cadastrar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>
                      Já possui cadastro? Faça seu login
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
    marginTop: 100,
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
    fontSize: 36,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  top: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
  return  Redux.bindActionCreators({ userRegister }, dispatch)
}

export default connect<Props, DispatchProps, any>(null, mapDispatchToProps)(UserRegister)
