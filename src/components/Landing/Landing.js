
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Input,
  Grid,
  Header,
  Icon,
  Image,
  Checkbox,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  TextArea,
  Card,
  Form,
  Modal
} from 'semantic-ui-react'
import './landing.css'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const axios = require('axios');

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
const games = [
  { name: "Rainbow 6 Siege", image: process.env.PUBLIC_URL + "/img/landing/rainbow6.svg", active: true },
  { name: "CS:GO", image: process.env.PUBLIC_URL + "/img/landing/csgo.svg", active: false },
  { name: "Overwatch", image: process.env.PUBLIC_URL + "/img/landing/overwatch.svg", active: false },
  { name: "League of Legends", image: process.env.PUBLIC_URL + "/img/landing/league.svg", active: false },
  { name: "Dota 2", image: process.env.PUBLIC_URL + "/img/landing/dota2.svg", active: false },
]
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const DesktopHeading = () => (
  <Container className='landing-header-content' textAlign='right' >
    <img src={process.env.PUBLIC_URL + "/img/buck_r6s.png"} className='operator' />
    <div className='pattern' />
    <Header
      as='h2'
      content='Introducing the new way to find scrims.'
      inverted
      style={{
        fontSize: '2em',
        marginBottom: 0,
        marginTop: '2em',
      }}
    />
    <Header
      as='h2'
      content='Fast, easy, and reliable.'
      inverted
      style={{
        color: 'var(--theme-primary-complement)',
        fontSize: '2em',
        marginBottom: 0,
        marginTop: '0rem'
      }}
    />
    <Header
      as='h4'
      content='Now running in select games.'
      inverted
      style={{
        fontSize: '1.2rem',
        textAlign: 'center',
        marginTop: '2rem !important'
      }}
    />
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="games-list">
          {games.map((item, i) => <Image className={item.active ? 'active' : ''} key={i} width='50' src={item.image} alt={item.name}></Image>)}
        </div></div>
    </div>
  </Container>
)

const MobileHeading = () => (
  <div className='landing-header-content mobile' textalign='right'>
    <img src={process.env.PUBLIC_URL + "/img/buck_r6s.png"} alt="R6S Buck" className='operator' />
    <div className='pattern' />
    <div className='header-content mobile'>
      <Header
        as='h2'
        inverted
        style={{
          fontSize: '1.5em',
          marginBottom: 0,
          marginRight: '1em',
          marginTop: '2em',
        }}
      >Introducing the new way <br /> to find scrims.</Header>
      <Header
        as='h2'
        content='Fast, easy, and reliable.'
        inverted
        style={{
          color: 'var(--theme-primary-complement)',
          fontSize: '1.5em',
          marginRight: '1em',
          marginBottom: 0,
          marginTop: '0rem'
        }}
      />
      <Header
        as='h4'
        content='Now running in select games.'
        inverted
        style={{
          marginRight: '1em'
        }}
      />
    </div>
    <div className="games-list">
      {games.map((item, i) => <Image className={item.active ? 'active' : ''} width='40' key={i} src={item.image} alt={item.name}></Image>)}
    </div>
  </div>
)

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <div className='landing-header'>
            <Menu
              //fixed={fixed ? 'top' : null}
              inverted
              pointing
              secondary
              size='large'
              className='landing-menu'
            >
              <Menu.Header as='h1' className='site-logo'>
                lfs.gg
                </Menu.Header>

              <Menu.Menu position='right'>
                <Menu.Item as={AnchorLink} href="#how-it-works" position='right'>
                  How it works
                </Menu.Item>
                <Menu.Item as={AnchorLink} href="#features-container" position='right'>
                  Features
                  </Menu.Item>
                <Menu.Item as={AnchorLink} href="#subscribe" position='right'>
                  Subscribe
                  </Menu.Item>
                <Menu.Item as={AnchorLink} href="#contact" position='right'>
                  Contact
                  </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' style={{ marginLeft: '0.5em' }} className="beta-access-button"
                    onClick={this.props.handleOpen}>
                    Beta Access
                    </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </div>
          <DesktopHeading />
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          direction='top'
          onHide={this.handleSidebarHide}
          className='mobile-dropdown-menu'
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={AnchorLink} href="#how-it-works" >How it works</Menu.Item>
          <Menu.Item as={AnchorLink} href="#features-container" >Features</Menu.Item>
          <Menu.Item as={AnchorLink} href="#subscribe" >Subscribe</Menu.Item>
          <Menu.Item as={AnchorLink} href="#contact">Contact</Menu.Item>
          <Menu.Item onClick={this.props.handleOpen}>Beta Access</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Menu inverted pointing secondary size='large' className='landing-menu mobile'>
            <Menu.Header as='h1' className='site-logo mobile'>
              lfs.gg
              </Menu.Header>
            <Menu.Item onClick={this.handleToggle} position='right'>
              <Icon name='sidebar' />
            </Menu.Item>
          </Menu>
        </Sidebar.Pusher>
        <MobileHeading />
        <div className='mobile-cover-block' />
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = (props) => {
  return (
    <div className="landing-header-container">
      <DesktopContainer {...props} />
      <MobileContainer {...props} />
    </div>
  )
}

