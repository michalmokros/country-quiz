import { Button, Grid, TextField } from '@mui/material';
import { FC, useState } from 'react';

import { useTranslation } from '../hooks/useTranslation';

type Props = {
	giveScore: () => void;
	checkAnswer: (answer: string | number) => boolean;
	buttonClicked: boolean;
	setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
	guessColor: string[];
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
};

const PopulationAnswer: FC<Props> = ({
	giveScore,
	checkAnswer,
	buttonClicked,
	setButtonClicked,
	guessColor,
	setGuessColor
}: Props) => {
	const [populationGuess, setPopulationGuess] = useState<number>(0);
	const t = useTranslation();

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
				/>
			</Grid>
			<Grid item xs={2} alignItems="stretch" style={{ display: 'flex' }}>
				<Button
					fullWidth
					sx={{ height: '100%', bgcolor: guessColor[0] }}
					variant="outlined"
					onClick={e => {
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
							setPopulationGuess(0);
							setButtonClicked(true);
						}
					}}
				>
					{t('submit')}
				</Button>
			</Grid>
		</>
	);
};

export default PopulationAnswer;
