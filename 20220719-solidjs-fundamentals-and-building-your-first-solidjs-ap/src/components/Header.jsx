import { NavLink } from "solid-app-router";
import { cutePets } from "../pages/LikedPets";


const Header = () => {
  return (
    <div>
      <h2 class="text-decoration-none">
        <NavLink href="/" class="text-decoration-none">Cute Pets App</NavLink> 
      </h2>
        <small><NavLink href="/likedpets">Liked Pets {cutePets().length}</NavLink></small>
    </div>
  )
}

export default Header;