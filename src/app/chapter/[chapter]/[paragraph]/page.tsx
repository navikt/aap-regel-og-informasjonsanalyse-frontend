import { client } from "@/sanity/clients";
import { Heading } from "@navikt/ds-react/esm/typography";
import { PortableText } from "@portabletext/react";

export default async function Paragraph({
  params,
}: {
  params: { chapter: string; paragraph: string };
}) {
  const paragraph = await client.fetch(
    `*[_type == "paragraph" && paragraph == ${params.paragraph}][0]{
            paragraph,
            paragraphShortName,
            "ledd": containsParagraphParts[]{
                _id,
                content,
                paragraphPartWithoutLetters,
                paragraphPartWithoutLettersShortName,
                "decisions": paragraphPartDecisions[]{
                    _id,
                    paragraphPartDecision,
                    relevantInfoElements[]->{
                        _id,
                        infoElement
                    }
                }
            }
        }`
  );

  return (
    <div>
      <Heading level="1" size="xlarge" spacing>
        §{params.chapter}-{paragraph.paragraph} {paragraph.paragraphShortName}
      </Heading>
      {paragraph.ledd?.map((ledd: any) => {
        return (
          <div key={ledd._id}>
            <Heading level="2" size="medium" spacing>
              {ledd.paragraphPartWithoutLetters}. ledd,{" "}
              {ledd.paragraphPartWithoutLettersShortName}
            </Heading>
            <div
              style={{ borderLeft: "1px solid gray", paddingLeft: "0.5rem" }}
            >
              <PortableText value={ledd.content} />
            </div>
            {ledd.decisions?.length > 0 && (
              <div>
                <Heading level="3" size="small" spacing>
                  Vurderinger {ledd.paragraphPartWithoutLetters}. ledd
                </Heading>
                <ul>
                  {ledd.decisions?.map((decision: any) => (
                    <li key={decision._id}>
                      <b>{decision.paragraphPartDecision}</b>
                      <p>Informasjonsgrunnlag:</p>
                      <ul>
                        {decision.relevantInfoElements?.map(
                          (infoElement: any) => (
                            <li key={infoElement._id}>
                              {infoElement.infoElement}
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
