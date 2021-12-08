import { Container } from '@mui/material';
import { FC } from 'react';

import { useGame } from '../hooks/useGame';
import { Game } from '../utils/types';

import EndScreen from './EndScreen';
import NextButton from './NextButton';
import ShowAnswers from './ShowAnswers';
import ShowQuestion from './ShowQuestion';
import ShowScore from './ShowScore';

type Props = {
	username?: string;
};

const GameLayout: FC<Props> = ({ username }) => {
	const [game, setGame] = useGame();

	const alterGame = (newGame: Partial<Game>) =>
		setGame(prevGame => ({ ...prevGame, ...newGame }));

	if (game.finished) {
		return <EndScreen username={username} />;
	} else {
		return (
			<Container
				maxWidth="md"
				component="main"
				color="primary"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: 1,
					pt: 1
				}}
			>
				<ShowScore username={username} />
				<Container
					maxWidth="md"
					component="main"
					sx={{
						display: 'flex',
						gap: 1,
						border: 'solid',
						flexDirection: 'column',
						alignItems: 'center',
						height: '80%',
						width: '80%'
					}}
				>
					<ShowQuestion />
				</Container>
				<ShowAnswers alterGame={alterGame} />
				{game.current.isQuestionAnswered ? (
					<NextButton alterGame={alterGame} />
				) : null}
			</Container>
		);
	}
};

export default GameLayout;
