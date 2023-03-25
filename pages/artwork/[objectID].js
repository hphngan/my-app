import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ArtworkCardDetail  from "@/components/ArtworkCardDetail";
import { useRouter } from 'next/router';

export default function objectID() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { objectID } = router.query;
  return (
    <Row>
        <Col>
            <ArtworkCardDetail objectID={objectID} />
        </Col>
    </Row>

  )
}