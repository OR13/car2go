import React from 'react'
import Page from 'layouts/Page'
import MeshPointAuthorizeTableContainer from 'containers/MeshPointAuthorizeTableContainer'

export default class AuthorizeMeshPointPage extends React.Component {

  render() {
    return (
      <Page renderParticles={true}>
        <MeshPointAuthorizeTableContainer />
      </Page>
    )
  }
}
