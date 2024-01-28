import { useEffect, useState } from "react";
import axios from "axios";
import { Show } from "./modules/Show";
import { ShowType } from "./types";

const App = () => {
  const [shows, setShows] = useState([]);

  const clx = {
      wrapper: 'bg-gray-100 p-4',
      title: 'text-2xl font-bold mb-6',
      content: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await axios.get('/api/shows/all-shows');
      setShows(data);
    }

    fetchAPI();
    const interval = setInterval(fetchAPI, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={clx.wrapper}>
          <h2 className={clx.title}>Today's Deals</h2>
          <div className={clx.content}>
              {shows.length 
                ? 
                shows.map((item: ShowType) => {
                  return (
                    <Show 
                      key={item.id}
                      title={item.title} 
                      imgSrc={item.image}
                      tickets={item.see_tickets_url_infos}
                      soldOut={!item.see_tickets_url_infos.length}
                    />
                  )
                }) 
                : 
              null}
          </div>
      </div>
    </> 
  );
}

export default App;
