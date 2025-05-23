import React, { Component } from 'react';
import Loader from './Loader';

class ViewTransactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            blockchain: null,
            txns: [],
            publicKey: null,
        }
    }

    componentDidMount() {
        const { location, publicKey } = this.props;
        const blockchain = location?.query?.blockchain;
        const index = location?.query?.index;

        if (blockchain && Array.isArray(blockchain) && blockchain[index] && Array.isArray(blockchain[index].transactions)) {
            this.setState({
                blockchain,
                txns: blockchain[index].transactions,
                publicKey,
                loading: false
            });
        } else {
            // In case blockchain or transactions are not available, set loading false and txns empty array
            this.setState({
                blockchain,
                txns: [],
                publicKey,
                loading: false
            });
        }
    }

    render() {
        const { txns, loading } = this.state;

        if (loading) {
            return <Loader />;
        }

        const txnsList = Array.isArray(txns) ? txns.map((txn, idx) => (
            <tr key={idx} style={{ height: 100 }}>
                <td><p style={{ wordBreak: "break-all" }}>{txn.from}</p></td>
                <td>{txn.to}</td>
                <td>{txn.amount}</td>
                <td>{txn.isTxnValid ? txn.isTxnValid().toString() : 'N/A'}</td>
            </tr>
        )) : null;

        return (
            <div className="container">
                <div className="table-responsive">
                    <table border="1" className="table" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th scope="col-xs-2">From</th>
                                <th scope="col-xs-2">To</th>
                                <th scope="col-xs-5">Amount</th>
                                <th scope="col-xs-3">Valid?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {txnsList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ViewTransactions;