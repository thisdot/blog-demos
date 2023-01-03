const users = [
  {
    id: 'adam',
    name: 'Adam',
    picture: '/profile-pics/adam.jpeg',
  },
  {
    id: 'becky',
    name: 'Becky',
    picture: '/profile-pics/becky.jpeg',
  },
  {
    id: 'charlie',
    name: 'Charlie',
    picture: '/profile-pics/charlie.jpeg',
  },
  {
    id: 'dave-bos',
    name: 'Dave Bos',
    picture: '/profile-pics/dave.jpeg',
  },
  {
    id: 'ernie-d-rector',
    name: 'Ernie D. Rector',
    picture: '/profile-pics/ernie.jpeg',
  },
  {
    id: 'francine-conover',
    name: 'Francine Conover',
    picture: '/profile-pics/francine.jpeg',
  },
];

export const getUsers = async () => {
  return users;
};

export const getUserById = async (id: string) => {
  return users.find((u) => u.id === id);
};
