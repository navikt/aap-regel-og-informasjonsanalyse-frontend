import { Tag } from "@/components/DsClient";
import { client } from "@/sanity/clients";
import { Link } from "@navikt/ds-react/esm/link";
import { Heading } from "@navikt/ds-react/esm/typography";
import NextLink from "next/link";

export default async function Chapter({
  params,
}: {
  params: { chapter: string };
}) {
  const chapter = await client.fetch(
    `*[_type == "chapter" && chapter == ${params.chapter}][0]{
        "paragraphs": containsParagraphs[]-> {
            _id,
            paragraph,
            paragraphShortName,
        } | order(paragraph asc)
    }`
  );

  return (
    <div>
      <Heading level="1" size="xlarge">
        Kapittel {params.chapter}
      </Heading>
      <ul>
        {chapter.paragraphs.map((paragraph: any) => {
          return (
            <li key={paragraph._id}>
              <Link
                as={NextLink}
                href={`/chapter/${params.chapter}/${paragraph.paragraph}`}
              >
                §{params.chapter}-{paragraph.paragraph}{" "}
                {paragraph.paragraphShortName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
