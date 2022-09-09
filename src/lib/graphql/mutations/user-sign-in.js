console.log("-------- at mutations/user-sign-in.js ------");

export const mutationUserSignIn = `
  mutation ($email: String!, $password: String!) {
    userSignIn(
      authProviderInput: {
        email: $email,
        password: $password}) {
      token
      user {
        id
        sessionId
        email
        locale {
          localeCode
        }
      }
      errors {
        name
        message
        path
      }    
    }
  }
`;
