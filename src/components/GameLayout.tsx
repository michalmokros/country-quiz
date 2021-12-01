import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { FC } from 'react';

import useGame from '../hooks/useGame';

const GameLayout: FC = () => {
	const a = '';
	const { score, text, question } = useGame();

	return (
		<>
			<Container
				maxWidth="md"
				component="main"
				color="primary"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '10vh',
					pb: 1,
					gap: 4,
					border: 'solid',
					borderRadius: '30%'
				}}
			>
				<Typography variant="h3" sx={{ p: 2 }}>
					Your score is {score.score}/{score.maxScore}
				</Typography>
			</Container>

			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					height: '50vh',
					pt: 2,
					pb: 2,
					gap: 2,
					border: 'solid'
				}}
			>
				<Typography variant="h2"> {text} </Typography>
				{question === 'flag' ? <Typography> Tu je obrazok</Typography> : null}
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
