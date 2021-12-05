import { Container, Typography } from '@mui/material';
import { FC } from 'react';

import { getScore } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';

const ShowScore: FC = () => {
	const score = getScore();
	const t = useTranslation();

	return (
		<Container
			maxWidth="md"
			component="main"
			color="primary"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				border: 'solid',
				borderRadius: '30%'
			}}
		>
			<Typography variant="h3" sx={{ p: 2 }}>
				{t('score_text')}
				{score}/{60}
			</Typography>
		</Container>
	);
};

export default ShowScore;
