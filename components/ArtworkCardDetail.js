import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'
import { useState } from 'react';
import { addToFavourites } from '@/lib/userData';
import { removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';

// define the "fetcher" function.  This Can also be defined globally using SWRConfig (https://swr.vercel.app/docs/global-configuration)
const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCardDetail(props)
{
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`;
    
    //const { data, error } = useSWR(url, fetcher);
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])
    

    async function favouritesClicked(){
        if (showAdded == true)
        {
            setFavouritesList(await removeFromFavourites(props.objectID)) 
            //setFavouritesList(current => current.filter(fav => fav != props.objectID));
            setShowAdded(n => n = false)
        }
        else{
            setFavouritesList(await addToFavourites(props.objectID))
            //setFavouritesList(current => [...current, props.objectID]);
            setShowAdded(n => n = true)
        }
    }

    if (error) {
        return <Error statusCode={404} />;
    }
    if (data)
    {
    return (
        <>
            <Card >
                {data?.primaryImage && <Card.Img variant="top" src={data?.primaryImage} /> }
                <Card.Body>
                    <Card.Title>{data?.title}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong>{data?.objectDate ? data.objectDate  : "N/A" } <br />
                        <strong>Classification: </strong>{data?.classification  ? data?.classification  : "N/A" }<br />
                        <strong>Medium: </strong>{data?.medium  ? data?.medium  : "N/A" }<br />
                        <br />
                        <strong>Artist: </strong>{data?.artistDisplayName ? (<span>{data.artistDisplayName}{data.artistWikidata_URL ? <span>{' ( '}<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>{' )'}</span> : null}</span>) : ("N/A")}<br />
                        <strong>Credit Line: </strong>{data?.creditLine  ? data?.creditLine  : "N/A" }<br />
                        <strong>Dimensions: </strong>{data?.dimensions  ? data?.dimensions   : "N/A" }<br /><br />
                        <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>{showAdded ? '+ Favourite ( added )' : '+ Favourite'}</Button>
                        
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
    }
    else
        return null
}