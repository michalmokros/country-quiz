import { Button } from '@mui/material';

import { useGame } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';

const RestartButton = () => {
	const [, setGame] = useGame();
	const t = useTranslation();

	return (
		<Button
			onClick={() => {
				setGame(prevGame => ({
					...prevGame,
					...{ finished: false, started: false }
				}));
			}}
		>
			{' '}
			{t('restart_game')}{' '}
		</Button>
	);
};

export default RestartButton;
