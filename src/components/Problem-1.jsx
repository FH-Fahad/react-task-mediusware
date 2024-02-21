import React, { useState, useRef } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const nameInputRef = useRef(null);
  const statusInputRef = useRef(null);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !status) {
      return;
    }

    setData([...data, { name, status }]);
    setName("");
    setStatus("");

    nameInputRef.current.value = "";
    statusInputRef.current.value = "";
    nameInputRef.current.focus();
  };

  const currentData = data.filter((item) => {
    if (show === "all") {
      return item;
    } else if (show === "active") {
      if (item.status === "active") {
        return item;
      }
    } else if (show === "completed") {
      if (item.status === "completed") {
        return item;
      }
    }
  });

  currentData.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") {
      return -1;
    } else if (a.status !== "active" && b.status === "active") {
      return 1;
    } else if (a.status === "completed" && b.status !== "completed") {
      return -1;
    } else if (a.status !== "completed" && b.status === "completed") {
      return 1;
    }
    return 0;
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                ref={nameInputRef}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                ref={statusInputRef}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
