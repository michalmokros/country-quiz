import { Button } from '@mui/material';
import { FC } from 'react';

import { useQuestion, useRound } from '../../hooks/useGame';
import { useLanguage } from '../../hooks/useTranslation';
import { Country, CountryAnswer } from '../../utils/types';

type Props = {
	giveScore: () => void;
	checkAnswer: (answer: string | number) => boolean;
	buttonClicked: boolean;
	setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
	guessColor: string[];
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
	setIsRight: (newIsRight: boolean) => void;
	answer: Country;
	i: number;
};

const ButtonAnswer: FC<Props> = ({
	giveScore,
	checkAnswer,
	buttonClicked,
	setButtonClicked,
	guessColor,
	setGuessColor,
	setIsRight,
	answer,
	i
}: Props) => {
	const round = useRound();
	const question = useQuestion();
	const [l] = useLanguage();

	return (
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
					const isRight = checkAnswer((e.target as HTMLInputElement).id);
					if (isRight) {
						giveScore();
						color[i] = 'green';
						setGuessColor(color);
					} else {
						color[i] = 'red';
						color[(question as CountryAnswer).index] = 'green';
						setGuessColor(color);
					}
					setIsRight(isRight);
				}
			}}
		>
			{round.currentQuestion === 1 ? answer.name[l] : answer.capital[l]}
		</Button>
	);
};

export default ButtonAnswer;
