import { RocketIcon } from "@radix-ui/react-icons";

export function Logo() {
  return (
    <div className="h-10 w-full gap-7 flex flex-row items-center justify-start rounded-md">
      <RocketIcon className="w-5 h-5 text-primary" />
      <p className="text-primary text-sm font-semibold">Super Mega Vendas</p>
    </div>
  );
}
