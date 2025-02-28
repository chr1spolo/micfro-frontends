import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from "@module-federation/nextjs-mf/utils";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    if (
      process.env.NODE_ENV === "development" &&
      !ctx.req?.url?.includes("_next")
    ) {
      await revalidate().then((shouldReload) => {
        if (shouldReload) {
          ctx.res?.writeHead(302, { Location: ctx.req?.url });
          ctx.res?.end();
        }
      });
    } else {
      ctx?.res?.on("finish", () => {
        revalidate();
      });
    }
    const initialProps = await Document.getInitialProps(ctx);
    const chunks = await flushChunks();

    return {
      ...initialProps,
      chunks,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <FlushedChunks
            chunks={
              "chunks" in this.props ? (this.props.chunks as string[]) : []
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
