export type Score = {
	score: number;
	maxScore: number;
};

export type Country = {
	short_name: string;
	long_name: string;
	capital_city: string;
	population: number;
};

export const RoundsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const QuestionsArray = [1, 2, 3] as const;
export type Rounds = typeof RoundsArray[number];
export type Questions = typeof QuestionsArray[number];
export const NUMBER_OF_ROUNDS = Math.max(...RoundsArray);
export const NUMBER_OF_QUESTIONS = Math.max(...QuestionsArray);

export type Round = {
	options: Record<Questions, Country[]>;
	currentQuestion: Questions;
	country: Country;
};

export type Game = {
	finished: boolean;
	score: number;
	currentRound: Rounds;
	rounds: Record<Rounds, Round>;
};
