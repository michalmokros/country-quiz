import { FC, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

import { useGame, useQuestion, useRound } from '../hooks/useGame';

import NextQuestionOrRoundButton from './NextQuestionOrRoundButton';
import ShowScore from './ShowScore';
import ShowQuestion from './ShowQuestion';
import ShowAnswers from './ShowAnswers';

const GameLayout: FC = () => {
	const [game] = useGame();
	const [round] = useRound();
	const [question, checkAnswer, setNextQuestionOrRound] = useQuestion();

	const [buttonFlag, setButtonFlag] = useState('');

	const handleAnswerClick = (event: React.MouseEvent<HTMLElement>) => {
		if ((event.target as HTMLInputElement).id === round.country.short_name)
			setButtonFlag(round.country.short_name);
	};

	return (
		<Container
			maxWidth="md"
			component="main"
			color="primary"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: 2,
				pt: 5
			}}
		>
			<ShowScore score={game.score} />
			<ShowQuestion
				currentQuestion={round.currentQuestion}
				countryCode={round.country.short_name}
			/>
			<ShowAnswers
				question={question}
				buttonFlag={buttonFlag}
				handleAnswerClick={handleAnswerClick}
			/>
			{buttonFlag !== '' ? (
				<NextQuestionOrRoundButton
					setNextQuestionOrRound={setNextQuestionOrRound}
					setButtonFlag={setButtonFlag}
					currentQuestion={round.currentQuestion}
				/>
			) : null}
		</Container>
	);
};

export default GameLayout;
