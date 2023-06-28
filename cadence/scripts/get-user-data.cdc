import "Flowthentic"

pub fun main(userId: String): {String: String}? {
  return Flowthentic.getUserData(userId: userId)
}