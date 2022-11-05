import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.css?inline";

export interface HeaderProps {
  menus: {
    name: string;
    link: string;
  }[];
}

export default component$(({ menus }: HeaderProps) => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="https://qwik.builder.io/" target="_blank">
          <QwikLogo />
        </a>
      </div>
      <ul>
        {menus.map((menu) => (
          <li key={menu.name}>
            <a
              href={menu.link}
              target="_blank"
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
});
