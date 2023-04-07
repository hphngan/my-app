import { useState } from "react"
import { useRouter } from "next/router"
import Error from "next/error";
import { Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { Pagination } from "react-bootstrap";
import useSWR from 'swr';
import { useEffect } from "react";
import validObjectIDList from "@/public/data/validObjectIDList.json";
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'

export default function Favourites(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

    if(!favouritesList) return null;
     
    else if (favouritesList.length > 0)
    {
        return (
            <>
                <Row className="gy-4">
                {favouritesList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
    else {
        return(
            <>
                <Card>
                    <Card.Body>
                        <Card.Title><h4>Nothing Here </h4></Card.Title>
                            <Card.Text>
                                Try adding some new artwork to the list.
                            </Card.Text>
                                  
                    </Card.Body>
                </Card>
            </>
        )
  }
                  
}