import { FC, useState, useCallback } from 'react';
import { Container } from '@mui/material';

import { useGame, useRound } from '../hooks/useGame';
import {
	Game,
	Questions,
	Rounds,
	NUMBER_OF_QUESTIONS,
	NUMBER_OF_ROUNDS
} from '../utils/types';

import NextQuestionOrRoundButton from './NextQuestionOrRoundButton';
import ShowScore from './ShowScore';
import ShowQuestion from './ShowQuestion';
import ShowAnswers from './ShowAnswers';

const GameLayout: FC = () => {
	const [game, setGame] = useGame();
	const round = useRound();

	const alterGame = (newGame: Partial<Game>) =>
		setGame(prevGame => ({ ...prevGame, ...newGame }));

	const giveScore = useCallback(() => {
		alterGame({
			score: game.score + round.currentQuestion
		});
	}, [game]);

	const checkAnswer = (countryId: string): boolean => {
		if (countryId === round.country.key) {
			return true;
		}
		return false;
	};

	const setNextQuestionOrRound = useCallback(() => {
		if (round.currentQuestion < NUMBER_OF_QUESTIONS) {
			alterGame({
				rounds: {
					...game.rounds,
					[game.currentRound]: {
						...round,
						currentQuestion: (round.currentQuestion + 1) as Questions
					}
				}
			});
		} else {
			if (game.currentRound < NUMBER_OF_ROUNDS) {
				alterGame({ currentRound: (game.currentRound + 1) as Rounds });
			} else {
				alterGame({ finished: true });
			}
		}
	}, [game]);

	const [buttonClicked, setButtonClicked] = useState(false);
	const [guessColor, setGuessColor] = useState<string[]>([
		'inherit',
		'inherit',
		'inherit',
		'inherit'
	]);

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
			<ShowScore />
			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					pt: 2,
					pb: 2,
					gap: 2,
					border: 'solid',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<ShowQuestion />
			</Container>
			<ShowAnswers
				questionType={round.currentQuestion}
				giveScore={giveScore}
				checkAnswer={checkAnswer}
				buttonClicked={buttonClicked}
				setButtonClicked={setButtonClicked}
				guessColor={guessColor}
				setGuessColor={setGuessColor}
			/>
			{buttonClicked ? (
				<NextQuestionOrRoundButton
					setNextQuestionOrRound={setNextQuestionOrRound}
					setButtonClicked={setButtonClicked}
					currentQuestion={round.currentQuestion}
					setGuessColor={setGuessColor}
				/>
			) : null}
		</Container>
	);
};

export default GameLayout;
