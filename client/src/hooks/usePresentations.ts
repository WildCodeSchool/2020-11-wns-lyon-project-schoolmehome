import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const usePresentations = () => {

  const GEt_PRES = gql`
  query findAllPresentation {
    findAllPresentation {_id, title, slides {_id, title, htmlContent}}
  }
`;

  const { loading, error, data } = useQuery<any>(GEt_PRES, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(error) console.log(JSON.stringify(error))
    if(data) console.log(data)
  }, [data, error])

  return { loading, error, presentations: data }
}

export default usePresentations;