import { FC, PropsWithChildren } from "react";
import Head from "next/head";

interface Props {
   title: string;
   pageDescription: string;
   imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
   children,
   title,
   pageDescription,
   imageFullUrl,
}) => {
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name="description" content={pageDescription} />
            {/* Para compartir en redes sociales */}
            <meta name="og:title" content={title} />
            <meta name="og:description" content={pageDescription} />
            {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
         </Head>

         <nav>{/* TODO: Navbar  */}</nav>

         {/* TODO: Sidebar */}

         <main
            style={{
               margin: "80px auto",
               maxWidth: "1440px",
               padding: "0px 30px",
            }}
         >
            {children}
         </main>

         {/* Footer */}
         <footer>{/* TODO: custom footer */}</footer>
      </>
   );
};
