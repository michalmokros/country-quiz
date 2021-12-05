import { checkActionCode } from '@firebase/auth';
import { Button, Container, Grid } from '@mui/material';
import { FC, useState } from 'react';

import { Country, Questions } from '../utils/types';

type Props = {
	questionType: Questions;
	question: Country[];
	giveScore: () => void;
	checkAnswer: (countryId: string) => boolean;
	buttonClicked: boolean;
	setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
	guessColor: string[];
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
};

const ShowAnswers: FC<Props> = ({
	questionType,
	question,
	giveScore,
	checkAnswer,
	buttonClicked,
	setButtonClicked,
	guessColor,
	setGuessColor
}: Props) => {
	const findCorrectCountryIndex = (question: Country[]): number => {
		let correctCountryIndex = -1;
		for (let j = 0; j < 4; j++) {
			if (checkAnswer(question[j].short_name)) {
				correctCountryIndex = j;
				break;
			}
		}
		return correctCountryIndex;
	};

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
				{question.map((answer, i) => (
					<Grid item xs={6} key={i}>
						<Button
							id={answer.short_name}
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
										const correctCountryIndex =
											findCorrectCountryIndex(question);
										color[correctCountryIndex] = 'green';
										setGuessColor(color);
									}
								}
							}}
						>
							{questionType === 1 ? answer.long_name : answer.capital_city}
						</Button>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default ShowAnswers;
