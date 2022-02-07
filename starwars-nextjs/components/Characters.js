import cx from 'classnames';
import CharacterCard from './CharacterCard';

export default function Characters ({
	className = '',
	characters = []
}) {
	return (
		<div className={cx('', className)}>
			{
				characters.map(character => (
					<CharacterCard character={character} />
				))
			}
		</div>
	);
};