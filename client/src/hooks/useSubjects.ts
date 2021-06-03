import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const useSubjects = () => {

  const GEt_SUBJECTS = gql`
  query getAllSubjects {
    getAllSubjects {name, _id}
  }
`;

  const { loading, error, data } = useQuery<any>(GEt_SUBJECTS, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(error) console.log(JSON.stringify(error))
    if(data) console.log(data)
  }, [data, error])

  return { loading, error, subjects: data }
}

export default useSubjects;