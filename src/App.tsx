import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { LanguageProvider } from './hooks/useTranslation';
import theme from './utils/theme';
import { Layout, Paths } from './components';

const App = () => (
	<LanguageProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<Paths />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	</LanguageProvider>
);

export default App;
