import * as _ from 'lodash';
import {
	Dispatch,
	FC,
	useState,
	createContext,
	SetStateAction,
	useContext,
	useCallback
} from 'react';

import countryData from '../countryData.json';
import {
	Game,
	Country,
	Round,
	Rounds,
	Questions,
	RoundsArray,
	QuestionsArray
} from '../utils/types';

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
const NUMBER_OF_ROUNDS = Math.max(...RoundsArray);
const NUMBER_OF_QUESTIONS = Math.max(...QuestionsArray);

export const GameProvider: FC = ({ children }) => {
	const gameState = useState<Game>({
		finished: false,
		score: 0,
		currentRound: 1,
		rounds: generateRounds(),
		username: undefined
	});

	return (
		<GameContext.Provider value={gameState}>{children}</GameContext.Provider>
	);
};

export const useGame = () => useContext(GameContext);

export const useRound = (): readonly [Round, () => void] => {
	const [game] = useGame();

	return [
		game.rounds[game.currentRound],
		useCallback(() => {
			if (game.currentRound < NUMBER_OF_ROUNDS) {
				alterGame({ currentRound: (game.currentRound + 1) as Rounds });
			} else {
				alterGame({ finished: true });
			}
		}, [])
	] as const;
};

export const useQuestion = (): [Country[], (answer: Country) => void] => {
	const [game] = useGame();
	const [round, increaseRound] = useRound();

	return [
		round.options[round.currentQuestion],
		useCallback((answer: Country) => {
			if (answer === round.country) {
				if (round.currentQuestion < NUMBER_OF_QUESTIONS) {
					alterGame({
						rounds: {
							...game.rounds,
							[game.currentRound]: {
								...round,
								currentQuestion: (round.currentQuestion + 1) as Questions
							}
						},
						score: game.score + round.currentQuestion
					});
				} else {
					alterGame({ score: game.score + round.currentQuestion });
					increaseRound();
				}
			} else {
				increaseRound();
			}
		}, [])
	];
};

const alterGame = (newGame: Partial<Game>) => {
	const [, setGame] = useGame();
	setGame(prevGame => ({ ...prevGame, ...newGame }));
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

// 	const getQuestionText = (question: string) => {
// 		if (question === 'flag') return 'Pick the correct country';
// 		if (question === 'capital') return 'What is the capital city of ';
// 		if (question === 'population') return 'What is this flag';
// 	};

// 	const onButtonClick = () => {
// 		return 0;
// 	};

// 	return {
// 		score,
// 		text: getQuestionText(question),
// 		question,
// 		answers,
// 		onButtonClick
// 	};
// };
