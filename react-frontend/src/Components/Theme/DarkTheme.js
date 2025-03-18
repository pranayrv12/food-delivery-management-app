import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		black: {
			main: '#242B2E',
		},
		primary: {
			main: '#CB202D',
		},
		secondary: {
			main: '#5A20CB',
		},
		textColor: {
			main: '#111111',
		},
		background: {
			main: '#0D0D0D',
			paper: '#0D0D0D',
			default: '#0D0D0D',
		},
	},
})

export default darkTheme
