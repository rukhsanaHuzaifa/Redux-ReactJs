import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UsersList = () => {
  const [userdata, setUserdata] = useState([]);

  const items = useSelector((state) => state.items.items);
  const profileImage = useSelector((state) => state.app.photo);
  useEffect(() => {
    const newArr = items.map((v) => ({
      ...v,
      useProfileImage: profileImage,
    }));
    setUserdata(newArr);
  }, [profileImage, items]);

  return (
    <div className="ms-5 container">
      <h4 className="text-center pt-4 border-bottom">User Lists</h4>
      <div className="row">
        {userdata &&
          userdata.map((item) => (
            <div key={item.id}>
              <img
                className="ms-5"
                width="100px"
                height="100px"
                src={`${item.useProfileImage}`}
              />
              <div>
                <p>
                  <b>Device ID: </b>
                  {item.DeviceID}
                </p>
                <p>
                  <b>lat: </b>
                  {item.lat}
                </p>
                <p>
                  <b>long: </b>
                  {item.long}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersList;
