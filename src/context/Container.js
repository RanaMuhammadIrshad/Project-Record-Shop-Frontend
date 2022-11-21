import { useEffect } from 'react';
import { useState } from 'react';
import { MyContext } from './MyContext';

export default function Container(props) {
  const [records, setRecords] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/records')
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setRecords(result);
      });
  }, []);

  return (
    <MyContext.Provider
      value={{ records, setRecords, cart, setCart, user, setUser }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
