import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

const GameLayout = () => {
	const a = '';
	return (
		<>
			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					height: '50vh',
					pt: 10,
					pb: 2,
					gap: 2
				}}
			>
				<Box sx={{ border: 'solid', width: '100%', height: '100%' }} />
			</Container>
			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					height: '20vh',
					pb: 10,
					gap: 1
				}}
			>
				<Grid container spacing={2} display="flex" alignItems="stretch">
					<Grid item xs={6}>
						<Button fullWidth sx={{ border: 'solid', height: '100%' }}>
							xs=6
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button fullWidth sx={{ border: 'solid', height: '100%' }}>
							xs=6
						</Button>{' '}
					</Grid>
					<Grid item xs={6}>
						<Button fullWidth sx={{ border: 'solid', height: '100%' }}>
							xs=6
						</Button>{' '}
					</Grid>
					<Grid item xs={6}>
						<Button fullWidth sx={{ border: 'solid', height: '100%' }}>
							xs=6
						</Button>{' '}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default GameLayout;
