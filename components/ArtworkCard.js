import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';


// define the "fetcher" function.  This Can also be defined globally using SWRConfig (https://swr.vercel.app/docs/global-configuration)
const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCard(props)
{
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`;
    
    const { data, error } = useSWR(url, fetcher);
    if (error) {
        return <Error statusCode={404} />;
    }
    if (data)
    {
    return (
        <>
            <Card>
                {data?.primaryImageSmall ? <Card.Img variant="top" src={data?.primaryImageSmall} /> : <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d" />}
                <Card.Body>
                    <Card.Title>{data?.title}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong>{data?.objectDate ? data.objectDate : "N/A" } <br />
                        <strong>Classification: </strong>{data?.classification  ? data?.classification  : "N/A" }<br />
                        <strong>Medium: </strong> {data?.medium  ? data?.medium   : "N/A" }<br /><br />
                        <Link passHref href={`/artwork/${props.objectID}`}><Button variant="outline-primary"><strong>ID: </strong>{props.objectID}</Button>{' '}</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
    }
    else 
        return null
}