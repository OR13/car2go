import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import CircularProgress from 'material-ui/CircularProgress'


export default class CreateMeshPointForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      error: '',
      meshPointName: ''
    }
  }

  handleCreateFaucet = () => {
    let cleanName = this.state.meshPointName.toLowerCase().replace(/\s+/g, '-')
    this.props.onCreateFaucetSubmit({
      name: cleanName,
      fromAddress: this.props.meshPoint.defaultAddress
    })
  }

  onInputChange (event) {
    var errorText = /^[a-zA-Z\s]*$/.test(event.target.value) ? '' : 'Invalid name, please only use letters and spaces'
    this.setState({
      error: errorText,
      meshPointName: event.target.value
    })
  }

  render () {
      let { meshPoint } = this.props;
      return (
        <Card>
          <CardTitle
            title='Create MeshPoint'
            subtitle='One per account address.'
            />
          <CardText>
            <TextField
              style={{ width: '100%' }}
              id='text-field-controlled'
              floatingLabelText='Name'
              value={this.state.meshPointName}
              errorText={this.state.error}
              onChange={e => this.onInputChange(e)}
              />
          </CardText>
          <CardActions style={{textAlign: 'right'}}>
            <RaisedButton
              style={{marginRight: '0px'}}
              secondary={true}
              onClick={this.handleCreateFaucet}
              disabled={this.state.error.length > 0 || this.state.meshPointName.trim().length === 0}
              label='Create' />
          </CardActions>
        </Card>
      )
  }
}
