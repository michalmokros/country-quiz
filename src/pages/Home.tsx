import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
	const t = useTranslation();

	return <h1>{t('country_quiz')}</h1>;
};

export default Home;
