import { Landing } from '../components';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
	const t = useTranslation();

	return <Landing />;
};

export default Home;
