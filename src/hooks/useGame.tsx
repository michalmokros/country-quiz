import * as _ from 'lodash';
import { addDoc, Timestamp } from 'firebase/firestore';
import {
	Dispatch,
	FC,
	useState,
	createContext,
	SetStateAction,
	useContext,
	useEffect
} from 'react';

import data from '../data.json';
import {
	Game,
	Country,
	Round,
	Rounds,
	RoundsArray,
	QuestionsArray,
	NUMBER_OF_QUESTIONS,
	MAX_SCORE,
	QuestionOptions,
	Boundaries
} from '../utils/types';
import { gameSessionsCollection } from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

type GameState = [Game, Dispatch<SetStateAction<Game>>];

const GameContext = createContext<GameState>(undefined as never);
const countries: Country[] = data as Country[];

export const GameProvider: FC = ({ children }) => {
	const [game, setGame] = useState<Game>({
		finished: false,
		score: 0,
		currentRound: 1,
		rounds: generateRounds()
	});
	const user = useLoggedInUser();

	useEffect(() => {
		if (game.finished) {
			addDoc(gameSessionsCollection, {
				by: user?.email ?? 'Anonymous',
				date: Timestamp.now(),
				score: {
					maxScore: MAX_SCORE,
					score: game.score
				}
			});
		} else {
			setGame({
				currentRound: 1,
				finished: false,
				rounds: generateRounds(),
				score: 0
			});
		}
	}, [game.finished]);

	return (
		<GameContext.Provider value={[game, setGame]}>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = () => useContext(GameContext);

export const useRound = () => {
	const [game] = useContext(GameContext);
	return game.rounds[game.currentRound];
};

export const useQuestion = () => {
	const round = useRound();
	return round.options[round.currentQuestion];
};

export const getScore = (): number => {
	const [game] = useContext(GameContext);
	return game.score;
};

export const getCurrentRound = (): number => {
	const [game] = useContext(GameContext);
	return game.currentRound;
};

const generateRounds = (): Record<Rounds, Round> => {
	const rounds: Partial<Record<Rounds, Round>> = {};

	for (const round of RoundsArray) {
		const roundCountry = _.sample(countries) as Country;
		const options: Partial<QuestionOptions> = {};
		let countryIndex = -1;

		for (const question of QuestionsArray) {
			if (question === 3) {
				options[question] = {
					lower: Math.round(0.95 * roundCountry.population),
					upper: Math.round(1.05 * roundCountry.population)
				};
			} else {
				countryIndex = _.random(3, false);
				options[question] = _.fill(
					[...pickRandomCountriesProps(roundCountry)],
					roundCountry,
					countryIndex,
					countryIndex + 1
				);
			}
		}

		rounds[round] = {
			options: options as QuestionOptions,
			currentQuestion: 1,
			country: roundCountry,
			countryIndex
		};
	}

	return rounds as Record<Rounds, Round>;
};

const pickRandomCountriesProps = (roundCountry: Country): Country[] =>
	_.sampleSize(
		countries.filter(country => country !== roundCountry),
		4
	);
