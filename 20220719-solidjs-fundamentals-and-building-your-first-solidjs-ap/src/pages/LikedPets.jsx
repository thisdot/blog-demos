import { createSignal, For } from "solid-js";
import PetCard from "../components/PetCard";

const [cutePets, setCutePets] = createSignal([])

const LikedPets = () => {
  return (
    <div>
      <For each={cutePets()}>
        {pet => <PetCard pet={pet} />}
      </For>
    </div>
  )
}
export {cutePets, setCutePets}
export default LikedPets;