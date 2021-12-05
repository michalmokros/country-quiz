import { Button, Grid } from '@mui/material';
import { FC } from 'react';

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
}: Props) => (
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
			{currentQuestion === 3 ? 'Next Round' : 'Next Question'}
		</Button>
	</Grid>
);
export default NextQuestionOrRoundButton;
