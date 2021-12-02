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

import { useGame, useQuestion, useRound } from '../hooks/useGame';

const GameLayout: FC = () => {
	const a = '';
	const [game] = useGame();
	const [round] = useRound();
	const [question] = useQuestion();

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
					Your score is {game.score}/{30}
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
					{round.currentQuestion === 1 ? (
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
					{question.map((answer, i) => (
						<Grid item xs={6} key={i}>
							<Button
								id={answer.short_name}
								fullWidth
								sx={{ border: 'solid', height: '100%' }}
							>
								{answer.long_name}
							</Button>
						</Grid>
					))}
				</Grid>
			</Container>
		</Container>
	);
};

export default GameLayout;
