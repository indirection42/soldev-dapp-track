import { Card } from "./Card";
import { FC, useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import { MovieCoordinator } from "../coordinators/MovieCoordinator";
import * as web3 from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { Center, Input, Button, HStack, Spacer } from "@chakra-ui/react";

export const MovieList: FC = () => {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    MovieCoordinator.fetchPage(connection, page, 5, search, search !== "").then(
      setMovies
    );
  }, [page, search]);

  return (
    <div>
      <Center>
        <Input
          id="search"
          color="gray.400"
          placeholder="Search"
          onChange={(event) => setSearch(event.currentTarget.value)}
          w="97%"
          mt={2}
          mb={2}
        />
      </Center>
      {movies.map((movie, i) => {
        return <Card key={i} movie={movie} />;
      })}
      <Center>
        <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>Previous</Button>
          )}
          <Spacer />
          {MovieCoordinator.accounts.length > page * 5 && (
            <Button onClick={() => setPage(page + 1)}>Next</Button>
          )}
        </HStack>
      </Center>
    </div>
  );
};
