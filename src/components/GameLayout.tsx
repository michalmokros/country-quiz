import { Container } from '@mui/material';
import { FC, useState } from 'react';

import { useGame, useRound } from '../hooks/useGame';
import { Game } from '../utils/types';

import EndScreen from './EndScreen';
import NextQuestionOrRoundButton from './NextQuestionOrRoundButton';
import ShowAnswers from './ShowAnswers';
import ShowQuestion from './ShowQuestion';
import ShowScore from './ShowScore';

const GameLayout: FC = () => {
	const [game, setGame] = useGame();
	const round = useRound();

	const alterGame = (newGame: Partial<Game>) =>
		setGame(prevGame => ({ ...prevGame, ...newGame }));

	const [isRight, setIsRight] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);
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
				buttonClicked={buttonClicked}
				setButtonClicked={setButtonClicked}
				guessColor={guessColor}
				setGuessColor={setGuessColor}
			/>
			{buttonClicked ? (
				<NextQuestionOrRoundButton
					isRight={isRight}
					alterGame={alterGame}
					setButtonClicked={setButtonClicked}
					currentQuestion={round.currentQuestion}
					setGuessColor={setGuessColor}
				/>
			) : null}
		</Container>
	);
};

export default GameLayout;
