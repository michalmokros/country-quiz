import { RestaurantMenuTwoTone, Score } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';

import { ScoreboardRow } from '../components';
import ScoreboardHeader from '../components/ScoreboardHeader';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import { GameSession, gameSessionsCollection } from '../utils/firebase';

type SortConfig = {
	key: string;
	descending: boolean;
};

const Scoreboard = () => {
	const t = useTranslation();
	usePageTitle(t('scoreboard'));
	const [gameSessions, setgameSessions] = useState<GameSession[]>([]);
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'score',
		descending: false
	});

	useEffect(
		() =>
			onSnapshot(gameSessionsCollection, snapshot =>
				setgameSessions(
					snapshot.docs
						.map(d => d.data())
						.sort((lhs, rhs) => lhs.score.score - rhs.score.score)
				)
			),
		[]
	);

	const requestSort = (key: string) => {
		if (sortConfig && sortConfig.key === key && sortConfig.descending) {
			setSortConfig({ key, descending: false });
		} else {
			setSortConfig({ key, descending: true });
		}
	};

	const sortedItems = useMemo(() => {
		let sortableItems = gameSessions;
		if (sortConfig !== null) {
			if (sortConfig.key === 'by') {
				sortableItems = sortableItems.sort((lhs, rhs) => {
					if (lhs.by > rhs.by) {
						return sortConfig.descending ? 1 : -1;
					} else if (lhs.by < rhs.by) {
						return sortConfig.descending ? -1 : 1;
					} else return 0;
				});
			}
			if (sortConfig.key === 'date') {
				sortableItems = sortableItems.sort((lhs, rhs) => {
					if (lhs.date > rhs.date) {
						return sortConfig.descending ? 1 : -1;
					} else if (lhs.date < rhs.date) {
						return sortConfig.descending ? -1 : 1;
					}
					return 0;
				});
			}
			if (sortConfig.key === 'score') {
				sortableItems = sortableItems.sort((lhs, rhs) => {
					if (lhs.score.score > rhs.score.score) {
						return sortConfig.descending ? 1 : -1;
					} else if (lhs.score.score < rhs.score.score) {
						return sortConfig.descending ? -1 : 1;
					} else return 0;
				});
			}
		}
		return sortableItems;
	}, [gameSessions, sortConfig]);

	return (
		<Container sx={{ flexGrow: 1 }}>
			<Grid container spacing={0} maxWidth="md">
				<ScoreboardHeader requestSort={requestSort} />
				{sortedItems.map((r, i) => (
					<ScoreboardRow key={i} {...r} />
				))}
			</Grid>
		</Container>
	);
};

export default Scoreboard;
