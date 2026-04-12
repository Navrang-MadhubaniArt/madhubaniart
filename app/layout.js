
import "../styles/globals.css";

export const metadata = {
  title: "Navrang Arts",
  description: "Madhubani Art Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
