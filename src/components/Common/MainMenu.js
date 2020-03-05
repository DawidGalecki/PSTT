import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { MENU } from "../../constants";

export function MainMenu() {
  const [activeItem, setActiveItem] = useState(MENU.HOME.NAME);

  return (
    <Menu tabular>
      <Menu.Item
        name={MENU.HOME.NAME}
        active={activeItem === MENU.HOME.NAME}
        onClick={() => setActiveItem(MENU.HOME.NAME)}
      />
      <Menu.Item
        name={MENU.REPORTS.NAME}
        active={activeItem === MENU.REPORTS.NAME}
        onClick={() => setActiveItem(MENU.REPORTS.NAME)}
      />
      <Menu.Menu position="right">
        <Menu.Item>Timer</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
