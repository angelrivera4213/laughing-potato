import cx from 'classnames';
import {
	getImage
} from '../selectors/character';

export default function Characters ({
	className = '',
	character
}) {
	return (
		<div className={cx('rounded-md md:w-96 overflow-hidden', className)}>
			<img
				className=''
				src={getImage(character)}
			/>
		</div>
	);
};