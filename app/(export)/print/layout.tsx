import "../../globals.css";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "700", "900"],
});

const getDate = () => {
  const date = new Date();
  const dateStr = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}--${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  return dateStr;
};

export const metadata = {
  title: `HORÁRIO ${getDate()}`,
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={merriweather.className}>{children}</body>
    </html>
  );
}
