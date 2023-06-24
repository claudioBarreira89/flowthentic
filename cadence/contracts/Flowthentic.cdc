pub contract Flowthentic {
  // Store a record of users who have been verified
  // access(account) var verifiedUsers: {String: String}
  pub var verifiedUsers: {String: String}

  init() {
      self.verifiedUsers = {}
  }

  // Function to store a user's hashed personal data
  pub fun setHashedData(userId: String, hashedData: String) {
      self.verifiedUsers[userId] = hashedData
  }

  // Function to retrieve a user's hashed personal data
  pub fun getHashedData(userId: String): String? {
    if let hashedData = self.verifiedUsers[userId] {
        return hashedData
    }
    return nil
  }
}