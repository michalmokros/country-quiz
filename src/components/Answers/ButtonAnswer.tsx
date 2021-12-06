import { Button } from '@mui/material';
import { FC } from 'react';

import { isQuestionAnswered, useQuestion, useRound } from '../../hooks/useGame';
import { useLanguage } from '../../hooks/useTranslation';
import { Country, CountryAnswer, Game } from '../../utils/types';

type Props = {
	giveScore: () => void;
	checkAnswer: (answer: string | number) => boolean;
	alterGame: (newGame: Partial<Game>) => void;
	guessColor: string[];
	setGuessColor: React.Dispatch<React.SetStateAction<string[]>>;
	setIsRight: (newIsRight: boolean) => void;
	answer: Country;
	i: number;
};

const ButtonAnswer: FC<Props> = ({
	giveScore,
	checkAnswer,
	alterGame,
	guessColor,
	setGuessColor,
	setIsRight,
	answer,
	i
}: Props) => {
	const round = useRound();
	const question = useQuestion();
	const [l] = useLanguage();
	const isAnswered = isQuestionAnswered();

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
				if (!isAnswered) {
					alterGame({ isQuestionAnswered: true });
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
