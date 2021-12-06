import { Container } from '@mui/material';
import { FC, useState } from 'react';

import { useGame } from '../hooks/useGame';
import { Game } from '../utils/types';

import EndScreen from './EndScreen';
import NextButton from './NextButton';
import ShowAnswers from './ShowAnswers';
import ShowQuestion from './ShowQuestion';
import ShowScore from './ShowScore';

const GameLayout: FC = () => {
	const [game, setGame] = useGame();

	const alterGame = (newGame: Partial<Game>) =>
		setGame(prevGame => ({ ...prevGame, ...newGame }));

	const [isRight, setIsRight] = useState(false);
	const [guessColor, setGuessColor] = useState<string[]>([
		'inherit',
		'inherit',
		'inherit',
		'inherit'
	]);

	return game.finished ? (
		<EndScreen />
	) : (
		<Container
			maxWidth="md"
			component="main"
			color="primary"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: 1,
				pt: 5
			}}
		>
			<ShowScore />
			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					gap: 1,
					border: 'solid',
					flexDirection: 'column',
					alignItems: 'center',
					height: '80%',
					width: '80%'
				}}
			>
				<ShowQuestion />
			</Container>
			<ShowAnswers
				setIsRight={setIsRight}
				alterGame={alterGame}
				guessColor={guessColor}
				setGuessColor={setGuessColor}
			/>
			{game.isQuestionAnswered ? (
				<NextButton
					isRight={isRight}
					alterGame={alterGame}
					setGuessColor={setGuessColor}
				/>
			) : null}
		</Container>
	);
};

export default GameLayout;
