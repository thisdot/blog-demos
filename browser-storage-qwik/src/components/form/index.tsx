import { component$, QRL } from "@builder.io/qwik";

interface IProps {
  value: string,
  setValue: QRL<(value: any) => void>
}

export default component$((props: IProps) => {

  return (
    <form>
      <input
        type="text"
        value={props.value}
        onInput$={(e: KeyboardEvent) => {
          const input = e.target as HTMLInputElement;
          props.setValue(input.value)
        }}
        placeholder="Name"
        aria-label="name"
      />
      <input type="button" value="Reset" onClick$={() => props.setValue('Guest') } />
    </form>
  );
});
