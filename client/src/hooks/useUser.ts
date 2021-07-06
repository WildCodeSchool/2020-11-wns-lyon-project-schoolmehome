import React, { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AuthContext } from '../context/authContext';

const useUser = () => {

  const { user } = useContext(AuthContext)

  const GETUSER = gql`
  query getOne (
    $email: String!
  ) {
    getOne(email: $email) {
      _id,
      email,
      promos {
        _id
        name
      },
      lessons
        {
          _id
          start, 
          end, 
          promo
          subject {
            _id, 
            name
          },
          presentation {
            _id,
            title
          }
        }
      }
  }
`;

  const { loading, error, data } = useQuery<any>(GETUSER, {
    variables: { email: user.email },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(error) console.log(JSON.stringify(error))
    if(data) console.log(data)
  }, [data, error])

  return { loading, error, user: data }
}

export default useUser;