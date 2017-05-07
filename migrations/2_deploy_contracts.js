var Ownable = artifacts.require('./zeppelin/ownership/Ownable.sol')
var Killable = artifacts.require('./zeppelin/lifecycle/Killable.sol')

var IndexedEnumerableSetLib = artifacts.require('./IndexedEnumerableSetLib.sol')

var MeshPointManager = artifacts.require('./MeshPointManager.sol')
var MeshPoint = artifacts.require('./MeshPoint.sol')
var EventStore = artifacts.require('./EventStore.sol')

module.exports = function (deployer) {
  deployer.deploy(Ownable)
  deployer.link(Ownable, Killable)
  deployer.deploy(Killable)

  deployer.deploy(IndexedEnumerableSetLib)
  deployer.link(IndexedEnumerableSetLib, MeshPointManager)
  deployer.link(IndexedEnumerableSetLib, MeshPoint)

  deployer.link(Killable, EventStore)
  deployer.deploy(EventStore)
  deployer.link(EventStore, MeshPointManager)
  deployer.link(EventStore, MeshPoint)

  deployer.deploy(MeshPointManager)
  deployer.link(MeshPointManager, MeshPoint)
  deployer.deploy(MeshPoint)
}