class BetaForm extends Component {
  endpoint = 'https://690al4b3v2.execute-api.us-east-1.amazonaws.com/landing/beta_request/'
  state = {
    submitted: false,
    entity_type: "Team",
    mail_register: false,
  }
  handleRadio = (e, { value }) => this.setState({ entity_type: value })

  handleChange = (event) => {
    const target = event.target, value = target.type ===
      'checkbox' ? target.checked : target.value,
      name = target.name

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, entity_type, entity_name, request_notes, mail_register } = this.state;

    axios({
      url: this.endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        name: name,
        email: email,
        entity_type: entity_type,
        entity_name: entity_name,
        request_notes: request_notes,
        mail_register: mail_register
      })
    }).then(response => {
      if (response.data.statusCode === 200) {
        this.setState({ submitted: true });
      }
    })
  }
  render() {
    const { entity_type, submitted } = this.state;
    if (submitted) {
      return (
        <Header as='h3'>Thanks for Requesting Beta Access!
        <Header.Subheader>We will contact you in the near future to confirm these details.</Header.Subheader></Header>
      )
    } else
      return (
        <Container>
          <div id="beta-access">
            <Header as='h1' className='title-header'>
              Request Beta Access
            <Header.Subheader style={{ marginBottom: '2rem' }}>Leave us a message and we'll get back to you as soon as possible.</Header.Subheader>
            </Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <input required type="text" name="name" placeholder="Name" onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <input required name="email" placeholder="Email Address" type="email" onChange={this.handleChange} />
              </Form.Field>
              <Form.Group inline>
                <label>I am a: </label>
                <Form.Radio
                  label={<label className="radio-label"><b>Team</b> Owner/Manager</label>}
                  value='Team'
                  name="entity_type"
                  checked={entity_type === 'Team'}
                  onChange={this.handleRadio}
                />
                <Form.Radio
                  label={<label className="radio-label"><b>League</b> Owner/Manager</label>}
                  value='League'
                  name="entity_type"
                  checked={entity_type === 'League'}
                  onChange={this.handleRadio}
                />
              </Form.Group>
              <Form.Field>
                <input required onChange={this.handleChange} type="text" placeholder={entity_type + " Name"} name="entity_name" />
              </Form.Field>
              <Form.Field
                onChange={this.handleChange}
                name='request_notes'
                control={TextArea}
                placeholder='Reason for Signup'
              />
              <Form.Field
                onChange={this.handleChange}
                name="mail_register"
                control={Checkbox}
                label={<label className="register-label">I Would like to Register for Updates</label>}
              />
              <Button type="submit" value="Submit" className="cta-button">Request</Button>
            </Form>

          </div>
        </Container>
      )
  }
}

