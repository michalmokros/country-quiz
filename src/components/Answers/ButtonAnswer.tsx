import { Button } from '@mui/material';
import { FC, useEffect } from 'react';

import { useCurrent, useQuestion, useRound } from '../../hooks/useGame';
import { useLanguage } from '../../hooks/useTranslation';
import { Country, CountryAnswer, Game } from '../../utils/types';

type Props = {
	giveScore: (earnedScore: number) => void;
	checkAnswer: (answer: string | number) => number;
	alterGame: (newGame: Partial<Game>) => void;
	answer: Country;
	i: number;
};

const ButtonAnswer: FC<Props> = ({
	giveScore,
	checkAnswer,
	alterGame,
	answer,
	i
}: Props) => {
	const round = useRound();
	const question = useQuestion();
	const [l] = useLanguage();
	const { isQuestionAnswered, answersColors } = useCurrent();

	return (
		<Button
			id={answer.key}
			fullWidth
			sx={{
				border: 'solid',
				height: '100%',
				backgroundColor: answersColors[i]
			}}
			onClick={e => {
				if (!isQuestionAnswered) {
					const color = answersColors;
					const earnedScore = checkAnswer((e.target as HTMLInputElement).id);
					const isRight = !!earnedScore;
					if (isRight) {
						giveScore(earnedScore);
						color[i] = 'green';
					} else {
						color[i] = 'red';
						color[(question as CountryAnswer).index] = 'green';
					}
					alterGame({
						current: {
							isQuestionAnswered: true,
							isQuestionCorrect: isRight,
							answersColors: color
						}
					});
				}
			}}
		>
			{round.currentQuestion === 1 ? answer.name[l] : answer.capital[l]}
		</Button>
	);
};

export default ButtonAnswer;
