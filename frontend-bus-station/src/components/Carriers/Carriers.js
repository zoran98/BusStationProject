import { useEffect, useState } from "react";
import BusStationAxios from "../../apis/BusStationAxios";
import { Button, ButtonGroup, Collapse, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Carriers = () => {

    const [carriers, setCarriers] = useState([]);
    const [search, setSearch] = useState({ naziv: "" , pib: "" })
    const [showSearch, setShowSearch] = useState(false)
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

        if (search.naziv != "") {
            conf.params.naziv = search.naziv;
        }

        if (search.pib != "") {
            conf.params.pib = search.pib;
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

    const searchValueInputChange = (e) => {
        let newSearch = { ...search }

        const name = e.target.name;
        const value = e.target.value;

        newSearch[name] = value
        setSearch(newSearch);
    }

    const doSearch = () => {
        getCarriers(0);
    }

    const doDelete = (carrierId) => {
        BusStationAxios.delete("/prevoznici/" + carrierId)
            .then((res) => {
                console.log(res)
                var nextPage
            if(pageNo == totalPages - 1 && carriers.length == 1){
                nextPage = pageNo - 1
            } else {
                nextPage = pageNo
            }
                getCarriers(nextPage)
            })
            .catch((error) => {
                console.log(error)
                alert("Nije uspelo brisanje prevoznika!")
            })
    }

    const goToEdit = (carId) => {
        navigate("/carrier/edit/" + carId);
    }

    return (
        <div>
            <h1>Kategorije</h1>

            <Form.Group style={{ marginTop: 35 }}>
                <Form.Check type="checkbox" label="Show search form" onClick={(e) => setShowSearch(e.target.checked)} />
            </Form.Group> 
            <Collapse in={showSearch}>
            <Form style={{ marginTop: 10 }}>
                    <Form.Group>
                        <Form.Label>Naziv</Form.Label>
                        <Form.Control
                            value={search.naziv}
                            name="naziv"
                            as="input"
                            onChange={(e) => searchValueInputChange(e)}>
                                
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pib</Form.Label>
                        <Form.Control
                            value={search.pib}
                            name="pib"
                            as="input"
                            onChange={(e) => searchValueInputChange(e)}>
                                
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={() => doSearch()}>Pretraga</Button>
                </Form>
                </Collapse>

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
                                            style={{ marginLeft: 5 }}>
                                            Obrisi prevoznika
                                        </Button>,
                                        <Button
                                            variant="warning"
                                            onClick={() => goToEdit(car.id)}
                                            style={{ marginLeft: 5 }}>
                                            Edit
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