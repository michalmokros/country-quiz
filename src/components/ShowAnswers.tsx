import { Button, Container, Grid, TextField } from '@mui/material';
import { FC, useState } from 'react';

import { useQuestion, useRound } from '../hooks/useGame';
import { useLanguage } from '../hooks/useTranslation';
import { Country } from '../utils/types';

type Props = {
	giveScore: () => void;
	checkAnswer: (countryId: string) => boolean;
	buttonClicked: boolean;
	setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
	guessColor: string[];
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
};

const ShowAnswers: FC<Props> = ({
	giveScore,
	checkAnswer,
	buttonClicked,
	setButtonClicked,
	guessColor,
	setGuessColor
}: Props) => {
	const round = useRound();
	const question = useQuestion();
	const [l] = useLanguage();
	const [popText, setPopText] = useState<string>('');

	return (
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
				{round.currentQuestion === 3 ? (
					<>
						<Grid item xs={10}>
							<TextField
								fullWidth
								id="filled-basic"
								label="Filled"
								variant="filled"
								onChange={e => setPopText(e.target.value)}
							/>
						</Grid>
						<Grid item xs={2}>
							<Button fullWidth sx={{ height: '100%' }} variant="outlined">
								{' '}
								text{' '}
							</Button>
						</Grid>
					</>
				) : (
					(question as Country[]).map((answer, i) => (
						<Grid item xs={6} key={i}>
							<Button
								id={answer.key}
								fullWidth
								sx={{
									border: 'solid',
									height: '100%',
									bgcolor: guessColor[i]
								}}
								onClick={e => {
									if (!buttonClicked) {
										setButtonClicked(true);
										const color = guessColor;
										if (checkAnswer((e.target as HTMLInputElement).id)) {
											giveScore();
											color[i] = 'green';
											setGuessColor(color);
										} else {
											color[i] = 'red';
											color[round.countryIndex] = 'green';
											setGuessColor(color);
										}
									}
								}}
							>
								{round.currentQuestion === 1
									? answer.name[l]
									: answer.capital[l]}
							</Button>
						</Grid>
					))
				)}
			</Grid>
		</Container>
	);
};

export default ShowAnswers;
