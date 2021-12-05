import localization from '../localization';

export type Languages = keyof typeof localization;
export const RoundsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const QuestionsArray = [1, 2, 3] as const;
export type Rounds = typeof RoundsArray[number];
export type Questions = typeof QuestionsArray[number];

export const POPULATION_RANGE = 0.1; // 10% both ways
export const NUMBER_OF_ROUNDS = Math.max(...RoundsArray);
export const NUMBER_OF_QUESTIONS = Math.max(...QuestionsArray);
export const MAX_SCORE =
	QuestionsArray.reduce((a, b) => a + b, 0) * NUMBER_OF_ROUNDS; // (1+2+3) * 10

export type Country = {
	key: string;
	population: number;
	name: Record<Languages, string>;
	capital: Record<Languages, string>;
};

export type PopulationAnswer = {
	lower: number;
	upper: number;
};

export type CountryAnswer = {
	index: number;
	countries: Country[];
};

export type QuestionOptions = {
	[1]: CountryAnswer;
	[2]: CountryAnswer;
	[3]: PopulationAnswer;
};

export type Round = {
	options: QuestionOptions;
	currentQuestion: Questions;
	country: Country;
};

export type Game = {
	finished: boolean;
	score: number;
	currentRound: Rounds;
	rounds: Record<Rounds, Round>;
};
