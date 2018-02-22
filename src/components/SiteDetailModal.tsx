import * as React from 'react'
import { Clipboard, Text, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { Toast, Card, CardItem, Form, Item, Label, Input, Icon, Button, Body } from 'native-base'
import { ISite } from '../reducers/SiteReducer'

interface State {
  message: string
  showPassword: boolean
}

interface OwnProps {
  visible: boolean
  site: ISite
  closeModal(): void
  goToEdit(): void
}

class SiteDetailModal extends React.Component<OwnProps, State> {
  constructor(props: OwnProps) {
    super(props)
    this.state = {
      message: '',
      showPassword: true,
    }
    this.showToast = this.showToast.bind(this)
  }
  showToast(message: string) {
    Toast.show({
      text: message,
      position: 'bottom',
      buttonText: 'Ok',
      duration: 4000,
    })
  }
  public render() {
    return (
      <Modal
        isVisible={this.props.visible}
        onBackdropPress={() => this.props.closeModal()}
      >
        <View style={{ height: 350 }}>
          <Card>
            <CardItem>
              <Form style={styles.form}>
                <Item floatingLabel style={styles.inputItem}>
                  <Label>URL</Label>
                  <Input
                    value={this.props.site.url}
                    editable={false}
                    disabled
                  />
                  <Icon
                    name="clipboard"
                    onPress={() => {
                      Clipboard.setString(this.props.site.url)
                      this.showToast('Link copiado para o clipboard.')
                    }}
                  />
                </Item>
                <Item floatingLabel style={styles.inputItem}>
                  <Label>Usuário</Label>
                  <Input
                    value={this.props.site.username}
                    editable={false}
                    disabled
                  />
                </Item>
                <Item floatingLabel style={styles.inputItem}>
                  <Label>Senha</Label>
                  <Input
                    value={this.props.site.password}
                    secureTextEntry={this.state.showPassword}
                    editable={false}
                    disabled
                  />
                  <Icon
                    name="eye"
                    onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                  />
                </Item>
              </Form>
            </CardItem>
            <CardItem>
              <Body>
                <Button block light onPress={() => {
                  this.props.closeModal()
                  this.props.goToEdit()
                }}
                
                >
                  <Text>EDITAR</Text>
                </Button>
                <Button
                  style={{ marginTop: 12 }} block light onPress={() => this.props.closeModal()}>
                  <Text>FECHAR</Text>
                </Button>
                
              </Body>
              
            </CardItem>
          </Card>
        </View>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  formBox: {
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
  },
  cardContainer: {
    height: 170,
    display: 'flex',
    flexDirection: 'column',
  },
  inputItem: {
    flexDirection: 'row-reverse',
  },
})


export default SiteDetailModal
