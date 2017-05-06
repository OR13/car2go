import React from 'react'
import Page from 'layouts/Page'
import MeshPointContainer from 'containers/MeshPointContainer'

export default class MeshPointPage extends React.Component {

  render () {
    return (
      <Page renderParticles={true}>
        <MeshPointContainer/>
      </Page>
    )
  }
}
