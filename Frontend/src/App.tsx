import { gql, useQuery } from "@apollo/client";
const query = gql`
  query giveData {
    getUsers {
      name
      email
      username
    }
  }
`;

type UserType = {
  name: string;
  email: string;
  username: string;
};

function App() {
  const { data, loading } = useQuery<{ getUsers: UserType[] }>(query);

  if (loading) return <h1>Loading...</h1>;
  console.log(data);

  return (
    <>
      {data?.getUsers?.map(({ name, email, username }: UserType) => (
        <div key={name}>
          <h1>{name}</h1>
          <h1>{email}</h1>
          <h1>{username}</h1>
        </div>
      ))}
    </>
  );
}

export default App;
