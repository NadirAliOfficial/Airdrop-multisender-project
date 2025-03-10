import { ethers } from "ethers";
import Papa from "papaparse";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const SenderTable = ({ wallets, setWallets, isConnected }) => {
    const [invalidAddresses, setInvalidAddresses] = useState([]);

    const validateAddress = (address) => {
        return ethers.isAddress(address);
    };

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: (results) => {
                const rawData = results.data.flat();
                const unique = new Set();
                const valid = [];
                const invalid = [];

                rawData.forEach((address) => {
                    const cleanAddress = address.trim();
                    if (validateAddress(cleanAddress) && !unique.has(cleanAddress)) {
                        valid.push(cleanAddress);
                        unique.add(cleanAddress);
                    } else {
                        invalid.push(cleanAddress);
                    }
                });

                setWallets(valid);
                setInvalidAddresses(invalid);
            }
        });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleCSVUpload} disabled={!isConnected} />
            
            <h3>Valid Addresses</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {wallets.map((address, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h3>Invalid Addresses</h3>
            <ul>
                {invalidAddresses.map((address, idx) => (
                    <li key={idx} style={{ color: "red" }}>{address}</li>
                ))}
            </ul>
        </div>
    );
};

export default SenderTable;
