import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import { GameLayout } from '../components';

const Play = () => {
	const t = useTranslation();
	usePageTitle(t('country_quiz'));
	return <GameLayout />;
};

export default Play;
