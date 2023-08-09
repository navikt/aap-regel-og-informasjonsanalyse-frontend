import { AppHeader } from "@/components/AppHeader";
import "@navikt/ds-css";
import styles from "./layout.module.css";
import { Link } from "@navikt/ds-react/esm/link";
import type { Metadata } from "next";
import NextLink from "next/link";
import { Inter } from "next/font/google";
import { client } from "@/sanity/clients";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AAP Regel og informasjonsanalyse",
  description: "Frontend for AAP Regel og informasjonsanalyse",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await client.fetch(
    `
    {
      "kapittel11": *[_type == "chapter" && chapter == 11][0]{
        "paragraphs": containsParagraphs[]-> | order(paragraph asc).paragraph
      } 
    }`
  );

  return (
    <html lang="no">
      <body>
        <AppHeader />
        <div className={styles.container}>
          <nav className={styles.menu}>
            <Link as={NextLink} href="/">
              Forside
            </Link>
            <Link as={NextLink} href="/chapter/11">
              Kap. 11 paragraf og ledd
            </Link>
            {menuItems.kapittel11.paragraphs.map((paragraph: number) => (
              <Link
                as={NextLink}
                href={`/chapter/11/${paragraph}`}
                key={paragraph}
              >
                §11-{paragraph}
              </Link>
            ))}
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
