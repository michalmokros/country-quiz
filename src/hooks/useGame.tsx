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

import countryData from '../countryData.json';
import {
	Game,
	Country,
	Round,
	Rounds,
	Questions,
	RoundsArray,
	QuestionsArray,
	NUMBER_OF_QUESTIONS
} from '../utils/types';
import { gameSessionsCollection } from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

type GameState = [Game, Dispatch<SetStateAction<Game>>];

const GameContext = createContext<GameState>(undefined as never);
const countries: Country[] = countryData.map(
	country =>
		({
			short_name: country.short_name,
			long_name: country.long_name,
			capital_city: country.capital_city,
			population: country.population
		} as const)
);

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
					maxScore: 30,
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

const generateRounds = (): Record<Rounds, Round> => {
	const rounds: Partial<Record<Rounds, Round>> = {};
	const roundCountry = _.sample(countries) as Country;

	for (const round of RoundsArray) {
		const options: Partial<Record<Questions, Country[]>> = {};

		for (const question of QuestionsArray) {
			options[question] = [
				roundCountry,
				...pickRandomCountriesProps(roundCountry)
			];
		}

		rounds[round] = {
			options: options as Record<Questions, Country[]>,
			currentQuestion: 1,
			country: roundCountry
		};
	}

	return rounds as Record<Rounds, Round>;
};

const pickRandomCountriesProps = (roundCountry: Country): Country[] =>
	_.sampleSize(
		countries.filter(country => country !== roundCountry),
		NUMBER_OF_QUESTIONS
	);
