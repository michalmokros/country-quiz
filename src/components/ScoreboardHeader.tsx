import { FC } from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { GameSession } from '../utils/firebase';
import { useTranslation } from '../hooks/useTranslation';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.primary.contrastText,
	background: theme.palette.primary.main
}));

type Props = {
	requestSort: (key: string) => void;
};

const ScoreboardRow = ({ requestSort }: Props) => {
	const t = useTranslation();
	return (
		<>
			<Grid item xs={5}>
				<Item onClick={() => requestSort('by')}>Username</Item>
			</Grid>
			<Grid item xs={5}>
				<Item onClick={() => requestSort('date')}>Date</Item>
			</Grid>
			<Grid item xs={2}>
				<Item onClick={() => requestSort('score')}>Score</Item>
			</Grid>
		</>
	);
};

export default ScoreboardRow;
