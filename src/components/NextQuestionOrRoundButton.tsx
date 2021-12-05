import { Button, Grid } from '@mui/material';
import { FC } from 'react';

import { useGame } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';
import { gameSessionsCollection } from '../utils/firebase';
import { Questions } from '../utils/types';

type Props = {
	setNextQuestionOrRound: () => void;
	setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
	currentQuestion: Questions;
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
};

const NextQuestionOrRoundButton: FC<Props> = ({
	setNextQuestionOrRound,
	setButtonClicked,
	currentQuestion,
	setGuessColor
}: Props) => {
	const [game, setGame] = useGame();
	const t = useTranslation();

	return (
		<Grid item xs={12}>
			<Button
				fullWidth
				sx={{ border: 'solid', height: '100%' }}
				onClick={() => {
					setNextQuestionOrRound();
					setButtonClicked(false);
					setGuessColor(['inherit', 'inherit', 'inherit', 'inherit']);
				}}
			>
				{currentQuestion !== 3
					? t('next_question')
					: game.currentRound === 10
					? t('evaluate')
					: t('next_round')}
			</Button>
		</Grid>
	);
};
export default NextQuestionOrRoundButton;
