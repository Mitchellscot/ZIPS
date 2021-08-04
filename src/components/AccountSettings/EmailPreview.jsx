import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';

function EmailPreview({emailSettings, showEmail}){
    return(
        <Col lg={6} md={4} className="d-flex justify-content-center mt-5">
        <Table className={showEmail ? "visible border" : "invisible"}>
            <thead>
                <tr>
                    <td className="font-weight-bold text-right" width="15%">
                        From:
                </td>
                    <td className="text-left align-center">
                        {emailSettings.source_email}
                    </td>
                </tr>
                <tr>
                    <td className="font-weight-bold text-right" width="5%">
                        Reply To:
                </td>
                    <td className="text-left align-center">
                        {emailSettings.reply_to_email}
                    </td>
                </tr>
                <tr>
                    <td className="font-weight-bold text-right" width="5%">
                        Subject:
                </td>
                    <td className="text-left align-center">
                        {emailSettings.subject}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="text-left">
                    <td colSpan="2" className="px-5">
                        <h4>{emailSettings.header}</h4>
                        <p className="text-left">{emailSettings.body}</p>
                        <ul>
                            <li>Click here to download your photo</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" className="pl-5">
                        <p className="text-left">{emailSettings.business_name}</p>
                        <p className="text-left">{emailSettings.business_email}</p>
                        <p className="text-left">{emailSettings.business_website}</p>
                        <p className="text-left">{emailSettings.business_phone}</p>
                    </td>
                </tr>
            </tbody>
        </Table>
    </Col>
    );
}

export default EmailPreview;