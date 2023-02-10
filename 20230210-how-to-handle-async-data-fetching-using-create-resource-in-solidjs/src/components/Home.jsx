import { NavLink } from '@solidjs/router';

const Home = () => {
  return (
    <div class="flex flex-col gap-2 items-center text-blue-800 underline text-base">
      <NavLink
        href="/product-example"
        class="hover:text-blue-500 transition-colors delay-100"
      >
        See Products example component
      </NavLink>
      <NavLink
        href="/github-example"
        class="hover:text-blue-500 transition-colors delay-100"
      >
        See Github example component
      </NavLink>
    </div>
  );
};

export default Home;
