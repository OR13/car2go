import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Page from 'layouts/Page'
import CreateMeshPointContainer from 'containers/CreateMeshPointContainer'

export default class CreateMeshPointPage extends React.Component {
  render () {
    return (
      <Page renderParticles={false}>
        <Card>
          <CardTitle
            title='Create MeshPoint'
            subtitle='One per account address.'
            />
          <CardText>
            <CreateMeshPointContainer />
          </CardText>
        </Card>
      </Page>
    )
  }
}
