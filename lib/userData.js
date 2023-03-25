import { readToken, removeToken, getToken } from '@/lib/authenticate';

export async function addToFavourites(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "PUT",
        body: JSON.stringify({ id: id}),
        headers: {
          "Authorization": `JWT ${token}`,
          "content-type": "application/json"
        }
      });
    
      const data = await res.json();
    
      if(res.status === 200){
        //setToken(data.token);
        return data;
      }else{
        return []
    }
}

export async function removeFromFavourites(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: id}),
        headers: {
          "Authorization": `JWT ${token}`,
          "content-type": "application/json"
        }
      });
    
      const data = await res.json();
    
      if(res.status === 200){
        //setToken(data.token);
        return data;
      }else{
        return []
    }
}

export async function getFavourites() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: "GET",
        headers: {
          "Authorization": `JWT ${token}`,
          "content-type": "application/json"
        }
      });
    
      const data = await res.json();
    
      if(res.status === 200){
        //setToken(data.token);
        return data;
      }else{
        return []
    }
}

export async function addToHistory(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: "PUT",
        body: JSON.stringify({ id: id}),
        headers: {
          "Authorization": `JWT ${token}`,
          "content-type": "application/json"
        }
      });
    
      const data = await res.json();
    
      if(res.status === 200){
        //setToken(data.token);
        return data;
      }else{
        return []
    }
}

export async function removeFromHistory(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: id}),
        headers: {
          "Authorization": `JWT ${token}`,
          "content-type": "application/json"
        }
      });
    
      const data = await res.json();
    
      if(res.status === 200){
        //setToken(data.token);
        return data;
      }else{
        return []
    }
}

export async function getHistory() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: "GET",
        headers: {
          "Authorization": `JWT ${token}`,
          "content-type": "application/json"
        }
      });
    
      const data = await res.json();
    
      if(res.status === 200){
        //setToken(data.token);
        return data;
      }else{
        return []
    }
}