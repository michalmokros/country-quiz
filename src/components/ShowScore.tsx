import { Container, Typography } from '@mui/material';
import { FC } from 'react';

import { getScore, getCurrentRound } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';
import { MAX_SCORE, NUMBER_OF_ROUNDS } from '../utils/types';

const ShowScore: FC = () => {
	const score = getScore();
	const currentRound = getCurrentRound();
	const t = useTranslation();

	return (
		<Container
			maxWidth="md"
			component="main"
			color="primary"
			sx={{
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			<Typography variant="h3" sx={{ p: 2, textAlign: 'left' }}>
				{t('round_text')} {currentRound}/{NUMBER_OF_ROUNDS}{' '}
			</Typography>
			<Typography variant="h3" sx={{ p: 2, flexGrow: '1', textAlign: 'right' }}>
				{t('score_text')}
				{score}/{MAX_SCORE}
			</Typography>
		</Container>
	);
};

export default ShowScore;
