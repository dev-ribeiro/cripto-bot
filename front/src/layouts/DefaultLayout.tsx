import { Outlet } from "react-router-dom";

export function DefaultLayout() {

  return (
    <div className="min-h-screen max-h-screen flex flex-col">

      <header className="py-4 px-2 flex justify-center md:justify-start text-gray-100 bg-green-600">
        <h1 className="text-xl">Cripto BOT</h1>
      </header>

      <Outlet />

      <footer></footer>

    </div>
  );
}
