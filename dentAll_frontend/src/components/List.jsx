import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';

const List = ({path}) => {
  let navigate = useNavigate()

  const [data, setData] = useState("");

  const fetchData = async () => {

    try {
     
      let token = localStorage.getItem("token")

      if (token === null) {
        navigate("/");
        return;
      }

      console.log(token)
      const response = await fetch(`${baseUrl}/api/${path}`, {
        method: "GET",
        headers: {
          "Authorization": `${token}`,
        }
      });

      console.log(response);
      if (response.ok) {
        setData(await response.json());
      }

    } catch (error) {
      console.log("greska pri dohvacanju podataka");
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <p>hey</p>
    </div>
  );
};

export default List
