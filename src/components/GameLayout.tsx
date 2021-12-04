import { FC, useState, useCallback } from 'react';
import { Container } from '@mui/material';

import { useGame, useQuestion, useRound } from '../hooks/useGame';
import {
	Game,
	Questions,
	Rounds,
	Country,
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
	const question = useQuestion();

	const alterGame = (newGame: Partial<Game>) =>
		setGame(prevGame => ({ ...prevGame, ...newGame }));

	const checkAnswer = useCallback(
		(answer: Country) => {
			if (answer === round.country) {
				alterGame({
					score: game.score + round.currentQuestion
				});
				return true;
			}
			return false;
		},
		[game]
	);

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

	const [buttonFlag, setButtonFlag] = useState('');

	const handleAnswerClick = (event: React.MouseEvent<HTMLElement>) => {
		if ((event.target as HTMLInputElement).id === round.country.short_name)
			setButtonFlag(round.country.short_name);
	};

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
			<ShowScore score={game.score} />
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
				question={question}
				buttonFlag={buttonFlag}
				handleAnswerClick={handleAnswerClick}
			/>
			{buttonFlag !== '' ? (
				<NextQuestionOrRoundButton
					setNextQuestionOrRound={setNextQuestionOrRound}
					setButtonFlag={setButtonFlag}
					currentQuestion={round.currentQuestion}
				/>
			) : null}
		</Container>
	);
};

export default GameLayout;
