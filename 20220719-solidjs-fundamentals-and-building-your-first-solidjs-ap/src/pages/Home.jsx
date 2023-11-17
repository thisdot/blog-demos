import { For } from "solid-js";
import { pets } from "../App";
import PetCard from "../components/PetCard"

const Home = () => {
  return (
    <div>
      <h2>List of Awesome Pets</h2>
      <For each={pets()}>
        {(pet => <PetCard pet={pet} />)}
      </For>
    </div>
  )
}

export default Home;