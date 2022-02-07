import cx from 'classnames';
import Image from 'next/image'
import {
	getImage,
	getName
} from '../selectors/character';

export default function Characters ({
	className = '',
	character
}) {
	return (
		<div className={cx('md:w-80 p-3', className)}>
			<div className='rounded-xl overflow-hidden'>
				<div className={`h-96 w-full bg-[url('/img/star-wars-stars-bg.jpeg')] bg-cover relative`}>
					<Image
						layout='fill'
						objectFit='cover'
						objectPosition='top'
						src={getImage(character)}
					/>
				</div>
				<div className='h-1 bg-burnt-red'/>
				<div className={`flex px-4 bg-stone-800 min-h-[7rem] max-h-[7rem] bg-[url('/img/bg_hash_top.png')] bg-[length:7px] bg-repeat-x bg-left-top`}>
					<div className='flex flex-col justify-between py-2 text-white font-medium uppercase'>
						<div>{getName(character)}</div>
						<div className='text-burnt-red font-medium'>
							<span className='inline-block bg-no-repeat bg-starwars-icon bg-databank-icon w-starwars-icon h-starwars-icon m-starwars-icon' />
							<span className='ml-1 text-sm'>DATA BANK</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};