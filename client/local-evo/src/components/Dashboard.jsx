import React, { useEffect, useState } from "react";
import UserFinder from "../apis/UserFinder";
const Dashboard = () => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await UserFinder.get(`/dashboard`, {
        headers: { token: localStorage.token },
      });
      setName(response.data.user_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="jumbutron">
      <h1>Dashboard of {name}</h1>
      <div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          officiis repellendus repudiandae saepe adipisci eveniet ut at fugiat
          error sed debitis esse, magnam asperiores odit nisi autem perspiciatis
          laboriosam. Accusamus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Hic dicta consequatur recusandae quia soluta sunt
          illum minus, cumque explicabo provident corrupti vitae laudantium
          mollitia doloremque! Suscipit possimus nostrum similique porro.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
