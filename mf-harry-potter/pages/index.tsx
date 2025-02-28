import Head from "next/head";
import CharacterList from "@/components/character-list";

export default function Home(props: { lang: string }) {
  return (
    <>
      <Head>
        <title>Harry Potter</title>
        <meta name="description" content="Harry Potter characters" />
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
    lang: "es",
  };
  return Promise.resolve(fallback);
};
