import { useState } from 'react';

export type Score = {
	score: number;
	maxScore: number;
};

const useGame = () => {
	const [score, setScore] = useState<Score>({
		score: 0,
		maxScore: 0
	});
	// const text = () => {
	// 	if (1) return 'Pick the correct country';
	// 	if (1) return 'What is the capital city of ';
	// 	if (1) return 'What is this flag';
	// };
	const [question, setQuestion] = useState('question');
	return {
		score,
		text: 'Here we will return question text based on some logic which is commented atm',
		question
	};
};

export default useGame;
