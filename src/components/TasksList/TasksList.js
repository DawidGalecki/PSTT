import React from "react";
import { List } from "semantic-ui-react";

export function TasksList() {
  const tasksList = [
    {
      id: 1,
      icon: "play",
      name: "Zadanie testowe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a velit mauris. Integer sed metus et massa pretium bibendum. Suspendisse fermentum tristique volutpat. Duis eleifend dolor at elit volutpat dictum. Aenean faucibus et ipsum eget venenatis. Nullam venenatis velit ipsum, non sagittis diam aliquet in. Nam dictum diam ex, in lacinia ipsum finibus eget. Aliquam vitae convallis odio, ut feugiat nunc. Curabitur tincidunt molestie laoreet. Suspendisse consequat porta posuere. Morbi faucibus justo et justo tempus interdum. Praesent eleifend quis velit quis mattis. Vestibulum semper, justo sit amet laoreet ornare, justo mauris dictum erat, a tempus nisi diam eget magna. Quisque in euismod metus. Fusce pulvinar turpis sed iaculis ultrices. Ut vitae porttitor nunc, in congue ipsum."
    },
    {
      id: 2,
      icon: "play",
      name: "Kolejne zadanie testowe",
      description:
        "Nulla interdum dui eget molestie fringilla. Etiam vel diam hendrerit, venenatis odio et, sagittis lorem. Donec bibendum posuere bibendum. In commodo ipsum eu massa accumsan, ullamcorper consequat quam vestibulum. Sed fringilla, ante nec efficitur rhoncus, sapien tellus auctor elit, ac dapibus sem dui quis lorem. Sed sit amet turpis pharetra erat ultricies consequat. Donec at rhoncus nibh, nec facilisis lacus. Mauris dictum pharetra tristique. Integer egestas nibh a placerat hendrerit."
    }
  ];

  const tasks = tasksList.map((task) => {
    return (
      <List.Item>
        <List.Icon name={task.icon} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>{task.name}</List.Header>
          <List.Description>{task.description}}</List.Description>
        </List.Content>
      </List.Item>
    );
  });

  return (
    <List divided relaxed>
      {tasks}
    </List>
  );
}
