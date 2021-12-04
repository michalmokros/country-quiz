import { Typography } from '@mui/material';
import { FC } from 'react';
import { ReactCountryFlag } from 'react-country-flag';
import { LocationCity, Groups } from '@mui/icons-material';

import { useRound } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';

const ShowQuestion: FC = () => {
	const round = useRound();
	const t = useTranslation();

	switch (round.currentQuestion) {
		case 1:
			return (
				<ReactCountryFlag
					countryCode={round.country.short_name}
					svg
					style={{
						display: 'flex-grow',
						width: '100%',
						height: '100%'
					}}
				/>
			);
		case 2:
			return (
				<>
					<LocationCity color="primary" sx={{ fontSize: 120 }} />
					<Typography variant="h2" align="center">
						{t('capital_city_question')}
						{round.country.long_name}?
					</Typography>
				</>
			);
		case 3:
			return (
				<>
					<Groups color="primary" sx={{ fontSize: 120 }} />
					<Typography variant="h2" align="center">
						{t('population_question')}
						{round.country.long_name}?
					</Typography>
				</>
			);
	}
};

export default ShowQuestion;