const features = [
  [
    {
      title: "Twitter Card Integration",
      icon: "twitter",
      content: "Automatically generate a twitter card preview when you tweet your schedule link. This schedule can either be all your teams open scrims, or a selected set of scrims. Once a time slot is changed, the photo preview will update automatically.",
      open: 'twitterOpen'
    },
    {
      title: "Team Filtering Control",
      icon: "privacy",
      content: "Using team control filters like League Preference, Whitelists, Blacklists, and recommended teams, you can control who you scrim against as well as find new teams who would match up well.",
      open: 'filteringOpen'
    },
    {
      title: "Scrim Analysis",
      icon: "chart bar",
      content: "Add attachments, notes, and vod links to your scrim to save information for later strat use. Search for scrims versus specific teams or on maps to analyse how you perform.",
      open: 'scrimOpen'
    }
  ],
  [
    {
      title: "Google Calendar Integration",
      icon: "calendar check",
      content: "Have a problem with players not remembering scrims? lfs can automatically invite players to a Google Calendar event to remind them of upcoming scrims to keep a consistent schedule.",
      open: "calendarOpen"
    },
    {
      title: "Discord Bot Integration",
      icon: "discord",
      content: "Players don’t use their calendar? Not a problem, with an lfs bot added to your Discord server, it can send out pings to players to remind them of upcoming scrims.",
      open: "discordOpen"
    },
    {
      title: "League Administration",
      icon: "trophy",
      content: "Do you run a League? To help those teams get better and more familiar, teams can register with the league and scrim other teams.",
      open: "leagueOpen"
    }
  ]
]
class HomepageLayout extends Component {
  state = {
    open: false,
    twitterOpen: false,
    filteringOpen: false,
    scrimOpen: false,
    calendarOpen: false,
    discordOpen: false,
    leagueOpen: false
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  toggleFeature = (feature) => this.setState({[feature]: !this.state[feature] });

  renderFeatures = () => {
    return features.map((item, i) => {
      return (
        <Grid.Row key={"row-"+i}>
          {item.map((feature, j) => {
            return (
              <Grid.Column>
                <Card key={"col-"+i+"-"+j} className={this.state[feature.open] ? 'active' : ''} onClick={this.toggleFeature.bind(this, feature.open)}>
                  <div className="card-control">
                    <Icon name={'caret left'} />
                  </div>
                  <Icon name={feature.icon} size='huge' style={{ textAlign: 'center' }} textalign='center' />
                  <Header as='h3' textAlign='center'>{feature.title}</Header>
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    {feature.content}
                  </div>
                </Card>
              </Grid.Column>
            )
          })}
        </Grid.Row>
      )
    })
  }
  render() {
    const { twitterOpen } = this.state;
    return (
      <div className="landing">
        <ResponsiveContainer open={this.state.open} handleOpen={this.handleOpen} handleClose={this.handleClose} />
        <Container style={{ marginBottom: '15em', marginTop: '4rem' }} id="how-it-works">
          <Header as='h1' textAlign='center' className='landing-h1' style={{ marginBottom: '3rem !important' }}>
            How it Works
      </Header>
          <Grid columns='equal' stackable className="how-it-works-grid">
            <Grid.Row>
              <Grid.Column>
                <Header as='h3'>
                  <Image src={process.env.PUBLIC_URL + "/img/bcast.svg"} />
                  Broadcast your scrims
                <Header.Subheader>Display & broadcast your up-to-date availability on Twitter</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3'>
                  <Image src={process.env.PUBLIC_URL + "/img/search.svg"} />
                  Find & receive scrims
                <Header.Subheader>Find & receive scrims in your own leagues</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as='h3'>
                  <Image src={process.env.PUBLIC_URL + "/img/people.svg"} />
                  Create teams & leagues
                <Header.Subheader>Find & create your own teams & leagues</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3'>
                  <Image src={process.env.PUBLIC_URL + "/img/calendar.svg"} className='calendar' style={{ width: '40px !important' }} />
                  Stay organized
              <Header.Subheader>View your calendar to stay up-to-date with upcoming scrims</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <div id="features-container">
          <Container>
            <div className="pattern" />
            <Header as='h1' content='Features' textAlign='center' />
            <Grid columns='3' stackable>
              {this.renderFeatures()}
          </Grid>
            <div className='cta'>
              <Button className="cta-button" onClick={this.handleOpen}>Request Beta Access</Button>
            </div>
          </Container>
        </div>
        <Container text id="subscribe">
          <Grid columns='2' stackable>
            <Grid.Row>
              <Grid.Column width={10}>

                <Header as='h1' className='title-header' style={{ marginTop: '3rem', marginBottom: '2rem' }}>Register for updates</Header>
                <p className="sub header">Subscribe to our email newsletter to get updates on the development and releases of lfs.gg. We will only be sending out emails to inform you of new features, new games, and important updates.</p>
                <Form action="https://gmail.us5.list-manage.com/subscribe/post?u=176fc35dae2851698ac0b358d&amp;id=a4898f5b07" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                  <Input action style={{ width: '70%' }} className='register-input'>
                    <input placeholder='Email Address' type='email' name="EMAIL" required />
                    <Button type="submit" value="Subscribe" name="subscribe" className='register-button' content='Register' />
                  </Input>
                </Form>

                <p style={{ fontSize: '0.6rem', marginTop: '0.5rem', marginBottom: '4rem' }}><b>*Feel free to unsubscribe at any time if you no longer want to receive updates about this product.</b></p>
              </Grid.Column>
              <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Image className='vigil' src={process.env.PUBLIC_URL + "/img/landing/vigil.png"} />
              </Responsive>
            </Grid.Row>
          </Grid>
        </Container>
        <div id="contact">
          <Modal open={this.state.open} onClose={this.handleClose} closeIcon>
            <BetaForm />
          </Modal>
          <Container style={{ paddingTop: '3rem', height: '100%' }}>
            <div className="pattern" />
            <Header as='h1' content='Contact & Beta Access' textAlign='center' style={{ color: 'white' }} />
            <Container>
              <Grid columns="2" stackable className="contact-grid">
                <Grid.Row>
                  <Grid.Column className="message" textAlign="center">
                    <Container style={{ marginBottom: '1rem' }}>
                      <Header as='h2' content="Message Us" style={{ color: 'var(--theme-primary-color)', marginTop: '2rem' }} />
                      <p>Feel free to send us a message if you have any questions, concerns, or suggestions!</p>
                      <div className="buttons-block">
                        <Button className="contact-button" onClick={()=> window.location.href='mailto:info@lfs.gg'}><Icon name='mail' /> Email</Button>
                        <Button className="contact-button" onClick={() => document.getElementById("twitterId").click()}><Icon name='twitter' /> Twitter</Button>
                      </div>
                      <p style={{ marginTop: '1rem' }}>Or send us an email manually at <b style={{ color: 'var(--theme-primary-complement)' }}>info@lfs.gg</b></p>
                      <a id="twitterId" style={{visibility: 'hidden'}} href="https://twitter.com/messages/compose?recipient_id=1185550472469463041" target="_blank">Twitter url</a>
                    </Container>
                  </Grid.Column>
                  <Grid.Column className="request-beta" textAlign="center">
                    <Container>
                      <Header as='h2' content='Request Beta Access' style={{ color: 'white', marginTop: '2rem' }} />
                      <p>Sign up for lfs.gg Beta Access and be the first to try out the platform. You will receive an email in the near future about next steps!</p>
                      <Button className="beta-button" onClick={this.handleOpen} >Request Beta</Button>
                    </Container>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Container>
        </div>
        <div id="footer">
          <Container className="menu-container">
            <Menu inverted secondary className="footer-menu" stackable>
              <Menu.Item as={AnchorLink} href="#how-it-works" position='right'>
                How it works
          </Menu.Item>
              <Menu.Item as={AnchorLink} href="#features-container" position='right'>
                Features
            </Menu.Item>
              <Menu.Item as={AnchorLink} href="#subscribe" position='right'>
                Subscribe
            </Menu.Item>
              <Menu.Item as={AnchorLink} href="#contact" position='right'>
                Contact
          </Menu.Item>
              <Menu.Item className="footer-menu-button">
                <Button as='a' className="beta-access-button" onClick={this.handleOpen}>
                  Beta Access
              </Button>
              </Menu.Item>
            </Menu>
          </Container>
          <div className="bottom-footer-container">
            <div className="footer-icons">
              <a href="mailto:info@lfs.gg"><Icon size='large' name='mail' /></a>
              <a href="https://twitter.com/messages/compose?recipient_id=1185550472469463041" rel="noopener noreferrer" target="_blank"><Icon size='large' name='twitter' /></a>
              <a href="https://discord.gg/hk8avdN" rel="noopener noreferrer" target="_blank"><Icon size='large' name='discord' /></a>
            </div>
            <div className="footer-logo">
              <p>lfs.gg</p>
            </div>
            <div className="footer-signoff">
              © Greg & William
        </div>
          </div>
        </div>
      </div>
    )
  }
}
export default HomepageLayout