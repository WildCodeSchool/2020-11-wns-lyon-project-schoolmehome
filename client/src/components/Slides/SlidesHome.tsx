import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Presentation } from '../slideCreation/interfaces';

export const SlidesHome = () => {
    const GET_PRESENTATIONS = gql`
  query findAllPres {findAllPresentation {_id, title, slides{title, htmlContent}}}
`;

  const { loading, error, data } = useQuery(GET_PRESENTATIONS);
  const [presentation, setPresentation] = useState<Presentation[]>([])
  const [selectedPres, setSelectedPres] = useState<string>();
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      if (data.findAllPresentation.length > 0) {
        setPresentation(data.findAllPresentation)
        setSelectedPres(data.findAllPresentation[0]._id)
      }
    }
  }, [data])

    return(
        <div>
            <Link to="/slides/creation" className="link">Créer un cour</Link>
            {
                presentation.map( p => {
                    return <div>{p.title}</div>
                })
            }
        </div>
    )
}