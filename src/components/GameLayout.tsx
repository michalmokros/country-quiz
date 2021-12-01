import { FC } from 'react';
import { QuestionAnswer } from '@mui/icons-material';
import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

import useGame from '../hooks/useGame';

const GameLayout: FC = () => {
	const a = '';
	const { score, text, question, answers, onButtonClick } = useGame();

	return (
		<Container
			maxWidth="md"
			component="main"
			color="primary"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: 2,
				pt: 5
			}}
		>
			<Container
				maxWidth="md"
				component="main"
				color="primary"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
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
					pt: 2,
					pb: 2,
					gap: 2,
					border: 'solid'
				}}
			>
				{/* <Container
					maxWidth="md"
					component="main"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Typography variant="h3"> {text} </Typography>
				</Container> */}
				<Container
					maxWidth="md"
					component="main"
					sx={{
						display: 'flex'
					}}
				>
					{question === 'flag' ? (
						<ReactCountryFlag
							countryCode="US"
							svg
							style={{
								display: 'flex-grow',
								width: '100%',
								height: '100%'
							}}
						/>
					) : null}
				</Container>
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
						<Button
							id={answers[0].short_name}
							fullWidth
							sx={{ border: 'solid', height: '100%' }}
						>
							{answers[0].long_name}
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							id={answers[1].short_name}
							fullWidth
							sx={{ border: 'solid', height: '100%' }}
						>
							{answers[1].long_name}
						</Button>{' '}
					</Grid>
					<Grid item xs={6}>
						<Button
							id={answers[2].short_name}
							fullWidth
							sx={{ border: 'solid', height: '100%' }}
						>
							{answers[2].long_name}
						</Button>{' '}
					</Grid>
					<Grid item xs={6}>
						<Button
							id={answers[3].short_name}
							fullWidth
							sx={{ border: 'solid', height: '100%' }}
						>
							{answers[3].long_name}
						</Button>{' '}
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
};

export default GameLayout;
