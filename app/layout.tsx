import type { Metadata } from "next";
import { Providers } from "./providers/providers";
import { Box, Container, Heading } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Dog fetcher",
  description: "An exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            as="header"
            bgGradient="linear(to-r, pink.700, purple.900)"
            mb="4"
            px="8"
            py="4"
            w="100%"
          >
            <Heading color="yellow.300">Dog Fetcher</Heading>
          </Box>
          <Container maxWidth="1280px">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
