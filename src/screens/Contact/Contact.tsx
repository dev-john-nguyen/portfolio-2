import { useRef, useState } from "react";
import { PageWrapper } from "../../components/PageWrapper"
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false)

    const onSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading || sent) return;

        if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || !form.current) return alert("All Fields Are Required");

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_USER_ID)
            .then((result) => {
                alert("Thank you for reaching out. I will get back to you as soon as I can.");
                setLoading(false);
                setSent(true)
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <PageWrapper label="Contact" subLabel="Please fill out the form below to get in touch!" loading={loading}>
            <form ref={form} onSubmit={onSend}>
                <div className="input-control">
                    <label htmlFor='name'>Name</label>
                    <input name="name" id='name' type='text' placeholder="John Doe" required />
                </div>
                <div className="input-control">
                    <label htmlFor='email'>Email</label>
                    <input name="email" id='email' type='text' placeholder="john.doe@gmail.com" required />
                </div>
                <div className="input-control">
                    <label htmlFor='message'>Message</label>
                    <textarea name="message" id='message' placeholder="Whatever is on your mind!" required />
                </div>
                <button>{sent ? "You Will Hear From Me Soon!" : "Send"}</button>
            </form>
        </PageWrapper>
    )
}

export default Contact;