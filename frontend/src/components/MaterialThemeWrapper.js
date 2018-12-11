/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import wrapDisplayName from 'recompose/wrapDisplayName'
import createContext from '../styles/createContext'

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      height: '100%',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      height: '100%',
      fontFamily: 'Raleway',
      fontWeight: 600,
      margin: 0,
    },
    h1: { fontFamily: 'Raleway' },
    h3: { fontFamily: 'Raleway' },
    p: { fontfamily: 'Raleway' },
    blockquote: { fontFamily: 'Raleway' },
    input: {
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
        transition: 'background-color 5000s ease-in-out 0s',
        WebkitTextFillColor: '#fff !important',
        fontFamily: 'Raleway'
      }
    }
  },
})

let AppWrapper = props => props.children

AppWrapper = withStyles(styles)(AppWrapper)

const context = createContext()

function MaterialThemeWrapper(BaseComponent) {
  class Root extends Component {
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }
    render() {
      return (
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
            <AppWrapper>
              <CssBaseline />
              <BaseComponent {...this.props} />
            </AppWrapper>
          </MuiThemeProvider>
        </JssProvider>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    Root.displayName = wrapDisplayName(BaseComponent, 'MaterialThemeWrapper')
  }

  return Root
}

export default MaterialThemeWrapper
