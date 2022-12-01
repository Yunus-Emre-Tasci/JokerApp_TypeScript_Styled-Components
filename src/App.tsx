import React, { useState } from "react";
import axios from "axios";
import {
  Wrapper,
  Row,
  Header,
  Image,
  Form,
  Search,
  Button
} from "./components/styled/index";
import owl from "./images/owl.svg";
import JokeItem from "./components/JokeItem";


type Flag = {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
};

type Joke = {
  id: number;
  category:
    | "Any"
    | "Misc"
    | "Programming"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas";
  flags: Flag;
  setup?: string;
  delivery?: string;
  joke?: string;
  safe: boolean;
  lang: "cs" | "de" | "en" | "es" | "fr" | "pt";
  type: "single" | "twopart";
}; 

const BASE_URL =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious";


const App = () => {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(false)
  const [jokes, setJokes] = useState<Joke[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value)
  };

  const getJokes=async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()

    const ENDPOINT=`${BASE_URL}&contains=${search}&amount=10`
    const {data}=await axios.get(ENDPOINT)
    console.log(data)
    if(data.error){
      setError(true)
      setJokes([])
    }else{
      setError(false)
      setJokes(data.jokes)
    }
    setSearch("")
  }
  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Joker</Header>
          <Image src={owl} alt="Baykus" />
        </Row>
        <Form onSubmit={getJokes}>
          <Search
            type="text"
            placeholder="Search.."
            value={search}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
        <div>
          {error&& <p>Sorry, no jokes found</p>}
          {jokes.length>0 && jokes.map((joke)=> <JokeItem key={joke.id} joke={joke}/>)}
        </div>
      </Wrapper>
    </div>
  );
}

export default App