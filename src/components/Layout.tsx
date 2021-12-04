import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

import LanguageSwitch from './LanguageSwitch';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	const user = useLoggedInUser();
	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="md">
					<Toolbar disableGutters sx={{ gap: 5 }}>
						<Button color="primary" component={Link} to="/play">
							{t('play')}
						</Button>
						<Button color="primary" component={Link} to="/scoreboard">
							{t('scoreboard')}
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						<Button
							component={Link}
							to="/"
							variant="outlined"
							size="large"
							sx={{ my: 'auto' }}
						>
							{t('country_quiz')}
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						{!user ? (
							<Button color="primary" component={Link} to="/login">
								{t('login')}
							</Button>
						) : (
							<Button color="primary" onClick={signOut}>
								{t('logout')}
							</Button>
						)}
						<LanguageSwitch />
					</Toolbar>
				</Container>
			</AppBar>
			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					height: '100vh',
					pt: 8,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};

export default Layout;
