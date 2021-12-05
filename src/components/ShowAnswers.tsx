import { Button, Container, Grid } from '@mui/material';
import { FC } from 'react';

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
				{round.currentQuestion === 3
					? ''
					: (question as Country[]).map((answer, i) => (
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
					  ))}
			</Grid>
		</Container>
	);
};

export default ShowAnswers;
