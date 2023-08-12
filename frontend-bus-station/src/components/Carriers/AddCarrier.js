import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusStationAxios from "../../apis/BusStationAxios";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";


const AddCarrier = () => {

    const emptyCarrier = {
        naziv: "",
        adresa: "",
        pib: ""
    }

    const[carrier, setCarrier] = useState(emptyCarrier)
    const navigate = useNavigate()

    const doAdd = () => {
        BusStationAxios.post("/prevoznici", carrier)
        .then((res) => {
            console.log(res)
            setCarrier(carrier)
            navigate("/carriers")
        })
        .catch((error) => {
            console.log(error)
            alert("Doslo je do greske prilikom dodavanje prevoznika!")
        })
    }

    const canCreateCarrier = () => {
        return carrier.naziv != "" &&
                carrier.adresa != "" &&
                carrier.pib != ""
    }

    const addValueInputChange = (e) => {
        let newCarrier = { ...carrier }

        const name = e.target.name
        const value = e.target.value

        newCarrier[name] = value
        setCarrier(newCarrier);
    }

    return (
        <div>
            <h5>Dodavanje prevoznika</h5>
            <Form>
                <FormGroup>
                    <FormLabel>Naziv</FormLabel>
                    <FormControl
                        onChange={(e) => addValueInputChange(e)}
                        name = "naziv"
                        value = {carrier.naziv}
                        as="input">
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Adresa</FormLabel>
                    <FormControl
                        onChange={(e) => addValueInputChange(e)}
                        name = "adresa"
                        value = {carrier.adresa}
                        as="input">
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>PIB</FormLabel>
                    <FormControl
                        onChange={(e) => addValueInputChange(e)}
                        name = "pib"
                        value = {carrier.pib}
                        as="input">
                    </FormControl>
                </FormGroup>
                <Button disabled={!canCreateCarrier()} variant="danger" onClick={() => doAdd()}>
                    Kreiraj prevoznika
                </Button>
            </Form>
        </div>
    )

}

export default AddCarrier;