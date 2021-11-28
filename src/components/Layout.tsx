import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Container, Toolbar } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	return (
		<AppBar position="fixed">
			<Container maxWidth="md">
				<Toolbar disableGutters sx={{ gap: 5 }}>
					<Button component={Link} to="/">
						{t('country_quiz')}
					</Button>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Layout;
