import React, { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AuthContext } from '../context/authContext';

const useNextLesson = () => {

  const { user } = useContext(AuthContext)

  const GETLESSON = gql`
  query findNextLesson (
    $email: String!
  ) {
    findNextlesson(email: $email){
      _id,
      start, 
      end, 
      promo {
        name
      },
      subject 
      {name}
    }
  }
`;

  const { loading, error, data } = useQuery<any>(GETLESSON, {
    variables: { email: user.email },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(error) console.log(JSON.stringify(error))
    if(data) console.log(data)
  }, [data, error])

  return { loading, error, nextLesson: data }
}

export default useNextLesson;