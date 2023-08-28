import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BusStationAxios from "../../apis/BusStationAxios"
import { Button, Form } from "react-bootstrap"


const AddLine = () => {

    const emptyLine = {
        brojMesta: "",
        cenaKarte: "",
        vremePolaska: "",
        destinacija: "",
        prevoznikId: -1
    }

    const [line, setLine] = useState(emptyLine)
    const [carrier, setCarrier] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getCarrier();
    }

    const getCarrier = () => {
        BusStationAxios.get("/prevoznici")
        .then((res) => {
            console.log(res)
            setCarrier(res.data)
        })
        .catch((error) => {
            console.log(error)
            alert("Doslo je do greske prilikom pribavljanja prevoznika")
        })
    }

    const doAdd = () => {
        BusStationAxios.get("/linije/", line)
        .then((res) => {
            console.log(res)
            setLine(line)
            navigate("/lines")
        })
        .catch((error) => {
            console.log(error)
            alert("Doslo je do greske prilikom dodavanja linije")
        })
    }

    const canCreateLine = () => {
        return (line.brojMesta != "" && line.brojMesta >= 0 && line.brojMesta <= 99999 && line.brojMesta % 1 == 0)&&
                (line.cenaKarte != "" && line.cenaKarte >= 0 && line.cenaKarte <= 99999)&&
                line.vremePolaska != "" &&
                line.destinacija != "" &&
                line.prevoznikId != -1
    }

    const addValueInputChange = (e) => {
        let newLine = { ...line }

        const name = e.target.name;
        const value = e.target.value;

        newLine[name] = value
        setLine(newLine);
    }

    return (
        <div>
            <h1>Dodavanje linije</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Broj mesta</Form.Label>
                    <Form.Control
                        onChange={(e) => addValueInputChange(e)}
                        name="brojMesta"
                        value={line.brojMesta}
                        as="input"
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cena karte</Form.Label>
                    <Form.Control
                        onChange={(e) => addValueInputChange(e)}
                        name="cenaKarte"
                        value={line.cenaKarte}
                        as="input"
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Vreme polaska</Form.Label>
                    <Form.Control
                        onChange={(e) => addValueInputChange(e)}
                        name="vremePolaska"
                        value={line.vremePolaska}
                        as="input"
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Destinacija</Form.Label>
                    <Form.Control
                        onChange={(e) => addValueInputChange(e)}
                        name="destinacija"
                        value={line.destinacija}
                        as="input"
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prevoznik</Form.Label>
                    <Form.Control
                        onChange={(e) => addValueInputChange(e)}
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
                <Button disabled={!canCreateLine()} variant="primary" onClick={() => doAdd()}>
                    Kreiraj liniju
                </Button>
            </Form>
        </div>
    )

}

export default AddLine;