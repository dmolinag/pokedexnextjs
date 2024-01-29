import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import styles from './app.module.scss';
import { Header } from '@/components/layout/header/Header';
import { Footer } from '@/components/layout/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Pokedex NextJS',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<div className={`w-full h-full flex flex-col z-10 ${styles.App}`}>
					<Header />
					<main className={'flex flex-col h-2/3'}>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}