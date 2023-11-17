import Header from "./components/Header";
import {Routes, Route} from 'solid-app-router';
import Home from "./pages/Home";
import SavedPets from "./pages/LikedPets";
import { createEffect, createSignal } from "solid-js";

const [pets, setPets] = createSignal("")

createEffect(async () => {
  const res = await fetch(`http://pets-v2.dev-apis.com/pets`)
  const json = await res.json()
  setPets(json.pets)
  console.log(json.pets)
})


function App() {
  return (
    <div class="container">
      <Header />
      <Routes>
        <Route element={<Home />} end path='/' />
        <Route element={<SavedPets />} path='/likedpets' />
      </Routes>
    </div>
  );
}

export {pets}

export default App;
