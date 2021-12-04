import { Container, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
	score: number;
};

const ShowScore: FC<Props> = ({ score }: Props) => (
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
			Your score is {score}/{30}
		</Typography>
	</Container>
);

export default ShowScore;
