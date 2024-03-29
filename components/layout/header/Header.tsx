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
import { useRouter, usePathname } from 'next/navigation';

export const Header = () => {
	const router = useRouter();
  const pathname = usePathname()
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
		if (user && pathname === '/mainPage') {
			return renderButton('user', 'User account');
		} else if (!user && pathname === '/mainPage') {
			return renderButton('user', 'Sign in');
		} else if (user && pathname === '/user') {
			return (
				<Button
					buttonStyle='primary'
					onClick={() => {
						clearLocalStorage();
						router.push('/mainPage');
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
		<header className={'flex flex-row h-1/6 m-3.5 gap-10 justify-between'}>
			<Link href={'/mainPage'}>
				<Image src={PokemonLogo} alt={'pokemon'} />
			</Link>

			{renderUserButton()}
		</header>
	);
};
