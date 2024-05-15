import WrapperComponent from "@/app/common-client-component/components/wrapper-component";

export default function CommonClientComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Common Client Component Layout</h1>
      <WrapperComponent>{children}</WrapperComponent>
    </div>
  );
}
