import * as React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Form, Item, Input, Label } from 'native-base'
import { AccessToken, LoginButton } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import { login } from '../actions/AuthActions'
import { IState } from '../reducers/AuthReducer'

const logo = require('../assets/icons/padlock-unlock.png')

interface State {
  email: string,
  password: string,
}

interface Props extends IState {
  login({ auth }: IState): any
}

class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }
  render() {
    return (
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
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
            </Item>
            <Item floatingLabel last>
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
                accesstoken: '',
                baseRouting: {},
              })
              }
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>
                Entrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('teste')}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>
                Não possui cadastro? Registre-se
              </Text>
            </TouchableOpacity>
          </Form>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#4FD7BF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formBox: {
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
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
    marginTop: 100,
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
  }
}

export default connect(null, { login })(Login)
