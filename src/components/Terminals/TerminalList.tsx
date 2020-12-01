import React from 'react';
import { Card, Button, Table, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import {
  addTerminal as addTerminalAction,
  unpairTerminal as unpairTerminalAction,
  removeTerminal as removeTerminalAction,
  updateActiveTerminal as updateActiveTerminalAction,
} from '../../features/terminals/terminalSlice';
import { selectActiveTerminals } from '../../features/terminals/terminalSelectors';

function TerminalList() {
  const terminals = useSelector(selectActiveTerminals);
  const dispatch = useDispatch();
  const addTerminal = () => dispatch(addTerminalAction());
  const unpairTerminal = (id: string) => dispatch(unpairTerminalAction(id));
  const removeTerminal = (id: string) => dispatch(removeTerminalAction(id));
  const handleViewTerminal = (id: string) => dispatch(updateActiveTerminalAction(id));

  return (
    <div className="mt-3">
      <Card>
        <Card.Header>
          <Button onClick={() => addTerminal()} className="float-right button btn-primary rounded-0">
            Pair new Terminal
          </Button>
        </Card.Header>
        <Table>
          <thead>
            <tr>
              <th>POS ID</th>
              <th>Pairing Status</th>
              <th>Connection Status</th>
              <th>EFTPOS IP Address</th>
              <th>Serial Number</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {terminals && terminals.length > 0 ? (
              terminals.map((t: any) => (
                <tr key={t.id}>
                  <td>{t.terminalConfig.posId}</td>
                  <td>
                    <Badge pill variant="primary">
                      {t.status}
                    </Badge>
                  </td>
                  <td>{t.terminalStatus}</td>
                  <td>{t.terminalConfig.eftpos}</td>
                  <td>{t.terminalConfig.serialNumber}</td>
                  <td>
                    <Button className="btn-sm" onClick={() => handleViewTerminal(t.id)}>
                      View
                    </Button>
                  </td>
                  {t.status === 'PairedConnected' ? (
                    <td>
                      <Button className="btn-sm" onClick={() => unpairTerminal(t.id)}>
                        Unpair
                      </Button>
                    </td>
                  ) : (
                    <td>
                      <Button className="btn-sm" onClick={() => removeTerminal(t.id)}>
                        Remove
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={5}>
                  No terminals available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default TerminalList;
