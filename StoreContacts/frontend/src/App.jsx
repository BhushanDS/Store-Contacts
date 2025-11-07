import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#2c3e50", marginBottom: "10px" }}>Contact Management System</h1>
        <p style={{ color: "#3498db", fontStyle: "italic", fontSize: "16px", fontWeight: "bold" }}>
          Web App Developed by Bhushan Rane
        </p>
        <hr style={{ width: "50%", margin: "20px auto", border: "1px solid #3498db" }} />
      </header>
      
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button 
        onClick={openCreateModal}
        style={{ 
          backgroundColor: "#3498db", 
          color: "white", 
          padding: "10px 20px", 
          border: "none", 
          borderRadius: "5px", 
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Create New Contact
      </button>
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      )}
      
      {/* Footer with developer signature */}
      <footer style={{ 
        marginTop: "50px", 
        padding: "20px", 
        borderTop: "2px solid #3498db", 
        textAlign: "center",
        backgroundColor: "#ecf0f1",
        borderRadius: "10px"
      }}>
        <p style={{ margin: "5px 0", color: "#2c3e50" }}>&copy; 2025 Contact Management System</p>
        <p style={{ margin: "5px 0", fontWeight: "bold", color: "#2980b9" }}>
          Developed by Bhushan Rane
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#7f8c8d" }}>
          Full Stack Development | React.js + Flask + SQLAlchemy
        </p>
      </footer>
    </div>
  );
}

export default App;