"use client";

import { FormEvent, useState } from "react";
import { login } from "./requests/login";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // idle, loading, success, error
  const [status, setStatus] = useState<string>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const response = await login({ name, email });

    if (response.ok) {
      setStatus("success");
      router.push("/dashboard");
    } else {
      setStatus("error");
    }
  }

  if (status === "error") {
    return (
      <Box p="8">
        <Heading>Something went wrong. Please try again.</Heading>
      </Box>
    );
  }

  if (status === "loading") {
    return (
      <Center p="8">
        <Spinner />
      </Center>
    );
  }

  return (
    <Container>
      <Box p="8">
        <Heading as="h1">Let&rsquo;s find you a dog!</Heading>
        <Text fontSize="xl">
          To get started, please enter your name and your email address below.
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl my="2">
            <FormLabel htmlFor="name">Your name</FormLabel>
            <Input
              type="text"
              required={true}
              disabled={status === "loading"}
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl my="2">
            <FormLabel htmlFor="email">Your email address</FormLabel>
            <Input
              type="email"
              required={true}
              disabled={status === "loading"}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormControl>
          <Button my="2" type="submit">
            {status === "loading" ? "Submitting..." : "Enter"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
