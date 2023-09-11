import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BusStationAxios from "../../apis/BusStationAxios";

const EditLine = () => {

const [line, setLine] = useState({});
const [carrier, setCarrier] = useState([]);
const navigate = useNavigate();
const routeParams = useParams();

useEffect(() => {
    getData();
}, [])

const getData = () => {
    getCarrier();
    getLine();
}

const getLine = () => {
    BusStationAxios.get("/linije/" + routeParams.id)
    .then((res) => {
        console.log(res)
        setLine(res.data)
    })
    .catch((error) => {
        console.log(error)
        alert("Doslo je do greske prilikom dobavljanja linije!");
    })
};

const doEdit = () => {
    BusStationAxios.put("/linije/" + routeParams.id, line)
    .then((res) => {
        console.log(res)
        navigate("/lines")
    })
    .catch((error) => {
        console.log(error)
        alert("Doslo je do greske prilikom izmene linije!")
    })
};

const getCarrier = () => {
    BusStationAxios.get("/prevoznici")
    .then((res) => {
        console.log(res)
        setCarrier(res.data)
    })
    .catch((error) => {
        console.log(error)
        alert("Doslo je do greske prilikom dobavljanja prevoznika!")
    })
}

    const valueInputChange = (e) => {
        let editetLine = { ...line }

        const name = e.target.name
        const value = e.target.value

        editetLine[name] = value;
        setLine(editetLine);
    };

  return (
    <div>
      <h1>Izmena linije</h1>
      <Form>
        <Form.Group>
          <Form.Label>Broj mesta</Form.Label>
          <Form.Control
            onChange={(e) => valueInputChange(e)}
            name="brojMesta"
            value={line.brojMesta}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cena karte</Form.Label>
          <Form.Control
            onChange={(e) => valueInputChange(e)}
            name="cenaKarte"
            value={line.cenaKarte}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Vreme polaska</Form.Label>
          <Form.Control
            onChange={(e) => valueInputChange(e)}
            name="vremePolaska"
            value={line.vremePolaska}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Destinacija</Form.Label>
          <Form.Control
            onChange={(e) => valueInputChange(e)}
            name="destinacija"
            value={line.destinacija}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Prevoznik</Form.Label>
          <Form.Control
            onChange={(e) => valueInputChange(e)}
            name="prevoznikId"
            value={line.prevoznikId}
            as="select"
          >
            <option value={-1}>Odaberi prevoznika</option>
            {carrier.map((car) => {
              return (
                <option value={car.id} key={car.id}>
                  {car.naziv}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => doEdit()}
        >
          Izmeni liniju
        </Button>
      </Form>
    </div>
  );
};

export default EditLine;
