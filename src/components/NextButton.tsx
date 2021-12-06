import { Button, Grid } from '@mui/material';
import { FC, useCallback } from 'react';

import { useGame, useRound } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';
import {
	Game,
	NUMBER_OF_QUESTIONS,
	NUMBER_OF_ROUNDS,
	Questions,
	Rounds
} from '../utils/types';

type Props = {
	isRight: boolean;
	alterGame: (newGame: Partial<Game>) => void;
	setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
};

const NextButton: FC<Props> = ({
	isRight,
	alterGame,
	setButtonClicked,
	setGuessColor
}: Props) => {
	const [game] = useGame();
	const round = useRound();
	const t = useTranslation();

	const setNextQuestionOrRound = useCallback(
		(isRight: boolean) => {
			if (isRight && round.currentQuestion < NUMBER_OF_QUESTIONS) {
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
		},
		[game]
	);

	return (
		<Grid item xs={12}>
			<Button
				fullWidth
				sx={{ border: 'solid', height: '100%' }}
				onClick={() => {
					setNextQuestionOrRound(isRight);
					setButtonClicked(false);
					setGuessColor(['inherit', 'inherit', 'inherit', 'inherit']);
				}}
			>
				{isRight && round.currentQuestion < NUMBER_OF_QUESTIONS
					? t('next_question')
					: game.currentRound === 10
					? t('evaluate')
					: t('next_round')}
			</Button>
		</Grid>
	);
};
export default NextButton;
