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
import EndScreen from './EndScreen';

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

	const checkAnswer = (answer: string | number): boolean => {
		if (typeof answer === 'number') return checkPopulationAnsver(answer);
		else return checkOptionAnswer(answer);
	};

	const checkOptionAnswer = (countryId: string): boolean => {
		console.log('Correct country');
		console.log(round.country.name);
		console.log('countryId');
		console.log(countryId);

		if (countryId === round.country.key) {
			return true;
		}
		return false;
	};

	const checkPopulationAnsver = (answer: number): boolean => {
		console.log('Correct answer');
		console.log(round.country.population);
		console.log('answer');
		console.log(answer);
		console.log('round.options[3].upper');
		console.log(round.options[3].upper);
		console.log('round.options[3].lower');
		console.log(round.options[3].lower);

		if (answer <= round.options[3].upper && answer >= round.options[3].lower) {
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
