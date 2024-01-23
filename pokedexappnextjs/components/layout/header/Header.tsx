'use client';

import Image from 'next/image';
import PokemonLogo from '../../../assets/logo-pokemon.svg';
import {
	useToastContext,
	clearLocalStorage,
	getUserInfo,
} from '../../../utils';
import { Button } from '../../button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Header = () => {
	const router = useRouter();
	const user = getUserInfo();
	const { showToast } = useToastContext();

	const renderButton = (path: string, label: string) => {
		return (
			<Link href={path} className=''>
				<Button
					buttonStyle='primary'
					onClick={() => {
						return;
					}}
				>
					{label}
				</Button>
			</Link>
		);
	};

	const renderUserButton = () => {
		if (user && location.pathname === '/') {
			return renderButton('user', 'User account');
		} else if (!user && location.pathname === '/') {
			return renderButton('user', 'Sign in');
		} else if (user && location.pathname === '/user') {
			return (
				<Button
					buttonStyle='primary'
					onClick={() => {
						clearLocalStorage();
						router.push('/');
						showToast({
							isDisplay: true,
							message: 'Log out successful',
							type: 'success',
						});
					}}
				>
					Log out
				</Button>
			);
		} else {
			return null;
		}
	};

	return (
		<header className={'flex flex-row h-fit p-3.5 gap-10 justify-between'}>
			<Link href={'/'}>
				<Image src={PokemonLogo} alt={'pokemon'} />
			</Link>

			{renderUserButton()}
		</header>
	);
};
