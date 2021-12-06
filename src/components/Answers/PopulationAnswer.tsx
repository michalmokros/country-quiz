import { Button, Grid, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { isQuestionAnswered, useRound } from '../../hooks/useGame';
import { useLanguage, useTranslation } from '../../hooks/useTranslation';
import { Game } from '../../utils/types';

type Props = {
	giveScore: () => void;
	checkAnswer: (answer: string | number) => boolean;
	alterGame: (newGame: Partial<Game>) => void;
	guessColor: string[];
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
};

const PopulationAnswer: FC<Props> = ({
	giveScore,
	checkAnswer,
	alterGame,
	guessColor,
	setGuessColor
}: Props) => {
	const [populationGuess, setPopulationGuess] = useState<number>(0);
	const t = useTranslation();
	const round = useRound();
	const isAnswered = isQuestionAnswered();
	const [l] = useLanguage();

	return (
		<>
			<Grid item xs={10}>
				<TextField
					fullWidth
					required
					id="filled-basic"
					label={t('take_guess')}
					variant="filled"
					type="number"
					onChange={e => setPopulationGuess(Number.parseInt(e.target.value))}
					sx={{ display: isAnswered ? 'none' : 'inherit' }}
				/>
			</Grid>
			<Grid item xs={2} alignItems="stretch" style={{ display: 'flex' }}>
				<Button
					fullWidth
					sx={{
						height: '100%',
						bgcolor: guessColor[0],
						display: isAnswered ? 'none' : 'inherit'
					}}
					variant="outlined"
					onClick={() => {
						if (populationGuess > 0) {
							const color = guessColor;
							if (checkAnswer(populationGuess)) {
								giveScore();
								color[0] = 'green';
								setGuessColor(color);
							} else {
								color[0] = 'red';
								setGuessColor(color);
							}
							alterGame({ isQuestionAnswered: true });
						}
					}}
				>
					{t('submit')}
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography
					variant="h6"
					align="center"
					sx={{
						display: !isAnswered ? 'none' : 'inherit',
						border: 'solid',
						borderColor: guessColor[0]
					}}
				>
					{t('thePopulationOf')} {round.country.name[l]} {t('is')}{' '}
					{round.country.population.toLocaleString(l)}. {t('yourGuessWas')}{' '}
					{populationGuess.toLocaleString(l)}.
				</Typography>
			</Grid>
		</>
	);
};

export default PopulationAnswer;
