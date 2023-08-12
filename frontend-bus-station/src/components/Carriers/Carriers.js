import { useEffect, useState } from "react";
import BusStationAxios from "../../apis/BusStationAxios";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Carriers = () => {

    const [carriers, setCarriers] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [pageNo, setPageNo] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getCarriers(0);
    }, [])

    const getCarriers = (newPageNo) => {
        const conf = {
            params: {
                pageNo: newPageNo
            }
        }

        BusStationAxios.get("/prevoznici", conf)
            .then((res) => {
                console.log(res)
                setPageNo(newPageNo)
                setCarriers(res.data)
                setTotalPages(res.headers['total-pages'])
            })
            .catch((error) => {
                console.log(error)
                alert("Doslo je do greske prilikom ispisivanja prevoznika!")
            })
    }

    const goToAdd = () => {
        navigate("/carrier/add")
    }

    const doDelete = (carrierId) => {
        BusStationAxios.delete("/prevoznici/" + carrierId)
        .then((res) => {
            console.log(res)
            getCarriers()
        })
        .catch((error) => {
            console.log(error)
            alert("Nije uspelo brisanje prevoznika!")
        })
    }

    return (
        <div>
            <h1>Kategorije</h1>
            <ButtonGroup style={{ marginTop: 25, float: "left" }}>
                <Button style={{ margin: 3, width: 200 }} onClick={() => goToAdd()}>
                    Kreiraj prevoznika
                </Button>
            </ButtonGroup>
            <ButtonGroup style={{ marginTop: 25, float: "right" }}>
                <Button
                    style={{ margin: 3, width: 90 }}
                    disabled={pageNo == 0} onClick={() => getCarriers(pageNo - 1)}>
                    Prethodna
                </Button>
                <Button
                    style={{ margin: 3, width: 90 }}
                    disabled={pageNo == totalPages - 1} onClick={() => getCarriers(pageNo + 1)}>
                    Sledeca
                </Button>
            </ButtonGroup>

            <Table bordered striped style={{ marginTop: 5 }}>
                <thead className="thead-dark">
                    <tr>
                        <th>Naziv</th>
                        <th>Adresa</th>
                        <th>Pib</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {carriers.map((car) => {
                        return (
                            <tr key={car.id}>
                                <td>{car.naziv}</td>
                                <td>{car.adresa}</td>
                                <td>{car.pib}</td>
                                <td>
                                    {window.localStorage['role'] == "ROLE_ADMIN" ?
                                        [<Button
                                            variant="danger"
                                            onClick={() => doDelete(car.id)}
                                            style={{marginLeft: 5}}>
                                        Obrisi prevoznika
                                        </Button>] : null}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )

}

export default Carriers;