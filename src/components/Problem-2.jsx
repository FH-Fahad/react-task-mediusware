import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { debounce } from "lodash";

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchContacts, setSearchContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({
    id: null,
    phone: null,
    country: null,
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContacts(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const delaySearch = debounce(() => {
      return contacts.filter(
        (contact) =>
          contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, 300);

    delaySearch();

    return delaySearch.cancel; // Cleanup debounce on component unmount
  }, [searchQuery]);

  const openModalA = () => {
    setModalAOpen(true);
    setModalBOpen(false);
    setModalCOpen(false);
  };

  const openModalB = () => {
    setModalAOpen(false);
    setModalBOpen(true);
    setModalCOpen(false);
  };

  const openModalC = () => {
    setModalCOpen(true);
    setModalAOpen(false);
    setModalBOpen(false);
  };

  const closeModal = () => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      setContacts(contacts.filter((contact) => contact.id % 2 === 0));
    } else {
      fetchContacts();
    }
  };

  const filteredContacts = contacts.filter(
    (contact) => contact.country.name === "United States"
  );

  const handleContactClick = (id, phone, country) => {
    setSelectedContact({ id, phone, country });
    setModalCOpen(true);
    // setModalBOpen(false);
    // setModalAOpen(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      <Modal show={modalAOpen} onHide={closeModal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#46139f", color: "white" }}
        >
          <Modal.Title>All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="form-control mb-3"
            placeholder="Search Contacts"
          ></input>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  handleContactClick(
                    contact.id,
                    contact.phone,
                    contact.country.name
                  );
                }}
                className="d-flex align-items-center p-2 border-bottom"
              >
                <p>
                  {contact.id}
                  {". "}
                  {contact.phone}
                  {" | "}
                  {contact.country.name}
                </p>
              </div>
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <div>
            <input
              type="checkbox"
              value="1"
              onChange={handleCheckBoxChange}
              className="form-check-input me-2"
            />
            <span>Only Even</span>
          </div>
          <Button variant="secondary" onClick={openModalB}>
            Show US Contacts
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalBOpen} onHide={closeModal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#ff7f50", color: "white" }}
        >
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="form-control mb-3"
            placeholder="Search Contacts"
          ></input>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="d-flex align-items-center p-2 border-bottom"
                onClick={() => {
                  handleContactClick(
                    contact.id,
                    contact.phone,
                    contact.country.name
                  );
                }}
              >
                <p>
                  {contact.id}
                  {". "}
                  {contact.phone}
                  {" | "}
                  {contact.country.name}
                </p>
              </div>
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <div>
            <input
              type="checkbox"
              value="1"
              onChange={handleCheckBoxChange}
              className="form-check-input me-2"
            />
            <span>Only Even</span>
          </div>
          <Button variant="secondary" onClick={openModalA}>
            Show All Contacts
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedContact && (
        <Modal show={modalCOpen} onHide={() => setSelectedContact(null)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Contact Details of id {selectedContact.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>Phone: {selectedContact.phone}</p>
              <p>Country: {selectedContact.country}</p>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Problem2;
