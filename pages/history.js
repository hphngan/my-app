import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store'
import { useRouter } from 'next/router'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from 'react-bootstrap'
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';


export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  async function removeHistoryClicked(e, index){
    e.stopPropagation();
    /*setSearchHistory(current => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });*/
    setSearchHistory(await removeFromHistory(searchHistory[index])) 
  };

  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  if(!parsedHistory) return null;

  else if (parsedHistory.length > 0){
    return(
        <>
            <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
              {Object.keys(historyItem).map(key => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
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
                      Try searching for some artwork.
                      </Card.Text>
                    
                  </Card.Body>
          </Card>
          
      </>
  )
}

}
