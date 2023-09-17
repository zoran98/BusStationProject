import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusStationAxios from "../../apis/BusStationAxios";
import { Button, ButtonGroup, Collapse, Form, Table } from "react-bootstrap";

const Lines = () => {
  const [lines, setLines] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [search, setSearch] = useState({ prevoznikId: -1, destinacija: "" });
  const [showSearch, setShowSearch] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCarriers();
    getLines(0);
  }, []);

  const getLines = (newPageNo) => {
    const conf = {
      params: {
        pageNo: newPageNo,
      },
    };
    if (search.prevoznikId != -1) {
      conf.params.prevoznikId = search.prevoznikId;
    }

    if (search.destinacija != "") {
      conf.params.destinacija = search.destinacija;
    }

    BusStationAxios.get("/linije", conf)
      .then((res) => {
        console.log(res);
        setPageNo(newPageNo);
        setLines(res.data);
        setTotalPages(res.headers["total-pages"]);
      })
      .catch((error) => {
        console.log(error);
        alert("Doslo je do greske prilikom ispisivanja linija!");
      });
  };

  const getCarriers = () => {
    BusStationAxios.get("/prevoznici")
    .then((res) => {
      console.log(res)
      setCarriers(res.data)
    })
    .catch((error) => {
      console.log(error)
      alert("Doslo je do greske prilikom dobavljanja prevoznika!");
    })
  }

  const goToAdd = () => {
    navigate("/line/add");
  };

  const goToEdit = (lineId) => {
    navigate("/line/edit/" + lineId);
  };

  const doSearch = () => {
    getLines(0);
  };

  const searchValueInputChange = (e) => {
    let newSearch = { ...search };

    const name = e.target.name;
    const value = e.target.value;

    newSearch[name] = value;
    setSearch(newSearch);
  };

  const doDelete = (lineId) => {
    BusStationAxios.delete("/linije/" + lineId)
      .then((res) => {
        console.log(res);
        var nextPage;
        if (pageNo == totalPages - 1 && lines.length == 1) {
          nextPage = pageNo - 1;
        } else {
          nextPage = pageNo;
        }
        getLines(nextPage);
      })
      .catch((error) => {
        console.log(error);
        alert("Doslo je do greske prilikom brisanja!");
      });
  };

  return (
    <div>
      <h1>Linije</h1>
      <Form.Group style={{ marginTop: 35 }}>
        <Form.Check
          type="checkbox"
          label="Show search form"
          onClick={(e) => setShowSearch(e.target.checked)}
        />
      </Form.Group>
      <Collapse in={showSearch}>
        <Form style={{ marginTop: 10 }}>
          <Form.Group>
            <Form.Label>Prevoznici</Form.Label>
            <Form.Control
              onChange={(e) => searchValueInputChange(e)}
              name="prevoznikId"
              value={search.prevoznikId}
              as="select"
            >
              <option value={-1}>Odaberi prevoznika</option>
              {carriers.map((car) => {
                return (
                  <option value={car.id} key={car.id}>
                    {car.naziv}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Destinacija</Form.Label>
            <Form.Control
              value={search.destinacija}
              name="destinacija"
              as="input"
              onChange={(e) => searchValueInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Button onClick={() => doSearch()}>Pretraga</Button>
        </Form>
      </Collapse>

      <ButtonGroup style={{ marginTop: 25, float: "left" }}>
        <Button style={{ margin: 3, width: 150 }} onClick={() => goToAdd()}>
          Kreiraj liniju
        </Button>
      </ButtonGroup>
      <ButtonGroup style={{ marginTop: 25, float: "right" }}>
        <Button
          style={{ margin: 3, width: 90 }}
          disabled={pageNo == 0}
          onClick={() => getLines(pageNo - 1)}
        >
          Prethodna
        </Button>
        <Button
          style={{ margin: 3, width: 90 }}
          disabled={pageNo == totalPages - 1}
          onClick={() => getLines(pageNo + 1)}
        >
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
            <th></th>
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
                <td>
                  {window.localStorage["role"] == "ROLE_ADMIN"
                    ? [
                        <Button
                          variant="danger"
                          onClick={() => doDelete(line.id)}
                          style={{ marginLeft: 5 }}
                        >
                          Obrisi liniju
                        </Button>,
                        <Button
                          variant="warning"
                          onClick={() => goToEdit(line.id)}
                          style={{ marginLeft: 5 }}
                        >
                          Izmena
                        </Button>,
                      ]
                    : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Lines;
