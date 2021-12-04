import { Container } from '@mui/material';
import { FC } from 'react';
import { ReactCountryFlag } from 'react-country-flag';

import { Questions } from '../utils/types';

type Props = {
	currentQuestion: Questions;
	countryCode: string;
};

const ShowQuestion: FC<Props> = ({ currentQuestion, countryCode }: Props) => (
	<Container
		maxWidth="md"
		component="main"
		sx={{
			display: 'flex',
			pt: 2,
			pb: 2,
			gap: 2,
			border: 'solid'
		}}
	>
		<Container
			maxWidth="md"
			component="main"
			sx={{
				display: 'flex'
			}}
		>
			{currentQuestion === 1 ? (
				<ReactCountryFlag
					countryCode={countryCode}
					svg
					style={{
						display: 'flex-grow',
						width: '100%',
						height: '100%'
					}}
				/>
			) : null}
		</Container>
	</Container>
);

export default ShowQuestion;
