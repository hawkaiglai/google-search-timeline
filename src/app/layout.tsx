import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TimelineProvider } from '@/contexts/TimelineContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'Google Search Timeline - Interactive History',
  description: 'An interactive journey through 29 years of Google Search evolution, from 1996 to 2025.',
  keywords: ['Google', 'Search', 'Timeline', 'History', 'Technology', 'Innovation'],
  authors: [{ name: 'Google Search Timeline Project' }],
  openGraph: {
    title: 'Google Search Timeline',
    description: 'Explore the evolution of Google Search through an interactive timeline',
    type: 'website',
    url: 'https://rxtimeline.kparakposignal.space',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Search Timeline',
    description: 'Explore the evolution of Google Search through an interactive timeline',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4285F4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TimelineProvider>
            {children}
          </TimelineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
