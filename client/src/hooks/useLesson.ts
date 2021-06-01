import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const useLesson = (_id: string) => {

  const GETONELESSON = gql`
  query findOneLesson (
    $_id: String!
  ) {
    findOneLesson(_id: $_id){
      _id,
      start, 
      end, 
      promo,
      presentation {
        title,
        slides {
          title,
          htmlContent
        }
      },
      subject 
      {name}
    }
  }
`;

  const { loading, error, data } = useQuery<any>(GETONELESSON, {
    variables: { _id},
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(error) console.log(JSON.stringify(error))
    if(data) console.log(data)
  }, [data, error])

  return { loading, error, lesson: data }
}

export default useLesson;