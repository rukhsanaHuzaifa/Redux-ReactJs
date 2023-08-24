import React from "react";
import "./Style.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

const MainPage = () => {
  const app = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const videoRef = React.createRef();

  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(stream);
    videoRef.current.srcObject = stream;
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoDataUrl = canvas.toDataURL("image/jpeg");

    dispatch({ type: "PHOTO", data: photoDataUrl });
    stopCamera();
    getDeviceID();
    getLocation();
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const getDeviceID = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    // setDeviceID(videoDevices[0]?.deviceId || "");
    const id = videoDevices[0]?.deviceId || "";
    dispatch({ type: "DEVICEID", data: id });
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setLatitude(position.coords.latitude);
        // setLongitude(position.coords.longitude);
        dispatch({ type: "LATITUDE", data: position.coords.latitude });
        dispatch({ type: "LONGITUDE", data: position.coords.longitude });
      });
    } else {
      console.log("Geolocation is not available");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("photo", app.photo);
    formData.append("deviceID", app.deviceID);
    formData.append("latitude", app.latitude);
    formData.append("longitude", app.longitude);

    try {
      const response = await axios.post("https://httpbin.org/post", formData);
      console.log("Form submitted:", response.data);
      // alert("User Information saved Successfully!");
      // navigate("/user-lists");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container justify-content-center  mb-3 mt-3 pb-3 text-center   "
        style={{ width: "50%" }}
      >
        <div
          className=" form m-3 p-2 fw-bold text-white"
          style={{ backgroundColor: "#f16c51" }}
        >
          User Information
        </div>

        <div>
          {app.photo ? (
            <img
              className="pb-3"
              style={{ width: "15rem", height: "10rem" }}
              src={app.photo}
              alt="Captured"
            />
          ) : (
            <div className="text-start mb-5 pt-5">
              <video
                className="container mb-5 ms-5 "
                style={{ width: "10rem", height: "10rem" }}
                ref={videoRef}
                autoPlay
              />
              <button className="btn btn-primary " onClick={startCamera}>
                Start Camera
              </button>
              <button className="btn btn-success ms-2" onClick={capturePhoto}>
                Capture Photo
              </button>
              <button className="btn btn-danger ms-2" onClick={stopCamera}>
                Stop Camera
              </button>
            </div>
          )}
        </div>
        <div className="mb-3 row">
          <label htmlFor="deviceid" className="col-sm-2 col-form-label fw-bold">
            Device Id
          </label>
          <div className="col-sm-10">
            <input
              value={app.deviceID}
              type="deviceid"
              className="form-control"
              id="deviceid"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="lat" className="col-sm-2 col-form-label fw-bold">
            Lat
          </label>
          <div className="col-sm-10">
            <input
              value={app.latitude}
              // onChange={(e) => {
              //   dispatch({ type: "LATITUDE", data: e.target.value });
              // }}
              type="lat"
              className="form-control"
              id="lat"
            />
          </div>
        </div>
        <div className="mb-3 row ">
          <label htmlFor="long" className="col-sm-2  col-form-label fw-bold ">
            Long
          </label>
          <div className="col-sm-10">
            <input
              value={app.longitude}
              type="long"
              className="form-control"
              id="long"
            />
          </div>
        </div>
        <div>
          <Link to="/user-lists">
            <button
              type="submit"
              className="btn btn-secondary border-dark ps-5 pe-5 fw-bold "
            >
              Save
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default MainPage;
