import { Button, Container, Grid } from '@mui/material';
import { FC } from 'react';

import { Country } from '../utils/types';

type Props = {
	question: Country[];
	buttonFlag: string;
	handleAnswerClick: (event: React.MouseEvent<HTMLElement>) => void;
};
const ShowAnswers: FC<Props> = ({
	question,
	buttonFlag,
	handleAnswerClick
}: Props) => (
	<Container
		maxWidth="md"
		component="main"
		sx={{
			display: 'flex',
			height: '20vh',
			pb: 10,
			gap: 1
		}}
	>
		<Grid container spacing={2} display="flex" alignItems="stretch">
			{question.map((answer, i) => (
				<Grid item xs={6} key={i}>
					<Button
						id={answer.short_name}
						fullWidth
						style={{
							backgroundColor:
								buttonFlag !== '' && buttonFlag === answer.short_name
									? '#1b8f1d'
									: '#ff0000'
						}}
						sx={{ border: 'solid', height: '100%' }}
						onClick={e => handleAnswerClick(e)}
					>
						{answer.long_name}
					</Button>
				</Grid>
			))}
		</Grid>
	</Container>
);

export default ShowAnswers;
