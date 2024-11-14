import React from "react";
import ContactHeader from "./components/ContactHeader";
import ContactForm from "./components/ContactForm";
import ContactSidebar from "./components/ContactSidebar";

const handleSubmitForm = (dataForm) => {
    console.log("dataForm", dataForm);
};

const ContactPage = () => {
    return (
        <main className="mainwrapper contact --ptop">
            <div className="container">
                <ContactHeader />
            </div>
            <div className="contact__content">
                <div className="container">
                    <div className="wrapper">
                        <ContactSidebar />
                        <ContactForm handleSubmitForm={handleSubmitForm} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
