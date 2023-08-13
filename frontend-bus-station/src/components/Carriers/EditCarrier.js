import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BusStationAxios from "../../apis/BusStationAxios";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

const EditCarrier = () => {

    const [carrier, setCarrier] = useState({})
    const navigate = useNavigate()
    const routeParams = useParams()

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getCarrier();
    }

    const getCarrier = () => {
        BusStationAxios.get("/prevoznici/" + routeParams.id)
            .then((res) => {
                console.log(res)
                setCarrier(res.data)
            })
            .catch((error) => {
                console.log(error)
                alert("Doslo je do greske prilikom dobavljanja prevoznici!")
            })
    }

    const doEdit = () => {
        BusStationAxios.put("/prevoznici/" + routeParams.id, carrier)
            .then((res) => {
                console.log(res)
                navigate("/carriers")
            })
            .catch((error) => {
                console.log(error)
                alert("Doslo je do greske prilikom izmene polaznika!")
            })
    }

    const valueInputChange = (e) => {
        let editetCarrier = { ...carrier };

        const name = e.target.name;
        const value = e.target.value;

        editetCarrier[name] = value;
        setCarrier(editetCarrier);
    }

    return (
        <div>
            <h5>Prevoznik</h5>
            <Form>
                <FormGroup>
                    <FormLabel>Naziv</FormLabel>
                    <FormControl
                        onChange={(e) => valueInputChange(e)}
                        name="naziv"
                        value={carrier.naziv}
                        as="input">
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Adresa</FormLabel>
                    <FormControl
                        onChange={(e) => valueInputChange(e)}
                        name="adresa"
                        value={carrier.adresa}
                        as="input">
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>PIB</FormLabel>
                    <FormControl
                        onChange={(e) => valueInputChange(e)}
                        name="pib"
                        value={carrier.pib}
                        as="input">
                    </FormControl>
                </FormGroup>
                <Button variant="primary" onClick={() => doEdit()}>
                    Izmeni prevoznika
                </Button>
            </Form>
        </div>
    )

}

export default EditCarrier;