import {
	Button,
	ButtonGroup,
	Container,
	Pagination,
	Stack,
	Grid
} from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

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
	const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'score',
		descending: false
	});
	const [pageLength, setPageLength] = useState<5 | 10 | 20>(10);
	const [currentData, setCurrentData] = useState<GameSession[]>([]);

	useEffect(
		() =>
			onSnapshot(gameSessionsCollection, snapshot =>
				setGameSessions(
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
		setCurrentData(sortableItems.slice(0, pageLength));
		return sortableItems;
	}, [gameSessions, sortConfig, pageLength]);

	const changePage = (page: number) => {
		console.log(sortedItems);
		setCurrentData(
			sortedItems.slice(
				(page - 1) * pageLength,
				(page - 1) * pageLength + pageLength
			)
		);
		console.log(currentData);
	};

	return (
		<Container sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>
			<Grid container spacing={0} maxWidth="md">
				<ScoreboardHeader requestSort={requestSort} />
				{currentData.map((r, i) => (
					<ScoreboardRow key={i} {...r} />
				))}
			</Grid>
			<Grid container spacing={0} maxWidth="md">
				<Grid item xs={10}>
					<Stack spacing={2} sx={{ alignItems: 'center' }}>
						<Pagination
							count={Math.round(gameSessions.length / pageLength)}
							showFirstButton
							showLastButton
							boundaryCount={2}
							color="primary"
							onChange={(_e, p) => changePage(p)}
						/>
					</Stack>
				</Grid>
				<Grid item xs={2}>
					<ButtonGroup size="small" aria-label="small button group">
						<Button key="five" onClick={() => setPageLength(5)}>
							5
						</Button>
						<Button key="ten" onClick={() => setPageLength(10)}>
							10
						</Button>
						<Button key="twenty" onClick={() => setPageLength(20)}>
							20
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Scoreboard;
