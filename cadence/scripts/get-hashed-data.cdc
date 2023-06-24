import "Flowthentic"

pub fun main(userId: String): String? {
  return Flowthentic.getHashedData(userId: userId)
}