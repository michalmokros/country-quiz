import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';

import { useTranslation } from '../hooks/useTranslation';

const Landing: FC = ({ children }) => {
	const t = useTranslation();
	return (
		<>
			<Typography variant="h3">{t('country_quiz')}</Typography>
			<Typography>
				Country quiz is a game where you can test your geography knowledge.
			</Typography>
			<Typography>For the first level you can get 1 point.</Typography>
			<Typography>For the second level you can get 2 points.</Typography>
			<Typography>
				For the third level you can get 1/2/3 points, depending on how accurate
				your guess is.
			</Typography>
			<Typography>
				When the game ends, the player runs out of questions, the end screen is
				shown with all the acquired points. (Picture 5)
			</Typography>
			<Button
				component={Link}
				to="/play"
				variant="outlined"
				sx={{
					'color': 'primary',
					'borderColor': 'primary',
					'alignSelf': 'center',
					':hover': { color: 'secondary', borderColor: 'secondary' }
				}}
			>
				{t('play')}
			</Button>
		</>
	);
};

export default Landing;
