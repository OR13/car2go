import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class MeshPointTable extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      fixedHeader: false,
      showFooter: false,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: 'auto',
      dialogOpen: false,
      selectedObject: null
    }
  }

  onRowSelection = (index) => {
    var selectedObject = this.props.meshPointObjects[index];
    if (selectedObject) {
      this.setState({
        dialogOpen: true,
        selectedObject: selectedObject
      })
    }
  }

  renderTableHeaderFooter() {
    return (
      <TableRow>
        <TableHeaderColumn tooltip='Balane'>Balance</TableHeaderColumn>
        <TableHeaderColumn tooltip='Name'>Name</TableHeaderColumn>
        <TableHeaderColumn tooltip='Subscribers'>Subscribers</TableHeaderColumn>
        <TableHeaderColumn tooltip='Contract Address'>Contract</TableHeaderColumn>
        <TableHeaderColumn tooltip='Creator Address'>Creator</TableHeaderColumn>
      </TableRow>
    )
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      selectedObject: null
    })
  }

  handleConfirm = () => {
    this.props.selectRow(this.state.selectedObject);
  }
  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label='Confirm'
        primary
        keyboardFocused
        onTouchTap={this.handleConfirm}
      />
    ]
    return (
      <div>
        <Table
          height={this.state.height}
          onRowSelection={this.onRowSelection}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          bodyStyle={{ overflow: 'visible' }}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            {this.renderTableHeaderFooter()}
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.meshPointObjects.map((meshPoint, index) => (
              <TableRow key={index}>
                <TableRowColumn>{meshPoint.balance}</TableRowColumn>
                <TableRowColumn>{meshPoint.name}</TableRowColumn>
                <TableRowColumn>{meshPoint.requestorAddresses.length}</TableRowColumn>
                <TableRowColumn>{meshPoint.address.substring(0, 6) + '...'}</TableRowColumn>
                <TableRowColumn>{meshPoint.creator.substring(0, 6) + '...'}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          title='Review MeshPoint'
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleCloseDialog}
        >
          <strong>{this.state.selectedObject !== null && this.state.selectedObject.name}</strong> MeshPoint is in range, would you like to review it?
        </Dialog>
      </div>
    )
  }
}

export default MeshPointTable
