import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { ScoreboardRow } from '../components';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import { GameSession, gameSessionsCollection } from '../utils/firebase';

const Scoreboard = () => {
	const t = useTranslation();
	usePageTitle(t('scoreboard'));

	const [gameSessions, setgameSessions] = useState<GameSession[]>([]);
	useEffect(
		() =>
			onSnapshot(gameSessionsCollection, snapshot =>
				setgameSessions(
					snapshot.docs
						.map(d => d.data())
						.sort((lhs, rhs) => rhs.score.score - lhs.score.score)
				)
			),
		[]
	);

	return (
		<Container sx={{ flexGrow: 1 }}>
			<Grid container spacing={0} maxWidth="md">
				{gameSessions.map((r, i) => (
					<ScoreboardRow key={i} {...r} />
				))}{' '}
			</Grid>
		</Container>
	);
};

export default Scoreboard;
