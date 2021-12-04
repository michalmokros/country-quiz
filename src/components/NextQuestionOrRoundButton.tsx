import { Button, Grid } from '@mui/material';
import { FC } from 'react';

import { Questions } from '../utils/types';

type Props = {
	setNextQuestionOrRound: () => void;
	setButtonFlag: React.Dispatch<React.SetStateAction<string>>;
	currentQuestion: Questions;
};

const NextQuestionOrRoundButton: FC<Props> = ({
	setNextQuestionOrRound,
	setButtonFlag,
	currentQuestion
}: Props) => (
	<Grid item xs={12}>
		<Button
			fullWidth
			sx={{ border: 'solid', height: '100%' }}
			onClick={() => {
				setNextQuestionOrRound();
				setButtonFlag('');
			}}
		>
			{currentQuestion === 3 ? 'Next Round' : 'Next Question'}
		</Button>
	</Grid>
);
export default NextQuestionOrRoundButton;
