import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Page from 'layouts/Page'
import MeshPointTableContainer from 'containers/MeshPointTableContainer'

export default class AdminPage extends React.Component {
  render() {
    return (
      <Page renderParticles={true}>
        <MeshPointTableContainer />
      </Page>
    )
  }
}
