import './globals.css';

export const metadata = {
  title: 'Business Command Center - AI-Powered Dashboard',
  description: 'Manage your business with AI-powered automation and insights',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
