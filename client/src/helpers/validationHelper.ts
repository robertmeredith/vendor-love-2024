export function formatInstagramUsername(input: string): string {
  // create a regex object with the pattern for the url
  const regex1 = /(https:\/\/)?(www\.)?instagram\.com\/(\w+)\/?/
  // create a regex object with the pattern for the @username
  const regex2 = /@(\w+)/
  // test the input against the first regex and store the result in a variable
  const result1 = regex1.exec(input)
  // test the input against the second regex and store the result in a variable
  const result2 = regex2.exec(input)
  // if the first result is not null, return the third group (the username from the url)
  if (result1) {
    return result1[3]
  }
  // else if the second result is not null, return the first group (the username from the @)
  else if (result2) {
    return result2[1]
  }
  // otherwise, return the input as it is
  else {
    return input
  }
}

// Format URL function
export function formatUrl(input: string): string {
  // Create a regex object with the pattern for the URL
  const urlRegex = /(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\/?/
  // Test the input against the regex and store the result in a variable
  const result = urlRegex.exec(input)
  // If the result is not null, return the third group (the domain)
  if (result) {
    return result[3]
  }
  // Otherwise, return the input as it is
  return input
}
