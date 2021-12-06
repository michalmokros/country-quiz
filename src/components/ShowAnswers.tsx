import { Container, Grid } from '@mui/material';
import { FC, useCallback } from 'react';

import { useGame, useQuestion, useRound } from '../hooks/useGame';
import { CountryAnswer, Game } from '../utils/types';

import ButtonAnswer from './Answers/ButtonAnswer';
import PopulationAnswer from './Answers/PopulationAnswer';

type Props = {
	setIsRight: (newIsRight: boolean) => void;
	alterGame: (newGame: Partial<Game>) => void;
	guessColor: string[];
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
};

const ShowAnswers: FC<Props> = ({
	setIsRight,
	alterGame,
	guessColor,
	setGuessColor
}: Props) => {
	const [game] = useGame();
	const round = useRound();
	const question = useQuestion();

	const giveScore = useCallback(() => {
		alterGame({
			score: game.score + round.currentQuestion
		});
	}, [game]);

	const checkAnswer = useCallback(
		(answer: string | number): boolean => {
			if (typeof answer === 'number') {
				if (
					answer <= round.options[3].upper &&
					answer >= round.options[3].lower
				) {
					return true;
				}
				return false;
			}
			if (answer === round.country.key) {
				return true;
			}
			return false;
		},
		[round]
	);

	return (
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
			<Grid container spacing={2}>
				{round.currentQuestion === 3 ? (
					<PopulationAnswer
						giveScore={giveScore}
						checkAnswer={checkAnswer}
						alterGame={alterGame}
						guessColor={guessColor}
						setGuessColor={setGuessColor}
					/>
				) : (
					(question as CountryAnswer).countries.map((answer, i) => (
						<Grid item xs={6} key={i}>
							<ButtonAnswer
								giveScore={giveScore}
								checkAnswer={checkAnswer}
								alterGame={alterGame}
								guessColor={guessColor}
								setGuessColor={setGuessColor}
								setIsRight={setIsRight}
								answer={answer}
								i={i}
							/>
						</Grid>
					))
				)}
			</Grid>
		</Container>
	);
};

export default ShowAnswers;
