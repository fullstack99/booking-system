/* eslint-disable flowtype/require-valid-file-annotation */

import { create, SheetsRegistry } from 'jss'
import preset from 'jss-preset-default'
import { createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, brown, green, teal, yellow, red } from '@material-ui/core/colors'
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName'

const drawerZindex = 1099

const theme = createMuiTheme({
	drawerWidth: 240,
	typography: {
		htmlFontSize: 18,
	},
	palette: {
		type: 'dark',
		primary: {
			light: teal[300],
			main: teal[500],
			dark: teal[700],
		},
		secondary: {
			light: brown[300],
			main: brown[500],
			dark: brown[700],
		},
		error: {
			main: red['A400'],
		},
		background: {
			default: '#fff',
			paper: '#e3f4f6',
		},
	},
	zIndex: {
		drawer: drawerZindex,
	},
	overrides: {
		MuiAppBar: {
			positionStatic: {
				boxShadow: 'none',
			},
		},
		MuiDrawer: {
			modal: {
				zIndex: drawerZindex,
			}
		},
		MuiCircularProgress: {
			colorPrimary: {
				color: '#fff',
			},
		},
		MuiSvgIcon: {
			colorPrimary: {
				color: green['A400']
			},
			colorDisabled: {
				color: yellow['A400']
			},
		},
		MuiChip: {
			root: {
				backgroundColor: teal[500],
			},
		},
		MuiTooltip: {
			tooltip: {
				backgroundColor: teal[500],
			}
		},
		MuiTable: {
			root: {
				borderCollapse: 'separate',
			}
		},
		MuiTableRow: {
			hover: {
				'&:hover': {
					backgroundColor: 'rgba(255, 255, 255, .05)',
				},
			},
		},
		MuiTableCell: {
			root: {
				borderBottomColor: 'rgba(255, 255, 255, .12)',
			},
		},
		TableDetailCell: {
			active: {
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
			},
		},
		MuiCheckbox: {
			checkedSecondary: {
				color: '#fff',
			},
		},
		MuiRadio: {
			checkedSecondary: {
				color: '#fff',
			},
		},
	},
})

// Configure JSS
const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName

export const sheetsManager = new Map()

export default function createContext() {
	console.log('THEME', theme)
	return {
		jss,
		theme,
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager,
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
	}
}
