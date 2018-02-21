import * as React from 'react'
import {
  StyleSheet,
} from 'react-native'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'
const LocalAuth = require('react-native-local-auth')
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {  Container, Header, Content, 
  Icon, Fab, List, ListItem,
  Text as NBText, Body, Title, Left, Right } from 'native-base'
import MAIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { saveFingerprintFlag, isFirstLogin, showMessage, logout } from '../actions/UserActions'
import { fetchSites, clearSites, removeSiteByUrl } from '../actions/SiteActions'
import { ISite } from '../reducers/SiteReducer'
import SiteDetailModal from '../components/SiteDetailModal'


const API = Config.API_ENDPOINT

interface State {
  errorMessage: string
  sites: ISite[]
  firstLogin: boolean
  siteDetailVisible: boolean
  selectedSite: ISite,
  selectedSiteIndex: number
}

interface DispatchProps {
  clearSites(): void
  fetchSites(): void
  saveFingerprintFlag():void
  isFirstLogin(): boolean
  showMessage(message: string): void
  logout(): void
  removeSiteByUrl(url:string): void
}

interface StateProps {
  navigation: any
  credentials: ISite[]
  accesstoken: string
  firstLogin: boolean
}

type Props = DispatchProps & StateProps

class Home extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      sites: [],
      errorMessage: '',
      firstLogin: false,
      siteDetailVisible: false,
      selectedSite: { url: '', username: '', password: '' },
      selectedSiteIndex: 0,
    }
  }

  displayItemDetails(site: ISite, index: number) {
    this.setState({
      siteDetailVisible: true,
      selectedSite: site,
      selectedSiteIndex: index,
    })
  }
  closeItemDetails() {
    this.setState({
      siteDetailVisible: false,
    })
  }

  componentDidMount() {
    console.log(' home props ', this.props)
    this.props.fetchSites()
    this.props.isFirstLogin()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.credentials && nextProps.credentials !== this.state.sites) {
        this.setState({
          sites: nextProps.credentials,
        })
      }
      if (nextProps.firstLogin) {
        this.setState({
          firstLogin: true,
        })
      } else {
        this.setState({
          firstLogin: false,
        })
      }
    }
  }
  renderItens() {
    return this.state.sites.map((item: ISite, index: number) => {
      console.log('item aqui ', item)
      console.log('url ', `${API}logo/${item.url}`)
      return (
        <ListItem key={index} onPress={() => this.displayItemDetails(item, index)}>
          {/*<Image
            style={{ height: 80, width: 80 }}
            source={{
              uri: `${API}/logo/${item.url}`,
              headers: {
                Authorization: '56636273-4914-4e20-a047-cd98dc420adf',
              },
              uri: `${API}/logo/${item.url}`,
            }}
          />*/}
          {/*<FastImage
            style={{ height: 80, width: 80 }}
            source={{
              uri: `${API}/logo/${item.url}`,
              headers:{ Authorization: '6ed07fc5-e03e-4c38-b1a7-8a7dd47b4f73' },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />*/}
          <FastImage
            style={{ height: 80, width: 80 }}
            source={{
              uri: 'https://cdn.iconscout.com/public/images/icon/free/png-512/unsplash-logo-32e9733dc2f8de31-512x512.png', // tslint:disable-line
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Body>
            <NBText>{item.username}</NBText>
            <NBText note>{item.url}</NBText>
          </Body>
          <Right>
            <Icon name="trash"
              style={{ fontSize: 26 }} onPress={() => this.props.removeSiteByUrl(item.url)} />
          </Right>
        </ListItem>
      )
    })
  }
  public render() {
    if (this.state.firstLogin) {
      LocalAuth.authenticate({
        reason: 'Para facilitar seu próximo acesso, entre com suas credenciais.',
        falbackToPasscode: true,
        suppressEnterPassword: true,
      })
      .then((success: any) => {
        this.props.saveFingerprintFlag()
      })
      .catch((error: any) => {
        this.props.showMessage('Falha na autenticação...')
      })
    }
    return (
      <Container>
        <Header androidStatusBarColor="#b2dfdb" style={{ backgroundColor:'#673D9A' }}>
          <Left />
          <Body>
            <Title>Meus sites</Title>
          </Body>
          <Right>
            <MAIcon name="logout" color="#fff" size={24} onPress={() => this.props.logout()}/>
          </Right>
        </Header>
        <Content style={styles.content}>
          <List>
            {this.renderItens()}
          </List>
        </Content>
        <SiteDetailModal
          visible={this.state.siteDetailVisible}
          site={this.state.selectedSite}
          closeModal={() => this.closeItemDetails()}
          goToEdit={() => 
            this.props.navigation.navigate('EditSite', {
              index: this.state.selectedSiteIndex, site: this.state.selectedSite })
          }
        />
        <Fab
            active
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#673D9A' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('NewSite')}>
            <Icon name="add" />
          </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    backgroundColor: '#fefefe',
  },
})

const mapStateToProps = (state: any) => {
  return {
    credentials: state.sites.credentials,
    accesstoken: state.auth.accesstoken,
    firstLogin: state.user.isFirstLogin,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return  bindActionCreators(
    {
      clearSites,
      fetchSites,
      isFirstLogin,
      saveFingerprintFlag,
      showMessage,
      logout,
      removeSiteByUrl,
    },
    dispatch)
}

export default connect<Props, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Home)
