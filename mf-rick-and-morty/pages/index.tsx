import Head from "next/head";
import CharacterList from "@/components/character-list";

export default function Home(props: { lang: string }) {
  return (
    <>
      <Head>
        <title>Rick and morty</title>
        <meta name="description" content="Rick and morty characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <CharacterList />
        {JSON.stringify(props)}
      </div>
    </>
  );
}


Home.getInitialProps = async () => {
  const fallback = {
    lang: "es"
  };
  return Promise.resolve(fallback);
};