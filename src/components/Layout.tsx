import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	const user = useLoggedInUser();
	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="md">
					<Toolbar disableGutters sx={{ gap: 5 }}>
						<Button component={Link} to="/">
							{t('country_quiz')}
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						{!user ? (
							<Button color="secondary" component={Link} to="/login">
								{t('login')}
							</Button>
						) : (
							<Button color="secondary" onClick={signOut}>
								{t('logout')}
							</Button>
						)}
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
