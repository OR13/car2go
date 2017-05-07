
import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const contract = require('truffle-contract')

import MeshPoint from '../../../build/contracts/MeshPoint.json'
import MeshPointManager from '../../../build/contracts/MeshPointManager.json'

const meshPoint = contract(MeshPoint)
meshPoint.setProvider(provider)

const meshPointManager = contract(MeshPointManager)
meshPointManager.setProvider(provider)

import { readEvents } from '../../../ti-framework/event-store'

// HELPER METHODS

export const getEventStoreEvents = (_address, _callback) => {

    return meshPoint.at(_address)
        .then(async (_faucet) => {
            return readEvents(_faucet)
        })
        .then((events) => {
            _callback(events)
        })
}

export const getMeshPointViewModel = (_address) => {
    return meshPoint.at(_address)
        .then(async (_faucet) => {
            return {
                address: _faucet.address,
                timeCreated: (await _faucet.timeCreated.call()).toNumber(),
                creator: await _faucet.creator.call(),
                name: await _faucet.name.call().then((_name) => _name.replace(/-/g, ' ')),
                balance: await web3.fromWei(web3.eth.getBalance(_address), 'ether').toNumber(),
                requestorAddresses: await _faucet.getRequestorAddresses(),
                events: await readEvents(_faucet)
            }
        })
}

export const getMeshPointByAddress = (_address) => {
    return getMeshPointViewModel(_address)
        .then((viewModel) => {
            return viewModel
        })
}

const getMeshPointsByAddressesAsyc = async (_addresses) => {
    return await Promise.all(
        _addresses
            .map(async (address) => {
                return await getMeshPointByAddress(address)
            })
    )
}

export const managerGetMeshPointByCreator = (fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getFaucetByCreator
                .call({ from: fromAddress })
                .then(async (_address) => {
                    let addr = _address === '0x0000000000000000000000000000000000000000' ? null : await getMeshPointByAddress(_address)
                    _callback(addr)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerGetMeshPointByName = (_name, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getFaucetByName
                .call(_name)
                .then(async (_address) => {
                    let addr = _address === '0x0000000000000000000000000000000000000000' ? null : await getMeshPointByAddress(_address)
                    _callback(addr)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerGetMeshPointObjects = (_callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getFaucets
                .call()
                .then(async (addresses) => {
                    let faucetContracts = await getMeshPointsByAddressesAsyc(addresses)
                    _callback(faucetContracts)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}


export const managerGetMeshPointAddresses = (_callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getFaucets
                .call()
                .then(async (addresses) => {
                    _callback(addresses)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerCreateMeshPoint = (_name, fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .createFaucet(_name, { from: fromAddress, gas: 2000000, value: web3.toWei(10) })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerRequestMeshPointAccess = (_faucetAddress, _requestorAddress, _fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .requestAccess(_faucetAddress, _requestorAddress, {
                    from: _fromAddress,
                    gas: 2000000
                })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerAuthorizeMeshPointAccess = (_faucetAddress, _requestorAddress, _fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .authorizeAccess(_faucetAddress, _requestorAddress, {
                    from: _fromAddress,
                    gas: 2000000
                })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerRevokeMeshPointAccess = (_faucetAddress, _requestorAddress, _fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .revokeAccess(_faucetAddress, _requestorAddress, {
                    from: _fromAddress,
                    gas: 2000000
                })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const meshPointSendWei = (_faucetAddress, _recipientAddress, _fromAddress, _callback) => {
    meshPoint.at(_faucetAddress)
        .then((_faucet) => {
            _faucet.sendWei(_recipientAddress, { from: _fromAddress })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}
