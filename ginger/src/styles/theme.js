import { css } from 'lit-element';

export const thisDotTheme = css`
  :host {
    --angular: #dd244a;
    --react: #61dafb;
    --vue: #41b883;
    --blue500: #5d78a1;
    --sky500: #13b6da;
    --red700: #e25855;
    --red500: #f46663;
    --grey900: #061328;
    --grey800: #0a1930;
    --grey700: #122541;
    --grey600: #182d4c;
    --grey500: #3a4669;
    --grey400: #626d8e;
    --grey300: #a2b4cf;
    --grey200: #c2cee0;
    --grey100: #ecf1f7;
    --white: #ffffff;
  }

  .td-header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1128px;
    margin-right: auto;
    margin-left: auto;
    padding: 18px 24px;
    box-sizing: border-box;
  }

  .td-select {
    width: 100%;
    height: 40px;
    padding: 8px 44px 8px 16px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #c2cee0;
    color: #061328;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjAwMDE1MzIyMiAyLjU4ODE3TDAgMEw2LjAwMDI1IDUuNDExODRMMTIgMS42MzYyNGUtMDZWMi41ODgxNkw2LjAwMDI1IDhMMC4wMDAxNTMyMjIgMi41ODgxN1oiIGZpbGw9IiNBMkI0Q0YiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: 12px 8px;
    background-position: right 20px top 50%;
  }

  .td-button {
    background-color: var(--white);
    color: var(--grey900);
    display: inline-block;
    border: none;
    text-align: center;
    cursor: pointer;
    font-weight: 600;
    height: 48px;
    font-size: 16px;
    border-radius: 40px;
    text-decoration: none;
    white-space: nowrap;
    padding: 14px 48px;
    box-sizing: border-box;
    -webkit-transition: color 0.25s ease, background-color 0.25s ease;
    transition: color 0.25s ease, background-color 0.25s ease;
  }

  .td-button-outline {
    background-color: var(--grey800);
    color: var(--red500);
    border: 1px solid var(--red500);
    padding: 11px 24px;
    font-size: 14px;
    line-height: 1.25em;
    height: 40px;
  }

  .td-button-active {
  }

  .td-button-inactive {
  }

  .td-button:active {
  }

  .td-button:active:hover {
  }

  .td-range {
    -webkit-appearance: none;
    background-color: var(--white);
    border-radius: 5px;
    outline: none;
    width: 100%;
    height: 20px;
    margin: 0;
  }

  .td-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--blue500);
    border-radius: 5px;
    cursor: pointer;
    height: 20px;
    width: 20px;
  }

  .td-range::-moz-range-thumb {
    appearance: none;
    background-color: var(--blue500);
    border-radius: 5px;
    cursor: pointer;
    height: 20px;
    width: 20px;
  }

  .td-range::-ms-thumb {
    appearance: none;
    background-color: var(--blue500);
    border-radius: 5px;
    cursor: pointer;
    height: 20px;
    width: 20px;
  }

  .td-range::-webkit-slider-runnable-track,
  .td-range::-moz-range-track,
  .td-range::-ms-track {
    width: 100%;
    height: 15px;
  }

  .td-select {
    /* -webkit-appearance: none;
    -moz-appearance: none;
    width: 90%;
    height: 35px;
    margin: 10px 0 20px 20px;
    outline: none;
    background: rgb(70, 70, 70);
    color: #fafafa;
    border: 1px solid rgb(60, 60, 60); */
  }

  @media (min-width: 830px) {
    .td-header {
      padding-top: 33px;
      padding-bottom: 33px;
    }
  }

  @media (max-width: 767px) {
    .td-select {
    }

    .td-button {
    }
  }
`;
