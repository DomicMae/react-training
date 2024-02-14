import React from "react";

function NavigationBar() {
  return (
    <div className="flex w-full px-8 py-4 bg-black text-white justify-between">
      <h1 className="text-2xl font-bold">Ardon Site</h1>
      <div className="gap-2 hidden md:flex">
        <a className="p-2">Home</a>
        <a className="p-2">About Us</a>
        <a className="p-2">React</a>
      </div>
    </div>
  );
}

export default NavigationBar;
