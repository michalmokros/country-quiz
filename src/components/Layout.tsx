import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';
import { useGame } from '../hooks/useGame';

import LanguageSwitch from './LanguageSwitch';
import RestartButton from './RestartButton';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	const user = useLoggedInUser();
	const loc = useLocation();
	const [game] = useGame();

	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="md">
					<Toolbar disableGutters sx={{ gap: 5 }}>
						{loc.pathname === '/play' ? (
							<RestartButton />
						) : game.started ? (
							<Button color="primary" component={Link} to="/play">
								{t('back_to_game')}
							</Button>
						) : (
							<Button color="primary" component={Link} to="/play">
								{t('play')}
							</Button>
						)}

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
