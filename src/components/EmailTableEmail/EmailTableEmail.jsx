import './EmailTableEmail.css';

function EmailTableEmail({message}){
    return(
        <>
            {<div contenteditable="true">{message}</div>}
        </>
    );
}

export default EmailTableEmail;