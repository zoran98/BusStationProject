import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import BusStationAxios from "../../apis/BusStationAxios";
import { Button, ButtonGroup, Table } from "react-bootstrap";


const Lines = () => {

    const [lines, setLines] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [pageNo, setPageNo] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getLines(0);
    }, [])

    const getLines = (newPageNo) => {
        const conf = {
            params: {
                pageNo: newPageNo
            }
        }

        BusStationAxios.get("/linije", conf)
            .then((res) => {
                console.log(res)
                setPageNo(newPageNo)
                setLines(res.data)
                setTotalPages(res.headers['total-pages'])
            })
            .catch((error) => {
                console.log(error)
                alert("Doslo je do greske prilikom ispisivanja linija!")
            })
    }

    const goToAdd = () => {
        navigate("/line/add")
    }

    return (
        <div>
            <h1>Linije</h1>
            <ButtonGroup style={{marginTop: 25, float: "left"}}>
                <Button
                style={{margin: 3, width: 150}} onClick={() => goToAdd()}>
                    Kreiraj liniju
                </Button>
            </ButtonGroup>
            <ButtonGroup style={{ marginTop: 25, float: "right" }}>
                <Button
                    style={{ margin: 3, width: 90 }}
                    disabled={pageNo == 0} onClick={() => getLines(pageNo - 1)}>
                    Prethodna
                </Button>
                <Button
                    style={{ margin: 3, width: 90 }}
                    disabled={pageNo == totalPages - 1} onClick={() => getLines(pageNo + 1)}>
                    Sledeca
                </Button>
            </ButtonGroup>
            <Table bordered striped style={{ marginTop: 5 }}>
                <thead className="thead-dark">
                    <tr>
                        <th>Broj mesta</th>
                        <th>Cena karte</th>
                        <th>Vreme polaska</th>
                        <th>Destinacija</th>
                        <th>Prevoznik</th>
                    </tr>
                </thead>
                <tbody>
                    {lines.map((line) => {
                        return (
                            <tr key={line.id}>
                                <td>{line.brojMesta}</td>
                                <td>{line.cenaKarte}</td>
                                <td>{line.vremePolaska}</td>
                                <td>{line.destinacija}</td>
                                <td>{line.prevoznikNaziv}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )

}

export default Lines;